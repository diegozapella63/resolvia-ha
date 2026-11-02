import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { crc32, makeZip, readZip } from "../resolvia/rootfs/app/lib/zip.js";
import { local } from "./_helpers.mjs";

/** Deterministic bytes that do not compress. */
function noise(n, seed = 12345) {
  const b = Buffer.alloc(n);
  let x = seed;
  for (let i = 0; i < n; i++) {
    x = (x * 1103515245 + 12345) >>> 0;
    b[i] = x >>> 24;
  }
  return b;
}

/** Offsets of the structures of a zip made here. */
function layout(zip) {
  const eocd = zip.length - 22;
  assert.equal(zip.readUInt32LE(eocd), 0x06054b50);
  return { eocd, count: zip.readUInt16LE(eocd + 10), cdSize: zip.readUInt32LE(eocd + 12), cdAt: zip.readUInt32LE(eocd + 16) };
}

describe("crc32", () => {
  it("matches the standard check values", () => {
    assert.equal(crc32(Buffer.alloc(0)), 0);
    assert.equal(crc32(Buffer.from("123456789")), 0xcbf43926);
    assert.equal(crc32(Buffer.from("The quick brown fox jumps over the lazy dog")), 0x414fa339);
  });
});

describe("makeZip + readZip", () => {
  const files = [
    { name: "resolvia.json", data: JSON.stringify({ a: "ção", list: Array.from({ length: 50 }, (_, i) => `item ${i}`) }) },
    { name: "listas/Cômodos e Ações.md", data: "# Cômodos\n\n- [ ] Limpar\n" },
    { name: "bin.dat", data: noise(3000) },
    { name: "vazio.txt", data: "" },
  ];

  it("reads back exactly what was written (names in UTF-8, text and bytes)", () => {
    const out = readZip(makeZip(files));
    assert.deepEqual(
      out.map((f) => f.name),
      files.map((f) => f.name),
    );
    for (let i = 0; i < files.length; i++) {
      const want = Buffer.isBuffer(files[i].data) ? files[i].data : Buffer.from(files[i].data, "utf8");
      assert.ok(out[i].data.equals(want), files[i].name);
    }
  });

  it("deflates what compresses and stores what does not, with CRC and sizes in both headers", () => {
    const zip = makeZip([
      { name: "a.txt", data: "a".repeat(10000) },
      { name: "b.bin", data: noise(500) },
    ]);
    const { cdAt, count } = layout(zip);
    assert.equal(count, 2);
    let p = cdAt;
    const entries = [];
    for (let n = 0; n < count; n++) {
      assert.equal(zip.readUInt32LE(p), 0x02014b50);
      const nameLen = zip.readUInt16LE(p + 28);
      const e = { flags: zip.readUInt16LE(p + 8), method: zip.readUInt16LE(p + 10), crc: zip.readUInt32LE(p + 16), size: zip.readUInt32LE(p + 20), raw: zip.readUInt32LE(p + 24), local: zip.readUInt32LE(p + 42), name: zip.subarray(p + 46, p + 46 + nameLen).toString() };
      // the local header says the same
      assert.equal(zip.readUInt32LE(e.local), 0x04034b50);
      assert.equal(zip.readUInt16LE(e.local + 8), e.method);
      assert.equal(zip.readUInt32LE(e.local + 14), e.crc);
      assert.equal(zip.readUInt32LE(e.local + 18), e.size);
      assert.equal(zip.readUInt32LE(e.local + 22), e.raw);
      entries.push(e);
      p += 46 + nameLen;
    }
    assert.equal(entries[0].method, 8);
    assert.ok(entries[0].size < 200);
    assert.equal(entries[0].raw, 10000);
    assert.equal(entries[0].crc, crc32(Buffer.from("a".repeat(10000))));
    assert.equal(entries[1].method, 0);
    assert.equal(entries[1].size, 500);
    assert.ok(entries.every((e) => e.flags === 0x0800), "UTF-8 names flag");
  });

  it("stamps the given local date and time in DOS format", () => {
    const zip = makeZip([{ name: "x", data: "y" }], local(2026, 11, 2, 13, 45, 31));
    assert.equal(zip.readUInt16LE(10), (13 << 11) | (45 << 5) | 15);
    assert.equal(zip.readUInt16LE(12), ((2026 - 1980) << 9) | (11 << 5) | 2);
  });

  it("an empty zip is valid", () => {
    const zip = makeZip([]);
    assert.equal(zip.length, 22);
    assert.deepEqual(readZip(zip), []);
  });

  it("skips folders", () => {
    const out = readZip(makeZip([{ name: "listas/", data: "" }, { name: "listas/a.md", data: "x" }]));
    assert.deepEqual(out.map((f) => f.name), ["listas/a.md"]);
  });

  it("reads a zip with a comment at the end", () => {
    const zip = makeZip([{ name: "a.txt", data: "olá" }]);
    const comment = Buffer.from("Criado no Windows");
    zip.writeUInt16LE(comment.length, zip.length - 2);
    assert.equal(readZip(Buffer.concat([zip, comment]))[0].data.toString(), "olá");
  });

  it("reads entries with extra fields and comments (as Windows and macOS write them)", () => {
    const one = makeZip([{ name: "resolvia.json", data: '{"ok":true}' }]);
    const { cdAt, cdSize } = layout(one);
    const nameLen = one.readUInt16LE(26);
    const localEnd = 30 + nameLen;
    const extraL = Buffer.from([0x55, 0x54, 0x05, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00]); // "UT" timestamp, 9 bytes
    const local = Buffer.concat([one.subarray(0, localEnd), extraL, one.subarray(localEnd, cdAt)]);
    local.writeUInt16LE(extraL.length, 28);
    const cen = Buffer.from(one.subarray(cdAt, cdAt + cdSize));
    const extraC = Buffer.from([0x55, 0x54, 0x01, 0x00, 0x01]);
    const comm = Buffer.from("abc");
    const cen2 = Buffer.concat([cen, extraC, comm]);
    cen2.writeUInt16LE(extraC.length, 30);
    cen2.writeUInt16LE(comm.length, 32);
    const end = Buffer.from(one.subarray(one.length - 22));
    end.writeUInt32LE(cen2.length, 12);
    end.writeUInt32LE(local.length, 16);
    const out = readZip(Buffer.concat([local, cen2, end]));
    assert.deepEqual(out.map((f) => [f.name, f.data.toString()]), [["resolvia.json", '{"ok":true}']]);
  });

  it("reads names without the UTF-8 flag as Latin-1", () => {
    const zip = makeZip([{ name: "aç.txt", data: "x" }]);
    const { cdAt } = layout(zip);
    zip.writeUInt16LE(0, cdAt + 8);
    assert.equal(readZip(zip)[0].name, "aÃ§.txt");
  });
});

describe("readZip: broken or unsupported files", () => {
  it("not a zip, empty, or cut short", () => {
    const good = makeZip([{ name: "a", data: "b".repeat(100) }]);
    for (const buf of [Buffer.alloc(0), Buffer.from("{}"), Buffer.from("x".repeat(100)), good.subarray(0, good.length - 5)]) {
      assert.throws(() => readZip(buf), /incompleto ou não é um \.zip/);
    }
  });

  it("a damaged central directory", () => {
    const zip = makeZip([{ name: "a", data: "b" }]);
    zip.writeUInt32LE(0, layout(zip).cdAt);
    assert.throws(() => readZip(zip), /danificado/);
  });

  it("a password-protected entry", () => {
    const zip = makeZip([{ name: "a", data: "b" }]);
    const { cdAt } = layout(zip);
    zip.writeUInt16LE(0x0801, cdAt + 8);
    assert.throws(() => readZip(zip), /tem senha/);
  });

  it("an unknown compression", () => {
    const zip = makeZip([{ name: "a", data: "b" }]);
    zip.writeUInt16LE(12, layout(zip).cdAt + 10);
    assert.throws(() => readZip(zip), /compressão que o app não lê \(12\)/);
  });

  it("a zip that would unpack to more than the limit", () => {
    const zip = makeZip([
      { name: "a", data: "x".repeat(600) },
      { name: "b", data: "y".repeat(600) },
    ]);
    assert.equal(readZip(zip, { maxTotal: 1200 }).length, 2);
    assert.throws(() => readZip(zip, { maxTotal: 1199 }), /grande demais/);
  });

  it("corrupted deflate data throws instead of returning garbage", () => {
    const zip = makeZip([{ name: "a.txt", data: "abc".repeat(1000) }]);
    const body = 30 + 5;
    zip.fill(0xff, body, body + 8);
    assert.throws(() => readZip(zip));
  });
});

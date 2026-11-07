import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import * as U from "../frontend/src/util.js";
import { taskKey as serverTaskKey } from "../resolvia/rootfs/app/lib/store.js";
import { FRONT, local } from "./_helpers.mjs";

describe("features and colors", () => {
  it("has() needs every bit of the flag", () => {
    assert.equal(U.has(127, U.F.DUE_DATE), true);
    assert.equal(U.has(U.F.DUE_DATE, U.F.DUE_DATE | U.F.DUE_DATETIME), false);
    assert.equal(U.has(undefined, U.F.CREATE), false);
  });

  it("lists without a color cycle through the six warm colors", () => {
    assert.deepEqual([0, 1, 2, 3, 4, 5, 6, 7].map((i) => U.autoColor(i).id), ["vermelho", "coral", "rosa", "laranja", "framboesa", "ouro", "vermelho", "coral"]);
    assert.equal(U.colorById("azul").ink, "#0B67A8");
    assert.equal(U.colorById("nope"), undefined);
    assert.equal(new Set(U.PALETTE.map((c) => c.id)).size, U.PALETTE.length);
  });

  it("hexToRgba reads 6 and 3 digit colors", () => {
    assert.equal(U.hexToRgba("#FF5A4F", 0.15), "rgba(255, 90, 79, 0.15)");
    assert.equal(U.hexToRgba("abc", 1), "rgba(170, 187, 204, 1)");
    assert.equal(U.hexToRgba("#000000", 0), "rgba(0, 0, 0, 0)");
  });

  it("colorVars: the ink color in light mode, the fill in dark mode", () => {
    const c = U.colorById("vermelho");
    assert.equal(U.colorVars(c, false), "--c:#FF5A4F;--ci:#C42A1F;--cs:rgba(255, 90, 79, 0.15);");
    assert.equal(U.colorVars(c, true, "x"), "--x:#FF5A4F;--xi:#FF5A4F;--xs:rgba(255, 90, 79, 0.17);");
  });
});

describe("text helpers", () => {
  it("fold drops accents and case", () => {
    assert.equal(U.fold("Ação ÁGUA Pão"), "acao agua pao");
    assert.equal(U.fold(null), "");
  });

  it("foldKeepLength keeps every index of the original text", () => {
    for (const s of ["Ação já", "PÃO DE AÇÚCAR", "Ølé", "é"]) assert.equal(U.foldKeepLength(s).length, s.length, s);
    assert.equal(U.foldKeepLength("Pão de Açúcar"), "pao de acucar");
    const text = "Comprar AÇÚCAR mascavo";
    const at = U.foldKeepLength(text).indexOf(U.fold("acucar"));
    assert.equal(text.slice(at, at + 6), "AÇÚCAR");
  });

  it(
    "foldKeepLength keeps the indexes after an emoji (search highlight in task names like '🛒 Leite')",
    () => {
      const text = "🛒 Leite integral";
      assert.equal(U.foldKeepLength(text).length, text.length);
      const at = U.foldKeepLength(text).indexOf(U.fold("lei"));
      assert.equal(text.slice(at, at + 3), "Lei");
    },
  );

  it("plural", () => {
    assert.equal(U.plural(1, "item", "itens"), "1 item");
    assert.equal(U.plural(0, "item", "itens"), "0 itens");
    assert.equal(U.plural(2, "dia", "dias"), "2 dias");
  });

  it("clip cuts with an ellipsis, never longer than n", () => {
    assert.equal(U.clip("curto"), "curto");
    assert.equal(U.clip("x".repeat(38)), "x".repeat(38));
    const c = U.clip("Uma tarefa com um nome bem comprido demais", 20);
    assert.equal(c, "Uma tarefa com um n…");
    assert.ok(c.length <= 20);
    assert.equal(U.clip("abcd efgh", 6), "abcd…", "no space before the ellipsis");
  });
});

describe("taskKey: the same key in the server, the app and the rooms code", () => {
  const src = fs.readFileSync(path.join(FRONT, "rooms.js"), "utf8");
  const m = src.match(/export const taskKey = (\(s\) =>[\s\S]*?\.slice\(0, 255\));/);
  const roomsTaskKey = m && new Function(`return ${m[1]}`)();
  const samples = ["Lavar a Louça", "  PÃO   de\tqueijo ", "Ç", "é", "", null, undefined, 12, "x".repeat(300), "🛒 Compras do mês", "Ärger Über Öl"];

  it("frontend util.taskKey equals the server's", () => {
    for (const s of samples) assert.equal(U.taskKey(s), serverTaskKey(s), String(s));
  });

  it("rooms.js has its own copy, and it is the same (read from the source: rooms.js needs a browser to import)", () => {
    assert.equal(typeof roomsTaskKey, "function", "taskKey not found in rooms.js");
    for (const s of samples) assert.equal(roomsTaskKey(s), serverTaskKey(s), String(s));
  });
});

describe("listMeta: the name and group of a list", () => {
  const hass = {
    states: {
      "todo.alexa_shopping": { attributes: { friendly_name: "Notas e Rotinas do Alexa Shopping list" } },
      "todo.casa": { attributes: { friendly_name: "casa" } },
      "todo.renomeado": { attributes: { friendly_name: "Cozinha Lista" } },
      "todo.outro": { attributes: { friendly_name: "Lista da TV" } },
    },
    entities: { "todo.alexa_shopping": { device_id: "d1" }, "todo.renomeado": { device_id: "d2" }, "todo.outro": { device_id: "d3" } },
    devices: { d1: { name: "Notas e Rotinas do Alexa" }, d2: { name: "Echo", name_by_user: "cozinha" }, d3: { name: "Televisão" } },
  };

  it("drops the device name from the start and groups by device", () => {
    assert.deepEqual(U.listMeta(hass, "todo.alexa_shopping"), { name: "Shopping list", group: "Notas e Rotinas do Alexa" });
  });

  it("the name given by the user to the device wins (case-insensitive prefix)", () => {
    assert.deepEqual(U.listMeta(hass, "todo.renomeado"), { name: "Lista", group: "cozinha" });
  });

  it("keeps the whole name when it does not start with the device", () => {
    assert.deepEqual(U.listMeta(hass, "todo.outro"), { name: "Lista da TV", group: "Televisão" });
  });

  it("capitalizes, and works without registry or state", () => {
    assert.deepEqual(U.listMeta(hass, "todo.casa"), { name: "Casa", group: null });
    assert.deepEqual(U.listMeta({ states: {} }, "todo.lista_de_compras"), { name: "Lista de compras", group: null });
  });
});

describe("guessIcon", () => {
  const cases = {
    "Lista de Compras": "shopping-cart",
    "Supermercado": "shopping-cart",
    "Problem List": "triangle-alert",
    "Manutenção": "wrench",
    "Férias 2027": "plane",
    "Remédios": "pill",
    "Casa": "house",
    "Trabalho": "briefcase",
    "Livros": "book-open",
    "Aniversário": "gift",
    "Almoço": "utensils",
    "Gatos": "cat",
    "Pets": "dog",
    "Cachorros": "dog",
    "Tapetes": "list-checks",
    "Repetições": "list-checks",
    "Contas a pagar": "wallet",
    "Coisas aleatórias": "list-checks",
    "": "list-checks",
  };
  for (const [name, icon] of Object.entries(cases)) it(`${JSON.stringify(name)} -> ${icon}`, () => assert.equal(U.guessIcon(name), icon));
  it("every guessed icon is offered in the icon picker", () => {
    for (const icon of new Set(Object.values(cases))) assert.ok(U.LIST_ICONS.includes(icon), icon);
  });
});

describe("dates", () => {
  const now = local(2026, 11, 2, 10, 0); // Monday

  it("ymd, hm, fromYmd", () => {
    assert.equal(U.ymd(local(2026, 1, 5)), "2026-01-05");
    assert.equal(U.hm(local(2026, 1, 5, 7, 3)), "07:03");
    assert.deepEqual(U.fromYmd("2028-02-29"), local(2028, 2, 29));
  });

  it("addDays: midnight, across months, leap years and backwards, without touching the input", () => {
    const d = local(2027, 1, 31, 15, 20);
    assert.deepEqual(U.addDays(d, 1), local(2027, 2, 1));
    assert.deepEqual(U.addDays(d, 29), local(2027, 3, 1));
    assert.deepEqual(U.addDays(local(2028, 2, 28), 1), local(2028, 2, 29));
    assert.deepEqual(U.addDays(local(2026, 1, 1), -1), local(2025, 12, 31));
    assert.deepEqual(d, local(2027, 1, 31, 15, 20));
  });

  it("parseDue: a date lasts until 23:59:59; a datetime is read in local time", () => {
    assert.deepEqual(U.parseDue("2026-11-02"), { date: "2026-11-02", time: null, at: local(2026, 11, 2, 23, 59, 59) });
    const p = U.parseDue("2026-11-03T01:30:00Z");
    assert.deepEqual([p.date, p.time], ["2026-11-02", "22:30"]);
    assert.equal(U.parseDue(""), null);
    assert.equal(U.parseDue(undefined), null);
    assert.equal(U.parseDue("amanhã"), null);
  });

  it("dayDiff counts calendar days, not 24 h blocks", () => {
    assert.equal(U.dayDiff("2026-11-03", local(2026, 11, 2, 23, 59)), 1);
    assert.equal(U.dayDiff("2026-11-02", local(2026, 11, 2, 0, 0)), 0);
    assert.equal(U.dayDiff("2026-10-31", now), -2);
    assert.equal(U.dayDiff("2027-01-01", local(2026, 12, 31, 23, 0)), 1);
    assert.equal(U.dayDiff("2028-03-01", local(2028, 2, 28)), 2);
  });

  it("shortDate shows the year only when it is not this year", () => {
    assert.equal(U.shortDate("2026-11-03", now), "3 nov");
    assert.equal(U.shortDate("2027-01-05", now), "5 jan 2027");
  });

  describe("dueInfo", () => {
    const cases = [
      ["2026-11-02", "Hoje", "today", false],
      ["2026-11-03", "Amanhã", "soon", false],
      ["2026-11-04", "Quarta", "soon", false],
      ["2026-11-05", "Quinta", "later", false],
      ["2026-11-08", "Domingo", "later", false],
      ["2026-11-09", "9 nov", "later", false],
      ["2026-11-01", "Ontem", "late", true],
      ["2026-10-20", "20 out", "late", true],
      ["2027-01-05", "5 jan 2027", "later", false],
      ["2026-11-02T12:00:00Z", "Hoje, 09:00", "late", true],
      ["2026-11-02T21:00:00Z", "Hoje, 18:00", "today", false],
      ["2026-11-03T11:15:00Z", "Amanhã, 08:15", "soon", false],
    ];
    for (const [due, text, tone, overdue] of cases) {
      it(`${due} -> ${text} (${tone})`, () => {
        const d = U.dueInfo(due, now);
        assert.deepEqual([d.text, d.tone, d.overdue], [text, tone, overdue]);
      });
    }
    it("nothing for no deadline", () => assert.equal(U.dueInfo(null, now), null));
  });

  it("quickDates: today, tomorrow, Saturday and next week only when they differ", () => {
    const labels = (y, m, d) => U.quickDates(local(y, m, d, 12)).map((p) => `${p.label} ${p.date}`);
    assert.deepEqual(labels(2026, 11, 2), ["Hoje 2026-11-02", "Amanhã 2026-11-03", "Sábado 2026-11-07", "Próx. semana 2026-11-09"]);
    assert.deepEqual(labels(2026, 11, 6), ["Hoje 2026-11-06", "Amanhã 2026-11-07", "Próx. semana 2026-11-09"], "Friday: tomorrow is Saturday");
    assert.deepEqual(labels(2026, 11, 7), ["Hoje 2026-11-07", "Amanhã 2026-11-08", "Sábado 2026-11-14", "Próx. semana 2026-11-09"], "Saturday: the next one");
    assert.deepEqual(labels(2026, 11, 8), ["Hoje 2026-11-08", "Amanhã 2026-11-09", "Sábado 2026-11-14"], "Sunday: tomorrow is Monday");
    assert.deepEqual(labels(2026, 12, 28), ["Hoje 2026-12-28", "Amanhã 2026-12-29", "Sábado 2027-01-02", "Próx. semana 2027-01-04"]);
  });

  it("greeting by the hour, with the first name", () => {
    const g = (h, mi, name = "Diego Zapella") => U.greeting(name, local(2026, 11, 2, h, mi));
    assert.equal(g(4, 59), "Boa noite, Diego");
    assert.equal(g(5, 0), "Bom dia, Diego");
    assert.equal(g(11, 59), "Bom dia, Diego");
    assert.equal(g(12, 0), "Boa tarde, Diego");
    assert.equal(g(17, 59), "Boa tarde, Diego");
    assert.equal(g(18, 0), "Boa noite, Diego");
    assert.equal(g(9, 0, "  "), "Bom dia");
    assert.equal(g(9, 0, null), "Bom dia");
  });
});

describe("links", () => {
  it("prettyUrl: GitHub repos, the last part of the path, or the host", () => {
    assert.deepEqual(U.prettyUrl("https://github.com/anthropics/claude-code/issues/1"), { label: "anthropics/claude-code", icon: "git-fork" });
    assert.deepEqual(U.prettyUrl("https://www.home-assistant.io/integrations/todo/"), { label: "home-assistant.io › todo", icon: "link" });
    assert.deepEqual(U.prettyUrl("https://blog.exemplo.com.br/2026/minha_receita-de+bolo.html"), { label: "blog.exemplo.com.br › minha receita de bolo", icon: "link" });
    assert.equal(U.prettyUrl("https://site.com/p%C3%A3o-de-queijo").label, "site.com › pão de queijo");
    assert.equal(U.prettyUrl("https://site.com/%E0%A4%A").label, "site.com › %E0%A4%A", "a broken escape stays raw");
    assert.equal(U.prettyUrl("https://site.com/12345").label, "site.com");
    assert.equal(U.prettyUrl("https://site.com/ab").label, "site.com");
    assert.equal(U.prettyUrl("https://site.com").label, "site.com");
    assert.deepEqual(U.prettyUrl("not a url"), { label: "not a url", icon: "link" });
  });

  it("splitLinks: text and links, leaving trailing punctuation as text", () => {
    assert.deepEqual(U.splitLinks("Ver https://site.com/receita. Depois (https://github.com/a/b)!"), [
      { text: "Ver " },
      { url: "https://site.com/receita", label: "site.com › receita", icon: "link" },
      { text: ". Depois (" },
      { url: "https://github.com/a/b", label: "a/b", icon: "git-fork" },
      { text: ")!" },
    ]);
    assert.deepEqual(U.splitLinks("sem links"), [{ text: "sem links" }]);
    assert.deepEqual(U.splitLinks(""), []);
    assert.deepEqual(U.splitLinks(null), []);
    assert.deepEqual(U.splitLinks("http://a.com"), [{ url: "http://a.com", label: "a.com", icon: "link" }]);
  });
});

describe("parseListText: a pasted message into items (no AI)", () => {
  it("one item per line, without bullets, numbers or checkboxes", () => {
    assert.deepEqual(U.parseListText("- leite\n* pão\n• café\n1. arroz\n2) feijão\n3- sal\n[ ] açúcar\n> ovos\n☐ óleo"), ["Leite", "Pão", "Café", "Arroz", "Feijão", "Sal", "Açúcar", "Ovos", "Óleo"]);
  });

  it("skips done (checked) and struck-through lines", () => {
    assert.deepEqual(U.parseListText("[x] feito\n- [X] feito 2\n✅ feito 3\n☑ feito 4\n✔ feito 5\n~riscado~\nfalta"), ["Falta"]);
  });

  it("drops WhatsApp prefixes (date, time, sender)", () => {
    assert.deepEqual(U.parseListText("[18/10/26, 20:15] Maria: leite\n18/10/2026 20:16 - João Silva: pão\n18.10 09:01:33 Ana: café"), ["Leite", "Pão", "Café"]);
  });

  it("a single line is split at commas, semicolons and ' e ', after a 'title:'", () => {
    assert.deepEqual(U.parseListText("compra: leite, ovos e pão"), ["Leite", "Ovos", "Pão"]);
    assert.deepEqual(U.parseListText("arroz; feijão;"), ["Arroz", "Feijão"]);
  });

  it("drops duplicates, trailing punctuation and one-letter lines; capitalizes; limits to 255", () => {
    assert.deepEqual(U.parseListText("Leite.\nleite\nLEITE;\na\n\n  \npão,"), ["Leite", "Pão"]);
    assert.equal(U.parseListText("x".repeat(300))[0].length, 255);
    assert.deepEqual(U.parseListText(""), []);
    assert.deepEqual(U.parseListText(null), []);
  });

  it("keeps a quantity that starts with a number and a space", () => {
    assert.deepEqual(U.parseListText("10 ovos\n2 caixas de leite"), ["10 ovos", "2 caixas de leite"]);
  });

  it(
    "keeps quantities like '1.5 kg' and '2-3 tomates' (not list numbering)",
    () => {
      assert.deepEqual(U.parseListText("1.5 kg de carne\n2-3 tomates"), ["1.5 kg de carne", "2-3 tomates"]);
    },
  );
});

// ------------------------------------------------------------------ deeplink.js (the alert of Prazos opens Prazos)

describe("deeplink: ?aba= opens a tab once", async () => {
  const { openTab, TABS_OPEN } = await import("../frontend/src/deeplink.js");
  const win = (href, parent) => {
    const w = { location: { href }, history: { state: { a: 1 }, replaceState(s, t, u) { w.location.href = u; w.replaced = s; } } };
    w.parent = parent || w;
    return w;
  };
  it("on the address of the app: the path, and ?aba= taken out (Voltar and a reload don't open it again)", () => {
    const w = win("http://ha.local/app/?aba=prazos&x=1");
    assert.equal(openTab(w), "/prazos");
    assert.equal(w.location.href, "http://ha.local/app/?x=1");
    assert.deepEqual(w.replaced, { a: 1 }, "the history state kept");
    assert.equal(openTab(w), null);
  });
  it("on the page around the app (the frame of Home Assistant)", () => {
    const top = win("http://ha.local/hassio/ingress/abc_resolvia?aba=prazos");
    const w = win("http://ha.local/api/hassio_ingress/tok/", top);
    assert.equal(openTab(w), "/prazos");
    assert.equal(top.location.href, "http://ha.local/hassio/ingress/abc_resolvia");
  });
  it("an unknown tab, none, another origin around or no window: nothing", () => {
    assert.equal(openTab(win("http://ha.local/?aba=listas")), null);
    assert.equal(openTab(win("http://ha.local/")), null);
    const locked = win("http://ha.local/");
    locked.parent = { get location() { throw new Error("cross-origin"); } };
    assert.equal(openTab(locked), null);
    assert.equal(openTab(null), null);
    assert.deepEqual(Object.keys(TABS_OPEN), ["prazos"]);
  });
});

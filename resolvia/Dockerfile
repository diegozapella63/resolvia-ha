# https://developers.home-assistant.io/docs/apps/dockerfile
ARG BUILD_FROM=ghcr.io/home-assistant/base:3.23
FROM ${BUILD_FROM}

# Node.js runs the app (no npm packages needed); tzdata for local "start of day".
RUN apk add --no-cache nodejs tzdata

COPY rootfs /
RUN chmod a+x /etc/services.d/resolvia/run /etc/services.d/resolvia/finish

LABEL \
    org.opencontainers.image.title="Home Assistant App: ResolvIA" \
    org.opencontainers.image.description="Listas de tarefas do Home Assistant num visual caprichado, com tarefas recorrentes." \
    org.opencontainers.image.source="https://github.com/diegozapella63/resolvia-ha" \
    org.opencontainers.image.licenses="MIT"

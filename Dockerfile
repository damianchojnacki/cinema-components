FROM node:20 AS node_upstream

FROM node_upstream AS base

WORKDIR /srv/app

RUN corepack enable && \
	corepack prepare --activate pnpm@9.15.0 && \
	pnpm config -g set store-dir /.pnpm-store && \
    pnpx playwright install --with-deps

FROM base AS builder

COPY --link pnpm-lock.yaml ./
RUN pnpm fetch

COPY --link . .

RUN	pnpm install --frozen-lockfile --offline
RUN pnpm build-storybook --quiet

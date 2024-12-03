FROM node:20 AS node_upstream

FROM node_upstream AS base

WORKDIR /srv/app

RUN corepack enable && \
	corepack prepare --activate pnpm@latest && \
	pnpm config -g set store-dir /.pnpm-store && \
    RUN pnpx playwright install --with-deps

FROM base AS builder

COPY --link pnpm-lock.yaml ./
RUN pnpm fetch

COPY --link . .

RUN	pnpm install --frozen-lockfile --offline
RUN pnpm build-storybook --quiet
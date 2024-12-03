#syntax=docker/dockerfile:1

# Versions
FROM node:20 AS node_upstream

# Base stage for dev and build
FROM node_upstream AS base

WORKDIR /srv/app

RUN corepack enable && \
	corepack prepare --activate pnpm@latest && \
	pnpm config -g set store-dir /.pnpm-store

# Development image
FROM base AS dev

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME localhost

CMD ["sh", "-c", "pnpm install; pnpm dev"]

FROM base AS builder

COPY --link pnpm-lock.yaml ./
RUN pnpm fetch

COPY --link . .

RUN	pnpm install --frozen-lockfile --offline
RUN pnpx playwright install --with-deps
RUN pnpm build-storybook --quiet

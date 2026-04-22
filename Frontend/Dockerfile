# Stage 1: Install dependencies
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Stage 2: Build the application
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# NEXT_PUBLIC_* is inlined into the client bundle at build time.
ARG NEXT_PUBLIC_WORDPRESS_URL=http://localhost:8080
ENV NEXT_PUBLIC_WORDPRESS_URL=$NEXT_PUBLIC_WORDPRESS_URL
# URL used by SSG fetches during `npm run build`. Override when the public
# domain isn't reachable from the builder (e.g. fresh EC2 before DNS flip).
ARG WORDPRESS_BUILD_API_URL
ENV WORDPRESS_API_URL=${WORDPRESS_BUILD_API_URL:-${NEXT_PUBLIC_WORDPRESS_URL}/wp-json}
RUN npm run build

# Stage 3: Production runner
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]

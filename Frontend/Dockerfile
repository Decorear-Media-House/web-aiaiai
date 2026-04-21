# Stage 1: Install dependencies
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Stage 2: Build the application
FROM node:22-alpine AS builder
WORKDIR /app
ARG WORDPRESS_API_URL
ARG WORDPRESS_BASE_URL
ARG NEXT_PUBLIC_WORDPRESS_URL
ARG WORDPRESS_BUILD_API_URL
ENV WORDPRESS_API_URL=$WORDPRESS_API_URL
ENV WORDPRESS_BASE_URL=$WORDPRESS_BASE_URL
ENV NEXT_PUBLIC_WORDPRESS_URL=$NEXT_PUBLIC_WORDPRESS_URL
# Used only while `npm run build` fetches WordPress data. Local Docker builds
# should use host.docker.internal; EC2 builds should use the public CMS URL.
ENV WORDPRESS_BUILD_API_URL=$WORDPRESS_BUILD_API_URL
COPY --from=deps /app/node_modules ./node_modules
COPY . .
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

FROM node:lts as dependencies
WORKDIR /wall
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /wall
COPY . .
COPY --from=dependencies /wall/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /wall
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
# COPY --from=builder /wall/next.config.js ./
COPY --from=builder /wall/public ./public
COPY --from=builder /wall/.next ./.next
COPY --from=builder /wall/node_modules ./node_modules
COPY --from=builder /wall/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]
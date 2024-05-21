FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install --production

COPY src src
COPY tsconfig.json .
COPY public public

ENV NODE_ENV production
ENV GOOGLE_CLIENT_ID 662461052628-mdjfac3ecvkndld016er1db4rajo3od3.apps.googleusercontent.com
ENV GOOGLE_CLIENT_SECRET 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
ENV GOOGLE_REDIRECT_URI https://workanywhere.bexlite.dev/login/google/callback
CMD ["bun", "src/index.ts"]

EXPOSE 3000
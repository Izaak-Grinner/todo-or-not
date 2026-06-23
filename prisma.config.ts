// prisma.config.ts
import 'dotenv/config' // .env を読み込む
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma', // Prismaスキーマの場所
  migrations: {
    // 💡 外部ツール(tsx)を捨て、Node.js v24標準のTypeScript直接実行機能を使います
    seed: 'node --experimental-strip-types prisma/seed.ts',
  },
  datasource: {
    url: env('DATABASE_URL'), // CLIが使うDB接続文字列
  },
})
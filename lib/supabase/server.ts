// lib/supabase/server.js
// サーバー側（Server Component・Route Handler）で使う Supabase クライアントを作る。
// ブラウザ版（client.js）と違い、cookie を通じてセッションを管理する。
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'


export async function createClient() {
  // Next.js のサーバー側 cookie ストアを取得する（Next.js 16 では await が必要）
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        // ブラウザが送ってきた cookie をすべて Supabase に渡す
        getAll: () => cookieStore.getAll(),

        // Supabase がセッションを更新したとき、新しい cookie を書き込もうとする。
        // ただし Server Component は「読み取り専用」なので cookie の書き込みができず
        // Next.js が例外を投げる。それでも動作は問題ないので try/catch で握りつぶす。
        // ※ セッションの更新（cookie への書き込み）は proxy.js が担当している。
        // ※ 第 2 引数の _headers は proxy/middleware 向けの CDN キャッシュ制御用なので
        //    Server Component では使わない（_ で始めることで「未使用」と明示）。
        setAll: (cookiesToSet, _headers) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Component からの呼び出しでは書き込みが禁止されているため無視する
          }
        },
      },
    }
  )
}
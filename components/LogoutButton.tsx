'use client'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LogoutButton() {
    const router = useRouter()
    const supabase = createClient()

    const handleLogout = async () => {
        // ① Supabaseからログアウト（Cookieセッションの破棄）
        await supabase.auth.signOut()

        // ② ログインページへ安全にリダイレクト
        router.replace('/login')

        // ③ サーバー側のキャッシュをリフレッシュして、ヘッダー等の表示を確実に未ログイン状態に戻す
        router.refresh()
    }

    return (
        <button
            onClick={handleLogout}
            className="px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100 active:scale-95 transition-all"
        >
            ログアウト
        </button>
    )
}
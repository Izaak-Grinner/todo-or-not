import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./LogoutButton";

export default async function Header() {
    // 💡 サーバーサイドでログイン中のユーザー情報を安全に取得
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // 💡 登録した「お名前（display_name）」を取得。なければメールアドレスを表示
    const displayName = user?.user_metadata?.display_name || user?.email;

    return (
        <header className="w-full border-b border-slate-200 bg-white px-6 h-16 flex items-center justify-between shadow-sm">
            {/* ロゴ部分 */}
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-800 hover:opacity-80 transition">
                <span>⚖️</span>
                <span>Todo or Not Todo</span>
            </Link>

            {/* 💡 ユーザー状態の表示エリア */}
            <div className="flex items-center gap-4 text-sm">
                {user && (
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-slate-600 font-medium">
                            {displayName} さん
                        </span>
                        <LogoutButton />
                    </div>
                )}
            </div>
        </header>
    );
}
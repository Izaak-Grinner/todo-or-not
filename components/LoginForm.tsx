// components/LoginForm.tsx
"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
    const searchParams = useSearchParams(); // これが原因でSuspenseが必要
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pending, setPending] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPending(true);
        setError("");
        // ここに実際のログイン処理を実装してください
        console.log("ログイン試行:", { email, password });
        setPending(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">メールアドレス</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">パスワード</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
            </div>
            {error && <p className="text-sm text-rose-600 text-center">{error}</p>}
            <button
                type="submit"
                disabled={pending}
                className="w-full bg-slate-900 text-white py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 disabled:opacity-50"
            >
                {pending ? "ログイン中…" : "ログイン"}
            </button>
            <Link href="/signup" className="block text-sm text-center text-slate-500 hover:text-slate-800">
                新規登録はこちら
            </Link>
        </form>
    );
}
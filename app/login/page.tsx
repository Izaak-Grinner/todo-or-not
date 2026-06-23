'use client'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [pending, setPending] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const supabase = createClient()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setPending(true)
        setError('')

        const { error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
            setError('メールアドレスまたはパスワードが間違っています')
            setPending(false)
            return
        }

        const from = searchParams.get('from')
        const dest = from && from.startsWith('/') ? from : '/'
        router.replace(dest)
        router.refresh()
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <form onSubmit={handleLogin} className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                <h1 className="text-2xl font-bold text-slate-800 mb-6 text-center">ログイン</h1>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">メールアドレス</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">パスワード</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            autoComplete="current-password"
                            required
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm"
                        />
                    </div>
                </div>

                {error && <p className="mt-4 text-sm text-rose-600 text-center">{error}</p>}

                <button
                    type="submit"
                    disabled={pending}
                    className="w-full mt-6 bg-slate-900 text-white py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition active:scale-[0.98] disabled:opacity-50"
                >
                    {pending ? 'ログイン中…' : 'ログイン'}
                </button>

                <Link href="/signup" className="block mt-6 text-sm text-center text-slate-500 hover:text-slate-800 transition">
                    新規登録はこちら
                </Link>
            </form>
        </div>
    )
}
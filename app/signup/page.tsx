'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function SignupPage() {
    const [name, setName] = useState('') // 💡 名前保存用のステートを追加
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [pending, setPending] = useState(false)
    const supabase = createClient()

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setPending(true)
        setMessage('')

        // 💡 options.data の中に display_name として名前を含めて送信する
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    display_name: name
                }
            }
        })

        if (error) {
            setMessage(`エラー: ${error.message}`)
            setPending(false)
            return
        }

        if (data.user && data.user.identities && data.user.identities.length === 0) {
            setMessage('確認メールを送信しました。受信箱をご確認ください。')
        } else if (data.session) {
            setMessage('登録が完了しました。ログインページからログインしてください。')
        } else {
            setMessage('確認メールを送信しました。受信箱をご確認ください。')
        }
        setPending(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <form onSubmit={handleSignup} className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                <h1 className="text-2xl font-bold text-slate-800 mb-6 text-center">新規登録</h1>

                <div className="space-y-4">
                    {/* 💡 名前の入力フォームを追加 */}
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">お名前</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="山田 太郎"
                            required
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm"
                        />
                    </div>

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
                        <label className="block text-sm font-medium text-slate-600 mb-1">パスワード（6文字以上）</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            autoComplete="new-password"
                            minLength={6}
                            required
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={pending}
                    className="w-full mt-6 bg-slate-900 text-white py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition active:scale-[0.98] disabled:opacity-50"
                >
                    {pending ? '送信中…' : '登録する'}
                </button>

                {message && (
                    <p className={`mt-4 text-sm text-center ${message.startsWith('エラー') ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {message}
                    </p>
                )}

                <Link href="/login" className="block mt-6 text-sm text-center text-slate-500 hover:text-slate-800 transition">
                    ログインはこちら
                </Link>
            </form>
        </div>
    )
}
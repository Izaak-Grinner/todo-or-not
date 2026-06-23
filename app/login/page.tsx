// app/login/page.tsx
import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-sm border border-slate-200">
                <h1 className="text-xl font-bold text-center mb-6">ログイン</h1>
                {/* Suspenseでラップして非同期処理を安全に管理 */}
                <Suspense fallback={<div className="text-center text-sm">読み込み中...</div>}>
                    <LoginForm />
                </Suspense>
            </div>
        </main>
    );
}
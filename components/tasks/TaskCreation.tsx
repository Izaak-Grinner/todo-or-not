"use client";

import { useState, useEffect } from "react";
import { createClient } from "../../lib/supabase/client";
import { Task } from "../../lib/taskTypes";

export default function TaskCreation() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const init = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) setUserId(user.id);

                const res = await fetch("/api/data/task"); // パスを適宜調整してください
                if (!res.ok) throw new Error("タスク取得失敗");
                const data = await res.json();
                setTasks(data);
            } catch (err) {
                console.error("初期化エラー:", err);
            } finally {
                setFetching(false);
            }
        };
        init();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userId) return alert("ログインしてください。");

        const formData = new FormData(e.currentTarget);
        setLoading(true);

        // 💡 ここで宣言する
        let res: Response | undefined;

        try {
            const submissions = tasks
                .map((task) => {
                    const selection = formData.get(`task-${task.id}`);
                    if (!selection) return null;
                    return {
                        userId,
                        taskId: task.id,
                        selection: selection === "todo",
                    };
                })
                .filter((item): item is { userId: string; taskId: string; selection: boolean } => item !== null);

            if (submissions.length === 0) {
                alert("回答を選択してください。");
                setLoading(false);
                return;
            }

            // 💡 値を代入する
            res = await fetch("/api/data/userTask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(submissions),
            });

            if (!res.ok) throw new Error("保存に失敗しました");
            alert("登録が完了しました！");
        } catch (errorMessage) {
            // 💡 ここで res が undefined かもしれないのでチェックして詳細を表示
            if (res) {
                const errorData = await res.json().catch(() => ({ error: "詳細不明なエラー" }));
                errorMessage = errorData.error || errorMessage;
            }
            console.error("サーバーからの詳細エラー:", errorMessage);
            alert(`保存に失敗しました: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <p>読み込み中...</p>;

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-xl text-slate-800">タスクを選択</h3>
            {tasks.map((task) => (
                <div key={task.id} className="p-4 bg-slate-50 rounded-lg border">
                    <h4 className="font-bold text-sm">{task.title}</h4>
                    <p className="text-xs text-slate-500 mb-3">{task.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                        <label className="text-xs border p-2 rounded cursor-pointer bg-white">
                            <input type="radio" name={`task-${task.id}`} value="todo" required className="mr-1" />
                            {task.todo}
                        </label>
                        <label className="text-xs border p-2 rounded cursor-pointer bg-white">
                            <input type="radio" name={`task-${task.id}`} value="not_todo" className="mr-1" />
                            {task.notTodo}
                        </label>
                    </div>
                </div>
            ))}
            <button disabled={loading} className="w-full bg-slate-900 text-white py-2 rounded-lg font-semibold">
                {loading ? "登録中..." : "回答を送信"}
            </button>
        </form>
    );
}
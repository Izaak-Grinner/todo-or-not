"use client";
import { useState, useEffect } from "react";
import { Task, UserTask } from "../../lib/taskTypes";

export default function TaskList() {
    // 💡 ダミーデータを空の配列にし、APIからロードする形に変更
    const [tasks, setTasks] = useState<Task[]>([]);
    const [userTasks, setUserTasks] = useState<UserTask[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        // APIからデータを取得する非同期関数
        async function fetchListData() {
            try {
                setLoading(true);
                setError("");

                // 💡 2つのAPI（タスク一覧 と 自分の回答一覧）を同時に叩く
                const [tasksRes, userTasksRes] = await Promise.all([
                    fetch("/api/data/task"),
                    fetch("/api/data/userTask")
                ]);

                // 認証エラー（401）などのチェック
                if (!tasksRes.ok || !userTasksRes.ok) {
                    throw new Error("データの取得に失敗しました。再ログインしてください。");
                }

                const tasksData = await tasksRes.json();
                const userTasksData = await userTasksRes.json();

                setTasks(tasksData);
                setUserTasks(userTasksData);
            } catch (err: any) {
                console.error(err);
                setError(err.message || "エラーが発生しました");
            } finally {
                setLoading(false);
            }
        }

        fetchListData();
    }, []); // 💡 ページが読み込まれた時に1回だけ実行

    // ⏳ ロード中の表示
    if (loading) {
        return (
            <div className="max-w-md mx-auto p-8 bg-white rounded-xl border border-slate-200 text-center text-slate-500 text-sm">
                <div className="animate-spin inline-block w-5 h-5 border-2 border-slate-600 border-t-transparent rounded-full mb-2"></div>
                <p>回答データを読み込み中...</p>
            </div>
        );
    }

    // 🚨 エラー発生時の表示
    if (error) {
        return (
            <div className="max-w-md mx-auto p-4 bg-rose-50 text-rose-600 rounded-xl border border-rose-200 text-sm text-center">
                {error}
            </div>
        );
    }

    return (
        <div className="currentTask max-w-md mx-auto p-4 bg-white rounded-xl border border-slate-200">
            <h3 className="font-bold text-lg mb-4 text-slate-800">あなたの回答一覧</h3>

            {tasks.length === 0 ? (
                <p className="text-center text-sm text-slate-400 py-6">タスクがまだありません。</p>
            ) : (
                <ul className="space-y-3">
                    {tasks.map((task) => {
                        // 💡 リアルタイムに取得した userTasks から、現在の task.id と一致する回答データを紐付ける
                        const userProgress = userTasks.find((ut) => ut.taskId === task.id);

                        return (
                            <li key={task.id} className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-slate-800">{task.title}</span>
                                </div>

                                <p className="text-sm text-slate-600">{task.description}</p>

                                {userProgress && (
                                    <div className="flex items-start gap-2 bg-white p-2 rounded border border-slate-200 text-xs text-slate-600">
                                        <span className={`shrink-0 inline-block px-1.5 py-0.5 text-[10px] font-bold rounded ${userProgress.selection
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-rose-100 text-rose-700"
                                            }`}>
                                            {userProgress.selection ? "👍 To Do" : "🙅‍♀️ Not To Do"}
                                        </span>
                                        <span className="font-medium text-slate-700">
                                            {userProgress.selection ? task.todo : task.notTodo}
                                        </span>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
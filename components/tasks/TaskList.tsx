"use client";
import { useState } from "react";
import { Task, UserTask, dummy_tasks, dummy_user_tasks } from "../../lib/taskTypes";

// ダミーデータ

export default function TaskList() {
    const [tasks] = useState<Task[]>(dummy_tasks);
    const [userTasks] = useState<UserTask[]>(dummy_user_tasks);

    return (
        /* 💡 max-w-md で最大横幅を狭くし、mx-auto で画面の中央に配置しています */
        <div className="currentTask max-w-md mx-auto p-4 bg-white rounded-xl border border-slate-200">
            <h3 className="font-bold text-lg mb-4 text-slate-800">あなたの回答一覧</h3>
            <ul className="space-y-3">
                {tasks.map((task) => {
                    // 💡 userTasks から、現在の task.id と一致する回答データを紐付ける
                    const userProgress = userTasks.find((ut) => ut.taskId === task.id);

                    return (
                        <li key={task.id} className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-slate-800">{task.title}</span>
                            </div>

                            <p className="text-sm text-slate-600">{task.description}</p>

                            {/* 💡 「選択内容:」の代わりに、色付きのラベル（👍 To Do / 🙅‍♀️ Not To Do）を表示 */}
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
        </div>
    );
}
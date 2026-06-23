"use client";

import { useRef } from "react";
import { dummy_tasks, UserTask } from "../../lib/taskTypes";

export default function TaskCreation() {
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();

        const formData = new FormData(formRef.current!);
        const results: UserTask[] = [];

        // 💡 全タスクを走査し、チェックされている選択肢を回収
        dummy_tasks.forEach((task) => {
            const selection = formData.get(`task-${task.id}`); // 例: task-1, task-2
            if (selection) {
                results.push({
                    userID: "hoge",
                    taskId: task.id,
                    selection: selection === "todo",
                });
            }
        });

        if (results.length === 0) {
            alert("少なくとも1つのタスクで選択を行ってください。");
            return;
        }

        // 💡 選択されたすべてのタスクデータ（配列）をログ出力
        console.log("DB保存対象:", results);
        alert(`${results.length} 件の意思決定を登録しました。`);

        formRef.current?.reset();
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-xl text-slate-800 mb-6">倫理タスクを判断して登録</h3>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                {dummy_tasks.map((task) => (
                    <div key={task.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                        <div>
                            <h4 className="font-bold text-slate-800 text-sm">{task.title}</h4>
                            <p className="text-xs text-slate-500">{task.description}</p>
                        </div>

                        {/* 💡 name属性をタスクごとに固有（task-1など）にし、タスク内で排他制御 */}
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { value: "todo", label: `👍 ${task.todo}` },
                                { value: "not_todo", label: `🙅‍♀️ ${task.notTodo}` }
                            ].map((option) => (
                                <label
                                    key={option.value}
                                    className={`p-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:border-slate-300 block cursor-pointer text-center text-slate-800 `}
                                >
                                    <input
                                        type="radio"
                                        name={`task-${task.id}`}
                                        value={option.value}
                                        className="mr-1.5 accent-slate-900"
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}

                <button type="submit" className="w-full bg-slate-900 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition">
                    選択した意思決定を登録する
                </button>
            </form>
        </div>
    );
}
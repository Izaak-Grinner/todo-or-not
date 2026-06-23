"use client";

import tasksData from '@/prisma/seed.json'; // 必要に応じてパスを調整

export default function SeedButton() {
    const runSeed = async () => {
        console.log("シード開始...");

        for (const task of tasksData) {
            // APIエンドポイントを叩く
            const res = await fetch("/api/data/task", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(task),
            });

            if (!res.ok) {
                // サーバーが返したエラー内容をテキストとして取得
                const errorDetail = await res.text();
                console.error(`失敗: ${task.title} | 理由: ${errorDetail}`);
            } else {
                console.log(`成功: ${task.title}`);
            }
        }
        alert("シード完了しました！");
    };

    return (
        <button
            onClick={runSeed}
            className="p-4 bg-blue-500 text-white rounded"
        >
            テストデータを投入する
        </button>
    );
}
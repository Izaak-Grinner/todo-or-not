"use client";
import { useEffect, useState } from "react";
import TaskList from "@/components/tasks/TaskList";
import TaskCreation from "@/components/tasks/TaskCreation";
import TaskShare from "@/components/tasks/TaskShare";

type Mode = "see" | "make" | "share";

export default function Home() {
  const [mode, setMode] = useState<Mode>("see");
  return (
    <>
      {(() => {
        switch (mode) {
          case "see": return <TaskList />;
          case "make": return <TaskCreation />;
          case "share": return <TaskShare />;
          default: return null;
        }
      })()}

      <div className="flex gap-2 w-full justify-center">
        {[
          { id: "see", label: "自分のタスクを見る" },
          { id: "make", label: "タスクを作る" },
          { id: "share", label: "人のタスクをみる" },
        ].map((btn) => (
          // 現在のモード「以外」のボタンだけをレンダリングする
          mode !== btn.id && (
            <button
              key={btn.id}
              onClick={() => setMode(btn.id as Mode)}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 hover:text-slate-900 active:scale-95 transition-all duration-150"
            >
              {btn.label}
            </button>
          )
        ))}
      </div>

    </>
  );
}
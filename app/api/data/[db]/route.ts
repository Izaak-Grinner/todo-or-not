import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 1. ホワイトリスト
const ALLOWED_DATABASES = ["user", "task", "userTask"] as const;
type DatabaseType = typeof ALLOWED_DATABASES[number];

// 【GET】一覧取得処理
export async function GET(
    request: Request,
    { params }: { params: Promise<{ db: string }> } // 💡 型を Promise で包む
) {
    try {
        // 💡 params を非同期で解決（アンラップ）する
        const { db } = await params;

        if (!ALLOWED_DATABASES.includes(db as any)) {
            return NextResponse.json(
                { error: `無効なエンドポイントです。'${db}' にはアクセスできません。` },
                { status: 400 }
            );
        }

        const model = (prisma as any)[db];
        const data = await model.findMany({
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("API Gateway GET Error:", error);
        return NextResponse.json({ error: "サーバーエラーが発生しました" }, { status: 500 });
    }
}

// 【POST】新規作成処理
export async function POST(
    request: Request,
    { params }: { params: Promise<{ db: string }> } // 💡 型を Promise で包む
) {
    try {
        // 💡 params を非同期で解決（アンラップ）する
        const { db } = await params;

        if (!ALLOWED_DATABASES.includes(db as any)) {
            return NextResponse.json(
                { error: `無効なエンドポイントです。'${db}' にはアクセスできません。` },
                { status: 400 }
            );
        }

        const body = await request.json();
        const model = (prisma as any)[db];

        const newData = await model.create({
            data: body,
        });

        return NextResponse.json(newData, { status: 201 });
    } catch (error) {
        console.error("API Gateway POST Error:", error);
        return NextResponse.json({ error: "データの作成に失敗しました" }, { status: 500 });
    }
}
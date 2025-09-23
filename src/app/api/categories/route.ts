import { NextResponse } from "next/server";
import { fetchCategoryFromKuroco } from "@/app/lib/kuroco.server";

/**
 * Categories API Route
 * クライアント(Zustand)から /api/categories で叩いて
 * Kurocoのカテゴリー一覧を取得・返却する。
 * そのままKurocoレスポンス(JSON)を透過返却。
 */
export async function GET() {
  try {
    const data = await fetchCategoryFromKuroco();
    return NextResponse.json(data, { status: 200 });
  } catch (e: unknown) {
    console.error("[GET /api/categories] failed:", e);
    return NextResponse.json(
      { error: true, message: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

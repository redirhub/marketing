import { NextResponse } from "next/server";
import { SUPPORT_ARTICLES } from "@/lib/dummy-data/support-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  if (category) {
    const filtered = SUPPORT_ARTICLES.filter(
      (article) => article.category.toLowerCase() === category.toLowerCase()
    );
    return NextResponse.json(filtered);
  }

  return NextResponse.json(SUPPORT_ARTICLES);
}

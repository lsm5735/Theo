import { NextRequest, NextResponse } from "next/server";
import { INQUIRY_EMAIL } from "@/lib/site";

// 테오 봇 문의 접수.
// · 환경변수 RESEND_API_KEY 가 있으면 Resend 로 INQUIRY_EMAIL 에 바로 발송합니다.
// · 없으면 발송하지 않고 delivered:false 를 돌려줘서, 화면에서 사용자의 메일 앱으로 보내도록 안내합니다.

const clip = (v: unknown, n: number) => (typeof v === "string" ? v.trim().slice(0, n) : "");
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));

export async function POST(req: NextRequest) {
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "잘못된 요청이에요." }, { status: 400 });
  }

  const name = clip(body.name, 50);
  const email = clip(body.email, 120);
  const message = clip(body.message, 2000);

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "이름, 이메일, 문의 내용을 확인해 주세요." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key || !INQUIRY_EMAIL) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.INQUIRY_FROM || "Theo Bot <onboarding@resend.dev>",
        to: [INQUIRY_EMAIL],
        reply_to: email,
        subject: `[테오 문의] ${name}님`,
        html: `<p><b>이름</b> ${esc(name)}</p><p><b>이메일</b> ${esc(email)}</p><p style="white-space:pre-wrap">${esc(message)}</p>`,
      }),
    });
    if (!res.ok) return NextResponse.json({ ok: true, delivered: false });
    return NextResponse.json({ ok: true, delivered: true });
  } catch {
    return NextResponse.json({ ok: true, delivered: false });
  }
}

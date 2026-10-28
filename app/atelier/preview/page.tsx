import { redirect } from "next/navigation";

// 구 미리보기 경로 — 작가 등록 후 개설되는 내 아틀리에로 통합
export default function AtelierPreviewRedirect() {
  redirect("/atelier/me");
}

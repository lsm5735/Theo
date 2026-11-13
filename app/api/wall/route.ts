import { NextRequest, NextResponse } from "next/server";
import { put, list, del } from "@vercel/blob";
import { createHash, randomBytes } from "crypto";
import artists from "@/data/artists.json";

// 작가별 담벼락 — 방문자의 글·사진을 Vercel Blob 에 저장한다.
//  · 글 한 건 = wall/<작가id>/<시각13자리>-<글id>.json  (파일명이 시간순이라 목록 정렬이 곧 시간순)
//  · 사진     = wall-img/<작가id>/<시각13자리>-<글id>.<확장자>
//  · 글을 쓴 사람에게만 삭제용 토큰(deleteToken)을 한 번 돌려주고, 서버에는 해시만 남긴다.
//  · 부적절한 글 관리: scripts/wall-admin.mjs (목록 보기 / 삭제)

export const dynamic = "force-dynamic";

const VALID_WALLS = new Set(artists.map((a) => a.id));
const MAX_NAME = 20;
const MAX_TEXT = 500;
const MAX_IMAGE_BYTES = 2_000_000;
const MAX_LIST = 100;

const clip = (v: unknown, n: number) => (typeof v === "string" ? v.trim().slice(0, n) : "");
const sha = (s: string) => createHash("sha256").update(s).digest("hex");

interface StoredPost {
  id: string;
  wallId: string;
  role: "theo";
  authorName: string;
  text: string;
  image: string;
  imagePath?: string;
  createdAt: string;
  tokenHash: string;
}

function publicPost(p: StoredPost) {
  const { tokenHash, imagePath, ...rest } = p;
  void tokenHash;
  void imagePath;
  return rest;
}

function crossSite(req: NextRequest) {
  const site = req.headers.get("sec-fetch-site");
  return !!site && site !== "same-origin" && site !== "same-site" && site !== "none";
}

export async function GET(req: NextRequest) {
  const wallId = req.nextUrl.searchParams.get("wallId") ?? "";
  if (!VALID_WALLS.has(wallId)) {
    return NextResponse.json({ ok: false, error: "없는 담벼락이에요." }, { status: 400 });
  }
  try {
    const { blobs } = await list({ prefix: `wall/${wallId}/`, limit: 1000 });
    const latest = blobs.sort((a, b) => b.pathname.localeCompare(a.pathname)).slice(0, MAX_LIST);
    const posts = (
      await Promise.all(
        latest.map(async (b) => {
          try {
            const r = await fetch(b.url, { cache: "no-store" });
            return publicPost((await r.json()) as StoredPost);
          } catch {
            return null;
          }
        })
      )
    ).filter(Boolean);
    return NextResponse.json({ ok: true, posts }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ ok: false, error: "담벼락을 불러오지 못했어요." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (crossSite(req)) return NextResponse.json({ ok: false, error: "허용되지 않은 요청이에요." }, { status: 403 });
  if (Number(req.headers.get("content-length") ?? 0) > MAX_IMAGE_BYTES * 1.5) {
    return NextResponse.json({ ok: false, error: "사진이 너무 커요." }, { status: 413 });
  }

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "잘못된 요청이에요." }, { status: 400 });
  }

  const wallId = clip(body.wallId, 60);
  if (!VALID_WALLS.has(wallId)) {
    return NextResponse.json({ ok: false, error: "없는 담벼락이에요." }, { status: 400 });
  }
  const authorName = clip(body.authorName, MAX_NAME) || "테오";
  const text = clip(body.text, MAX_TEXT);
  const imageData = typeof body.image === "string" ? body.image : "";
  if (!text && !imageData) {
    return NextResponse.json({ ok: false, error: "내용이나 사진을 넣어 주세요." }, { status: 400 });
  }

  const id = randomBytes(6).toString("hex");
  const ts = String(Date.now()).padStart(13, "0");

  try {
    let image = "";
    let imagePath: string | undefined;
    if (imageData) {
      const m = /^data:(image\/(jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/.exec(imageData);
      if (!m) return NextResponse.json({ ok: false, error: "사진 형식을 확인해 주세요." }, { status: 400 });
      const buf = Buffer.from(m[3], "base64");
      if (buf.length > MAX_IMAGE_BYTES) {
        return NextResponse.json({ ok: false, error: "사진이 너무 커요." }, { status: 413 });
      }
      const ext = m[2] === "jpeg" ? "jpg" : m[2];
      const up = await put(`wall-img/${wallId}/${ts}-${id}.${ext}`, buf, {
        access: "public",
        contentType: m[1],
        addRandomSuffix: false,
      });
      image = up.url;
      imagePath = up.pathname;
    }

    const token = randomBytes(16).toString("hex");
    const post: StoredPost = {
      id,
      wallId,
      role: "theo",
      authorName,
      text,
      image,
      imagePath,
      createdAt: new Date().toISOString(),
      tokenHash: sha(token),
    };
    await put(`wall/${wallId}/${ts}-${id}.json`, JSON.stringify(post), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
    });
    return NextResponse.json({ ok: true, post: publicPost(post), token });
  } catch {
    return NextResponse.json({ ok: false, error: "저장하지 못했어요. 잠시 후 다시 시도해 주세요." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (crossSite(req)) return NextResponse.json({ ok: false, error: "허용되지 않은 요청이에요." }, { status: 403 });
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "잘못된 요청이에요." }, { status: 400 });
  }
  const wallId = clip(body.wallId, 60);
  const id = clip(body.id, 40);
  const token = clip(body.token, 100);
  if (!VALID_WALLS.has(wallId) || !/^[a-f0-9]{12}$/.test(id) || !token) {
    return NextResponse.json({ ok: false, error: "잘못된 요청이에요." }, { status: 400 });
  }
  try {
    const { blobs } = await list({ prefix: `wall/${wallId}/`, limit: 1000 });
    const target = blobs.find((b) => b.pathname.endsWith(`-${id}.json`));
    if (!target) return NextResponse.json({ ok: false, error: "이미 없는 글이에요." }, { status: 404 });
    const post = (await (await fetch(target.url, { cache: "no-store" })).json()) as StoredPost;
    if (sha(token) !== post.tokenHash) {
      return NextResponse.json({ ok: false, error: "내가 쓴 글만 지울 수 있어요." }, { status: 403 });
    }
    await del([target.pathname, ...(post.imagePath ? [post.imagePath] : [])]);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "지우지 못했어요." }, { status: 500 });
  }
}

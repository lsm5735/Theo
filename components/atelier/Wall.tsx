"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useT, useLang } from "@/contexts/LangContext";
import { resizeImage } from "@/lib/myAtelier";
import { WallPost, WallRole, addWallPost, deleteWallPost, useWallPosts } from "@/lib/wall";
import { TEXTAREA_CLS } from "./AtelierFields";

const MAX_TEXT = 500;

export interface WallAuthor {
  role: WallRole;
  name: string;
}

function formatDate(iso: string, lang: string) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return lang === "ko"
    ? `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`
    : d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function Composer({ wallId, author }: { wallId: string; author: WallAuthor }) {
  const t = useT();
  const fileRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  async function pickImage(file: File | undefined) {
    if (!file) return;
    setError("");
    try {
      setImage(await resizeImage(file, 1200));
    } catch {
      setError(t("st_img_fail"));
    }
  }

  function submit() {
    if (!text.trim() && !image) return;
    const ok = addWallPost({ wallId, role: author.role, authorName: author.name, text: text.trim(), image });
    if (!ok) {
      setError(t("st_save_fail"));
      return;
    }
    setText("");
    setImage("");
  }

  return (
    <div className="bg-card rounded-2xl border border-line p-4 mb-8">
      <div className="flex items-center gap-2 mb-3">
        <RoleBadge role={author.role} />
        <span className="text-[13px] font-bold text-navy-800">{author.name}</span>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value.slice(0, MAX_TEXT))}
        placeholder={author.role === "artist" ? t("wall_ph_artist") : t("wall_ph_theo")}
        rows={3}
        className={TEXTAREA_CLS}
      />
      {image && (
        <div className="relative mt-3 inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" className="h-28 rounded-lg border border-line object-cover" />
          <button type="button" onClick={() => setImage("")}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-navy-800 text-white text-xs font-bold"
            aria-label={t("st_remove")}>
            ×
          </button>
        </div>
      )}
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      <div className="flex items-center justify-between mt-3">
        <button type="button" onClick={() => fileRef.current?.click()}
          className="text-[13px] font-semibold text-navy-600 hover:text-navy-800 transition-colors">
          {t("wall_add_photo")}
        </button>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-navy-400">{text.length}/{MAX_TEXT}</span>
          <button type="button" onClick={submit} disabled={!text.trim() && !image}
            className="nb-btn px-5 py-2 rounded-lg font-black text-[13px] disabled:opacity-40 disabled:pointer-events-none">
            {t("wall_submit")}
          </button>
        </div>
      </div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => { pickImage(e.target.files?.[0]); e.target.value = ""; }} />
    </div>
  );
}

function RoleBadge({ role }: { role: WallRole }) {
  const t = useT();
  return role === "artist" ? (
    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-sv text-ink">{t("wall_role_artist")}</span>
  ) : (
    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-navy-100 text-navy-700">{t("wall_role_theo")}</span>
  );
}

function PostCard({ post, artistName }: { post: WallPost; artistName: string }) {
  const t = useT();
  const { lang } = useLang();
  const isArtist = post.role === "artist";
  const [title, ...rest] = post.text.split("\n\n");
  // 시드 작가 글은 "제목\n\n본문" 형태
  const hasTitle = isArtist && rest.length > 0;

  return (
    <article
      className={`rounded-2xl border p-4 ${isArtist ? "rounded-tr-md" : "rounded-tl-md"}`}
      style={{
        background: isArtist ? "var(--chiffon)" : "var(--card)",
        borderColor: isArtist ? "rgba(194,164,63,.35)" : "var(--line)",
        animation: post.mine ? "srUp .5s ease-out both" : undefined,
      }}
    >
      <div className={`flex items-center justify-between gap-2 mb-2 ${isArtist ? "flex-row-reverse" : ""}`}>
        <div className={`flex items-center gap-2 min-w-0 ${isArtist ? "flex-row-reverse" : ""}`}>
          <RoleBadge role={post.role} />
          <span className="text-[13px] font-bold text-navy-800 truncate">{isArtist ? artistName : post.authorName}</span>
        </div>
        <time className="text-[11px] text-muted shrink-0">{formatDate(post.createdAt, lang)}</time>
      </div>
      {hasTitle ? (
        <>
          <p className="font-myeongjo font-bold text-navy-800 text-[14px] mb-1.5">{title}</p>
          <p className="text-[13.5px] text-ink leading-[1.85] whitespace-pre-line" style={{ wordBreak: "keep-all" }}>
            {rest.join("\n\n")}
          </p>
        </>
      ) : (
        post.text && (
          <p className={`text-[13.5px] text-ink leading-[1.85] whitespace-pre-line ${isArtist ? "font-myeongjo" : ""}`}
            style={{ wordBreak: "keep-all" }}>
            {post.text}
          </p>
        )
      )}
      {post.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.image} alt="" className={`mt-3 w-44 h-32 rounded-lg object-cover border border-line ${isArtist ? "ml-auto" : ""}`} />
      )}
      {post.mine && (
        <div className={`mt-2 ${isArtist ? "text-left" : "text-right"}`}>
          <button onClick={() => deleteWallPost(post.id)}
            className="text-[11px] text-navy-400 hover:text-red-500 underline underline-offset-2">
            {t("wall_delete")}
          </button>
        </div>
      )}
    </article>
  );
}

export default function Wall({
  wallId,
  artistName,
  author,
  lockedCta,
}: {
  wallId: string;
  artistName: string;
  /** null이면 글쓰기 잠금 (작가 본인·후원한 테오만 작성) */
  author: WallAuthor | null;
  lockedCta?: { href: string; label: string };
}) {
  const t = useT();
  const posts = useWallPosts(wallId);

  return (
    <section id="wall">
      <h2 className="text-[22px] font-semibold text-ink mb-1">{t("wall_title")}</h2>
      <p className="text-xs text-muted mb-6">{t("wall_sub")}</p>

      {author ? (
        <Composer wallId={wallId} author={author} />
      ) : (
        <div className="rounded-2xl border border-dashed border-line-strong px-5 py-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-[13px] text-navy-600 leading-[1.7]" style={{ wordBreak: "keep-all" }}>{t("wall_locked")}</p>
          {lockedCta && (
            <Link href={lockedCta.href} className="nb-btn shrink-0 px-4 py-2 rounded-lg font-black text-[13px] text-center">
              {lockedCta.label}
            </Link>
          )}
        </div>
      )}

      <div className="flex justify-between text-[11px] font-bold text-navy-400 mb-3 px-1">
        <span>{t("wall_side_theo")}</span>
        <span>{t("wall_side_artist")}</span>
      </div>

      {/* 가운데 직선 타임라인 — 아래(첫 글)에서 위(최신 글)로 쌓인다 */}
      <div className="relative">
        <div aria-hidden="true" className="hidden sm:block absolute left-1/2 -translate-x-1/2 top-0 bottom-3 w-px bg-navy-200" />
        <ol className="relative space-y-5">
          {(posts ?? []).map((post) => {
            const isArtist = post.role === "artist";
            return (
              <li key={post.id} className={`relative flex ${isArtist ? "justify-end" : "justify-start"}`}>
                <span
                  aria-hidden="true"
                  className="hidden sm:block absolute left-1/2 -translate-x-1/2 top-5 w-2.5 h-2.5 rounded-full border-2"
                  style={{
                    background: isArtist ? "var(--sv)" : "white",
                    borderColor: isArtist ? "var(--sv-deep)" : "var(--navy-400)",
                  }}
                />
                <div className="w-[86%] sm:w-[calc(50%-18px)] min-w-0">
                  <PostCard post={post} artistName={artistName} />
                </div>
              </li>
            );
          })}
          {/* 시작점 */}
          <li className="relative flex flex-col items-center pt-2">
            <span aria-hidden="true" className="w-3 h-3 rounded-full bg-white border-2 border-navy-400 mb-2" />
            <p className="text-[12.5px] font-bold text-navy-600 bg-paper px-2">{t("wall_root")}</p>
            {posts && posts.length === 0 && (
              <p className="text-[12px] text-muted mt-0.5 bg-paper px-2">{t("wall_empty")}</p>
            )}
          </li>
        </ol>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import artists from "@/data/artists.json";
import materials from "@/data/materials.json";

interface Props {
  artistId: string;
}

function IconCheck() {
  return (
    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink">
      <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}

export default function SponsorClient({ artistId }: Props) {
  const artist = artists.find((a) => a.id === artistId);

  const [selected, setSelected] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);

  if (!artist) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <p className="text-muted">작가를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const compatibleMaterials = materials.filter(
    (m) => m.compatibleGenres.includes(artist.genre) && !m.isFunded
  );

  const selectedMaterial = materials.find((m) => m.id === selected);
  const fee = selectedMaterial ? Math.round(selectedMaterial.price * 0.03) : 0;
  const total = selectedMaterial ? selectedMaterial.price + fee : 0;

  /* ─── Done screen ─── */
  if (done && selectedMaterial) {
    return (
      <div className="min-h-screen bg-paper">
        <Header />
        <div className="max-w-lg mx-auto px-5 py-20 text-center">
          <div className="w-16 h-16 bg-sv rounded-full flex items-center justify-center mx-auto mb-6">
            <IconMail />
          </div>
          <h1 className="text-2xl font-black text-navy-800 mb-3">선물이 전달됐습니다!</h1>
          <p className="text-muted leading-relaxed mb-2">
            <span className="font-bold text-navy-800">{artist.name}</span> 작가에게
          </p>
          <p className="font-black text-navy-700 text-lg mb-6">
            {selectedMaterial.name}
          </p>
          <p className="text-sm text-muted mb-2">을(를) 선물했어요.</p>

          {/* Patron order */}
          <div className="bg-navy-800 text-white rounded-xl p-5 mb-6 text-center">
            <p className="text-sv font-bold text-xs tracking-[0.16em] mb-2 uppercase">씨앗 배지 획득</p>
            <p className="font-black text-lg">
              당신은 이제 {artist.name} 작가의<br />
              <span className="text-sv text-2xl">{artist.currentProject.sponsorCount + 1}번째 테오</span>입니다.
            </p>
          </div>

          {/* Message receipt */}
          {message && (
            <div className="bg-chiffon border border-sv-deep/20 rounded-xl p-5 text-left mb-8">
              <p className="text-xs text-muted mb-2 font-medium">내가 남긴 응원 메시지 (Dear Gogh)</p>
              <p className="font-myeongjo text-sm text-ink leading-relaxed">{message}</p>
            </div>
          )}

          <p className="text-xs text-muted mb-8 leading-relaxed">
            재료가 준비되면 작가에게 전달됩니다.<br />
            작가가 받으면 편지가 도착할 거예요.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/artists/${artist.id}`}
              className="flex-1 bg-navy-800 text-white font-bold py-3.5 rounded-lg hover:bg-navy-700 transition-colors text-sm text-center"
            >
              아틀리에 돌아가기
            </Link>
            <Link
              href="/"
              className="flex-1 bg-card border border-navy-200 text-navy-700 font-semibold py-3.5 rounded-lg hover:bg-navy-100 transition-colors text-sm text-center"
            >
              다른 작가 보기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Sponsor form ─── */
  return (
    <div className="min-h-screen bg-paper">
      <Header />

      <div className="max-w-[640px] mx-auto px-5 md:px-8 py-10">

        {/* Back link */}
        <Link
          href={`/artists/${artist.id}`}
          className="inline-flex items-center gap-1.5 text-sm text-navy-600 hover:text-navy-800 font-medium mb-8 transition-colors"
        >
          ← {artist.name} 아틀리에
        </Link>

        {/* Artist summary banner */}
        <div className="bg-navy-800 rounded-xl p-5 flex items-center gap-4 mb-8">
          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-sv-soft shrink-0">
            <Image src={artist.profileImage} alt={artist.name} fill sizes="56px" className="object-cover" />
          </div>
          <div>
            <p className="text-sv font-bold text-xs tracking-[0.16em] uppercase mb-1">재료 선물하기</p>
            <p className="text-white font-black text-base">{artist.name}</p>
            <p className="text-white/60 text-xs mt-0.5">{artist.currentProject.title}</p>
          </div>
        </div>

        {/* STEP 1: Select material */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-6 rounded-full bg-sv text-ink font-black text-xs flex items-center justify-center">
              1
            </span>
            <h2 className="font-black text-navy-800">재료를 선택하세요</h2>
          </div>

          <div className="space-y-3">
            {compatibleMaterials.length === 0 ? (
              <p className="text-sm text-muted text-center py-8">현재 선물 가능한 재료가 없습니다.</p>
            ) : (
              compatibleMaterials.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelected(m.id)}
                  className={`w-full flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all duration-150 ${
                    selected === m.id
                      ? "border-navy-800 bg-card"
                      : "border-navy-100 bg-card hover:border-navy-300"
                  }`}
                  style={selected === m.id ? { boxShadow: '0 8px 22px rgba(23,29,43,.06)' } : undefined}
                >
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-navy-100">
                    <Image src={m.image} alt={m.name} fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-navy-800 text-sm leading-snug">{m.name}</p>
                    <p className="text-xs text-muted mt-0.5 line-clamp-1">{m.usageNote}</p>
                    <p className="text-sm font-bold text-gold-text mt-1.5">{m.price.toLocaleString()}원</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 shrink-0 mt-1 flex items-center justify-center transition-all ${
                      selected === m.id
                        ? "bg-navy-800 border-navy-800"
                        : "border-navy-300"
                    }`}
                  >
                    {selected === m.id && <IconCheck />}
                  </div>
                </button>
              ))
            )}
          </div>
        </section>

        {/* STEP 2: Message */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-6 rounded-full bg-sv text-ink font-black text-xs flex items-center justify-center">
              2
            </span>
            <h2 className="font-black text-navy-800">
              Dear Gogh 메시지{" "}
              <span className="text-muted text-sm font-normal">(선택)</span>
            </h2>
          </div>
          <p className="text-xs text-muted mb-3">작가에게 한마디 · 편지와 함께 전달돼요</p>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="응원의 말을 남겨보세요. 최대 500자."
            maxLength={500}
            rows={4}
            className="w-full bg-card border-2 border-navy-100 focus:border-navy-700 rounded-xl p-4 text-sm text-ink placeholder:text-muted resize-none outline-none transition-colors leading-relaxed"
          />
          <p className="text-xs text-muted text-right mt-1">{message.length} / 500</p>
        </section>

        {/* STEP 3: Summary */}
        {selectedMaterial && (
          <div className="bg-card border border-line rounded-xl p-5 mb-4" style={{ boxShadow: '0 8px 22px rgba(23,29,43,.06)' }}>
            <div className="space-y-2 mb-4 pb-4 border-b border-navy-100">
              <div className="flex justify-between text-sm">
                <span className="text-muted">재료값</span>
                <span className="font-medium text-navy-800">{selectedMaterial.price.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">결제·전달 수수료 (3%)</span>
                <span className="font-medium text-navy-600">{fee.toLocaleString()}원</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-navy-800">총 결제 금액</span>
              <span className="font-black text-navy-800 text-lg">{total.toLocaleString()}원</span>
            </div>
            <p className="text-xs text-muted mt-3 leading-relaxed">
              재료값 전액이 작가에게 전달됩니다. 작가 수수료는 0%예요.
            </p>
          </div>
        )}

        <button
          disabled={!selected}
          onClick={() => setDone(true)}
          className={`w-full py-4 rounded-xl font-bold text-base transition-all ${
            selected
              ? "bg-navy-800 text-white hover:bg-navy-700"
              : "bg-navy-100 text-navy-300 cursor-not-allowed"
          }`}
          style={selected ? { boxShadow: '0 8px 22px rgba(23,29,43,.06)' } : undefined}
        >
          {selected
            ? `${total.toLocaleString()}원 선물하기`
            : "재료를 먼저 선택해주세요"}
        </button>

        <p className="text-xs text-muted text-center mt-4 leading-relaxed">
          * 이 화면은 시연용 데모입니다. 실제 결제는 이루어지지 않습니다.
        </p>

      </div>
    </div>
  );
}

// 담벼락 관리 도구 — 부적절한 글/사진을 확인하고 지운다.
//   node --env-file=.env.local scripts/wall-admin.mjs list [작가id]
//   node --env-file=.env.local scripts/wall-admin.mjs delete <작가id> <글id>
// (.env.local 은 `npx vercel env pull .env.local` 로 받는다)
import { list, del } from "@vercel/blob";

const [cmd, wallId, id] = process.argv.slice(2);
const walls = wallId ? [wallId] : ["artist_theo_001", "artist_theo_002", "artist_theo_003", "artist_theo_004"];

async function postsOf(w) {
  const { blobs } = await list({ prefix: `wall/${w}/`, limit: 1000 });
  return Promise.all(
    blobs
      .sort((a, b) => b.pathname.localeCompare(a.pathname))
      .map(async (b) => ({ path: b.pathname, ...(await (await fetch(b.url, { cache: "no-store" })).json()) }))
  );
}

if (cmd === "list") {
  for (const w of walls) {
    const posts = await postsOf(w);
    console.log(`\n== ${w} (${posts.length}) ==`);
    for (const p of posts) {
      console.log(`[${p.id}] ${p.createdAt} ${p.authorName}: ${p.text.replace(/\n/g, " ").slice(0, 80)}${p.image ? "  (사진)" : ""}`);
    }
  }
} else if (cmd === "delete" && wallId && id) {
  const post = (await postsOf(wallId)).find((p) => p.id === id);
  if (!post) {
    console.log("해당 글을 찾지 못했어요.");
    process.exit(1);
  }
  await del([post.path, ...(post.imagePath ? [post.imagePath] : [])]);
  console.log(`지웠어요: ${wallId} / ${id}`);
} else {
  console.log("사용법: list [작가id] | delete <작가id> <글id>");
}

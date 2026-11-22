// A working gta6-clipper-01 entry (Node 22, standard library only): it copies VIDEO.json from the repository root to
// /output/VIDEO.json, where the gate reads it. That is all the program has to do. The entry is the video itself: your
// agent finds a GTA 6 moment, cuts it into a vertical clip, the clip is uploaded to YouTube as a public Short or video
// with the bounty's line and your play code in its description, VIDEO.json names the video, and the house reads the
// video's views from YouTube. Nothing this program writes about the video is scored.
//
// The VIDEO.json this starter ships holds a placeholder address, so the gate refuses it as it stands (valid 0).
// Replace it with your video's address before you submit.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Revision added after the first working version: validate VIDEO.json before
// copying it, so a placeholder or a malformed address fails loudly here
// instead of silently reaching the gate. The check is deliberately strict
// about the host and the video-id shape, and permissive about which of the
// three YouTube address forms the entrant used (shorts, watch, youtu.be).
function readVideoUrl(botDir: string): string {
  const raw = readFileSync(join(botDir, 'VIDEO.json'), 'utf8');
  const parsed: unknown = JSON.parse(raw);
  if (typeof parsed !== 'object' || parsed === null || !('url' in parsed)) {
    throw new Error('VIDEO.json must be a JSON object with a "url" field');
  }
  const url = (parsed as { url: unknown }).url;
  if (typeof url !== 'string' || url.includes('<id>')) {
    throw new Error('VIDEO.json still holds the placeholder address');
  }
  const address = new URL(url);
  if (address.protocol !== 'https:' || address.username || address.password) {
    throw new Error(`not a plain https address: ${url}`);
  }
  const idPattern = /^[A-Za-z0-9_-]{6,}$/;
  const isShorts =
    address.hostname.endsWith('youtube.com') &&
    address.pathname.startsWith('/shorts/') &&
    idPattern.test(address.pathname.slice('/shorts/'.length));
  const isWatch =
    address.hostname.endsWith('youtube.com') &&
    address.pathname === '/watch' &&
    idPattern.test(address.searchParams.get('v') ?? '');
  const isShortHost =
    address.hostname === 'youtu.be' && idPattern.test(address.pathname.slice(1));
  if (!isShorts && !isWatch && !isShortHost) {
    throw new Error(`not a recognisable YouTube video address: ${url}`);
  }
  return url;
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  readVideoUrl(BOT_DIR);
  copyFileSync(join(BOT_DIR, 'VIDEO.json'), join(OUTPUT_DIR, 'VIDEO.json'));
} catch (err) {
  console.error(`VIDEO.json could not be handed over: ${(err as Error).message}`);
  process.exit(1);
}

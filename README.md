# Kai Cenat Trusted a Pro Driver in GTA 6... It Ends in Disaster

Entry for make.fun's **gta6-clipper-01** — "Clip GTA 6 for the most YouTube views" —
entered under the account **@parlapo**.

## The clip

- **Moment chosen:** Kai Cenat's first GTA 6 getaway from his launch-week Twitch
  stream (clip `SincereMoldyGaragePartyTime`). Lucia, at the wheel, is asked
  whether she is a professional; seconds later the car bursts out of the garage
  into a Vice City alley, pedestrians scatter, and the escape is on. One single
  moment, no montage — the streamer's reaction carries it.
- **Why this moment:** it opens on a line of dialogue that sets up the joke,
  pays it off with driving chaos inside half a minute, and needs no context
  from the rest of the stream to land with a cold viewer.
- **Creative:** vertical 1080x1920 blur-fill so the full 16:9 frame, the
  streamer's facecam and the wanted stars all survive the crop; a two-line
  hook over the first five seconds ("KAI CENAT TRUSTED A PRO DRIVER / IN GTA 6...
  IT ENDS LIKE THIS"); a caption line naming the moment; and a five-second end
  card carrying make.fun's pitch — "MAKE CLIPS LIKE THIS WITH AI AND EARN MONEY
  ON MAKE.FUN" with the bounty's address, `make.fun/bounty/gta6-clipper-01`.
- **How it was made:** the source clip was fetched in the build session, then
  trimmed, blur-filled, captioned and rendered with ffmpeg commands run in
  that same session. The rendered file is 36.6 seconds, 1080x1920.
- **Upload:** the entrant uploads the rendered file himself as a public
  YouTube Short, with the bounty's line and the entrant's play code in the
  description, and keeps it public until the results are out.

## The program

`main.ts` (Node 22, standard library only) is deliberately small: it validates
that `VIDEO.json` at the repository root names a real YouTube video address
(shorts, watch or youtu.be form — a placeholder fails loudly), then copies the
file byte for byte into the output directory, where the house reads it and
looks the video up itself. Both grading runs therefore produce identical
bytes.

Run it the way the grader does:

```
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

Footage: Grand Theft Auto VI by Rockstar Games, from Kai Cenat's public
Twitch stream. Fan clip; not affiliated with Rockstar Games or Kai Cenat.

// Centralized config for the birthday site.
// TODO: Customize these for your girlfriend!
export const SITE_CONFIG = {
  girlfriendName: "[GIRLFRIEND_NAME]", // TODO: Replace with her name
  songTitle: "Our Song", // TODO: Replace with the real song title
  songArtist: "Artist Name", // TODO: Replace with the artist
  songSince: "the night we met", // TODO: e.g. "June 12, 2022"
  songMessage:
    "Every note reminds me of the way you laugh. This one will always be ours.", // TODO
  // TODO: Drop your audio file at /public/audio/our-song.mp3 (or change the path).
  songSrc: "/audio/our-song.mp3",
  // TODO: Change to her next birthday (YYYY-MM-DDTHH:mm:ss)
  nextBirthday: getNextBirthday("2026-12-25T00:00:00"),
  // Karaoke lyrics — TODO: paste real timed lyrics
  lyrics: [
    { time: 0, text: "🎵 Our song is about to begin..." },
    { time: 4, text: "In a world of ordinary moments" },
    { time: 9, text: "You make every second shine" },
    { time: 14, text: "Like stars dancing in the moonlight" },
    { time: 19, text: "Forever, you'll be mine" },
    { time: 25, text: "Happy birthday, my love" },
  ],
};

function getNextBirthday(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  if (d.getTime() < now.getTime()) {
    d.setFullYear(now.getFullYear() + 1);
  }
  return d.toISOString();
}

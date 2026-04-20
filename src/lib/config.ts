// Centralized config for the birthday site.
// TODO: Customize these for your girlfriend!
export const SITE_CONFIG = {
  girlfriendName: "Iram's Birthday", // TODO: Replace with her name
  songTitle: "Our Song", // TODO: Replace with the real song title
  songArtist: "Artist Name", // TODO: Replace with the artist
  songSince: "the night we met", // TODO: e.g. "June 12, 2022"
  songMessage:
    "Every note reminds me of the way you laugh. This one will always be ours.", // TODO
  // TODO: Drop your audio file at /public/audio/our-song.mp3 (or change the path).
  songSrc: "/audio/our-song.mp3",
  // TODO: Change to her next birthday (YYYY-MM-DDTHH:mm:ss)
  nextBirthday: getNextBirthday("2027-04-21T00:00:00"),
  // Karaoke lyrics — TODO: paste real timed lyrics
lyrics: [
  { time: 0, text: "🎵 Tera mera afsana..." },
  { time: 4, text: "Tera mera afsana, poora hoya naa jaana" },
  { time: 9, text: "Hovaan band kamray vich kalla" },
  { time: 13, text: "Fir vi disda ae parshaavaan" },
  { time: 18, text: "Saaray puchde ne mennu" },
  { time: 22, text: "Kyun main gallan naee karda" },
  { time: 27, text: "Kinnay sohne ne chehre ethe" },
  { time: 31, text: "Dil kyun naee ay bharda" },
  { time: 36, text: "Je naa deedaar hoya" },
  { time: 40, text: "Ohna chirr din naiyo charhda" },
  { time: 45, text: "Dil karay dildaariyan" },
  { time: 49, text: "Bina gallan saareyaan naa larrda" },
  { time: 54, text: "Jidaan rang milde ne odha he aapan mil jaana" },
  { time: 60, text: "Jidaan phull khilde ne odha he donaa khill jaana" },
  { time: 66, text: "Jidaan rang milde ne odha he aapan mil jaana" },
  { time: 72, text: "Jidaan phull khilde ne odha he donaa khill jaana ❤️" },
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

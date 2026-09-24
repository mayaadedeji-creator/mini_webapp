const API_URL = 'https://api.apileague.com/retrieve-random-affirmation';

// Used when there's no API key, the daily quota is used up, or the request fails,
// so the feature still works.
const FALLBACK = [
  'You are more loved than you know.',
  'You are allowed to take up space.',
  'You are doing better than you think.',
  'Your kindness makes a difference.',
  'You bring light to the people around you.',
  'You are capable of amazing things.',
  'Rest is productive too.',
  'You are exactly where you need to be.',
  'Good things are coming your way.',
  'You are enough, just as you are.',
];

export async function fetchAffirmation(signal) {
  const key = import.meta.env.VITE_APILEAGUE_KEY;
  if (key) {
    try {
      const res = await fetch(API_URL, { headers: { 'x-api-key': key }, signal });
      if (res.ok) {
        const json = await res.json();
        if (json.affirmation) return json.affirmation;
      }
    } catch (err) {
      if (err.name === 'AbortError') throw err;
    }
  }
  return FALLBACK[Math.floor(Math.random() * FALLBACK.length)];
}

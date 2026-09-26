// Saving and loading gifts.
//
// FOR NOW this stores gifts in this browser only (IndexedDB), so gift links work on
// this computer but not anyone else's. To make links work for everyone, replace the
// insides of saveGift/loadGift with calls to an online database (e.g. Supabase) —
// nothing else in the app needs to change.

import { fromCatalog } from '../features/catalog.js';

const DB_NAME = 'mini-webapp';
const STORE = 'gifts';

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function withStore(mode, action) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, mode);
    const request = action(tx.objectStore(STORE));
    tx.oncomplete = () => resolve(request.result);
    tx.onerror = () => reject(tx.error);
  });
}

// Short, hard-to-guess id for the link, like "k3Xp9QaZ2m".
function makeId(length = 10) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(bytes, (b) => chars[b % chars.length]).join('');
}

// Returns the new gift's id.
export async function saveGift({ to, from, items }) {
  const id = makeId();
  const gift = {
    to,
    from,
    items: items.map(({ id: itemId, data }) => ({ id: itemId, data })),
    createdAt: new Date().toISOString(),
  };
  await withStore('readwrite', (store) => store.put(gift, id));
  return id;
}

// Returns { to, from, items } with each item's name and icon filled back in, or null.
export async function loadGift(id) {
  const gift = await withStore('readonly', (store) => store.get(id));
  if (!gift) return null;
  return {
    ...gift,
    items: gift.items
      .filter((item) => fromCatalog(item.id))
      .map((item) => ({ ...fromCatalog(item.id), data: item.data })),
  };
}

export function giftUrl(id) {
  return `${window.location.origin}/gift/${id}`;
}

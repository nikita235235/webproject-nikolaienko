const PREFIX = 'sneakerdrop:cache:';
const TTL = 5 * 60 * 1000; // строк придатності кешу: 5 хвилин

export function readCache(key) {
    try {
        const raw = localStorage.getItem(PREFIX + key);
        if (!raw) return null;
        const { time, data } = JSON.parse(raw);
        if (Date.now() - time > TTL) {
            localStorage.removeItem(PREFIX + key);
            return null;
        }
        return data;
    } catch {
        return null;
    }
}

export function writeCache(key, data) {
    try {
        localStorage.setItem(PREFIX + key, JSON.stringify({ time: Date.now(), data }));
    } catch {
        // сховище недоступне або переповнене: працюємо без кешу
    }
}

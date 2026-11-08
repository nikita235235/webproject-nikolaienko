import { Sneaker } from '../models/Sneaker.js';

const UAH_RATE = 40; // навчальний курс для переведення цін API (USD) у гривні

// Реєстр брендів: один і той самий бренд завжди отримує той самий id,
// незалежно від того, який запит (каталог чи пошук) його повернув
const brandIds = new Map();

function brandIdFor(name) {
    if (!brandIds.has(name)) brandIds.set(name, brandIds.size + 1);
    return brandIds.get(name);
}

export function listBrands() {
    return [...brandIds].map(([name, id]) => ({ id, name }));
}

export function toSneaker(raw) {
    return Sneaker.fromObject({
        id: raw.id,
        brandId: brandIdFor(raw.brand ?? 'Без бренду'),
        name: raw.title ?? 'Без назви',
        price: Math.round((raw.price ?? 0) * UAH_RATE),
        imageUrl: raw.thumbnail ?? raw.images?.[0] ?? '',
    });
}

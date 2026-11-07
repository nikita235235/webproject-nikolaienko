import { Sneaker } from '../models/Sneaker.js';

const UAH_RATE = 40; // навчальний курс для переведення цін API (USD) у гривні

export function toBrands(products) {
    const names = [...new Set(products.map(raw => raw.brand ?? 'Без бренду'))];
    return names.map((name, index) => ({ id: index + 1, name }));
}

export function toSneaker(raw, brands) {
    const brandName = raw.brand ?? 'Без бренду';
    return Sneaker.fromObject({
        id: raw.id,
        brandId: brands.find(brand => brand.name === brandName)?.id ?? null,
        name: raw.title ?? 'Без назви',
        price: Math.round((raw.price ?? 0) * UAH_RATE),
        imageUrl: raw.thumbnail ?? raw.images?.[0] ?? '',
    });
}

const KEY = 'sneakerdrop:filters';
const SORTS = ['title', 'price-asc', 'price-desc'];

// У сховищі лише параметри інтерфейсу, жодних даних про права доступу
export function loadFilters() {
    try {
        const saved = JSON.parse(localStorage.getItem(KEY));
        if (!saved) return {};
        return {
            query: typeof saved.query === 'string' ? saved.query : '',
            brandId: Number.isInteger(saved.brandId) ? saved.brandId : null,
            sort: SORTS.includes(saved.sort) ? saved.sort : 'title',
        };
    } catch {
        return {};
    }
}

export function saveFilters({ query, brandId, sort }) {
    try {
        localStorage.setItem(KEY, JSON.stringify({ query, brandId, sort }));
    } catch {
        // сховище недоступне: стан просто не збережеться
    }
}

export function clearFilters() {
    try {
        localStorage.removeItem(KEY);
    } catch {
        // нічого очищати
    }
}

import { renderCard } from './renderCard.js';

export function renderList(items, getBrandName) {
    if (items.length === 0) {
        return '<div class="alert alert--warning" role="status">Нічого не знайдено</div>';
    }
    return items.map(item => renderCard(item, getBrandName(item.brandId))).join('');
}

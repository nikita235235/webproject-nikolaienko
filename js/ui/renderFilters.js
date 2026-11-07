export function renderFilters(brands) {
    const all = '<button class="button button--primary" type="button" data-action="filter" data-brand-id="" aria-pressed="true">Усі</button>';
    const items = brands.map(brand => `
        <button class="button button--secondary" type="button" data-action="filter" data-brand-id="${brand.id}" aria-pressed="false">
            ${brand.name}
        </button>`);
    return all + items.join('');
}

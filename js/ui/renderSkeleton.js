export function renderSkeleton(count = 6) {
    const card = `
        <div class="card skeleton" aria-hidden="true">
            <div class="skeleton__image"></div>
            <div class="skeleton__body">
                <div class="skeleton__line"></div>
                <div class="skeleton__line skeleton__line--short"></div>
            </div>
        </div>`;
    const status = '<div class="alert catalog__message" role="status">Завантаження каталогу…</div>';
    return status + Array.from({ length: count }, () => card).join('');
}

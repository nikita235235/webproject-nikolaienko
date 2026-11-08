export function renderError(message, status) {
    const code = status ? ` (код ${status})` : '';
    return `
        <div class="alert alert--error catalog__message" role="alert">
            ${message}${code}
        </div>
        <div class="catalog__message">
            <button class="button button--primary" type="button" data-action="retry">
                Спробувати ще раз
            </button>
        </div>`;
}

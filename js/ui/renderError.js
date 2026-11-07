export function renderError() {
    return `
        <div class="alert alert--error catalog__message" role="alert">
            Не вдалося завантажити каталог. Перевірте з’єднання з інтернетом і спробуйте ще раз.
        </div>
        <div class="catalog__message">
            <button class="button button--primary" type="button" data-action="retry">
                Спробувати ще раз
            </button>
        </div>`;
}

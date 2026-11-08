// Повідомлення користувачеві за видом відмови
export function getErrorMessage(error) {
    const status = error?.status;

    if (status === 404) return 'Дані не знайдено.';
    if (status === 401) return 'Потрібно ввійти.';
    if (status === 403) return 'Немає доступу.';
    if (status >= 500) return 'Сервер тимчасово недоступний. Спробуйте пізніше.';
    if (!navigator.onLine || error instanceof TypeError) {
        return 'Немає з’єднання з мережею. Перевірте підключення.';
    }
    return 'Не вдалося завантажити каталог. Спробуйте ще раз.';
}

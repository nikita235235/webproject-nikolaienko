export function validate({ name, email, size, message }) {
    const errors = {};

    if (!name?.trim()) errors.name = 'Вкажіть ім’я';
    else if (name.trim().length < 2) errors.name = 'Ім’я закоротке (мінімум 2 символи)';

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email ?? '')) {
        errors.email = 'Некоректна адреса пошти (приклад: name@example.com)';
    }

    const sizeNumber = Number(size);
    if (!size?.trim()) errors.size = 'Вкажіть розмір взуття';
    else if (!Number.isInteger(sizeNumber) || sizeNumber < 35 || sizeNumber > 48) {
        errors.size = 'Розмір має бути цілим числом від 35 до 48';
    }

    if ((message ?? '').trim().length < 10) {
        errors.message = 'Повідомлення закоротке (мінімум 10 символів)';
    }

    return errors;
}

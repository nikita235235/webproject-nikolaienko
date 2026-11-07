import { validate } from '../utils/validate.js';

function setError(input, message) {
    const field = input.closest('.field');
    field.classList.add('field--invalid');
    field.querySelector('.field__error').textContent = message;
    input.setAttribute('aria-invalid', 'true');
}

function clearError(input) {
    const field = input.closest('.field');
    field.classList.remove('field--invalid');
    field.querySelector('.field__error').textContent = '';
    input.removeAttribute('aria-invalid');
}

export function initFeedbackForm(form, status) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        status.innerHTML = '';

        const data = Object.fromEntries(new FormData(form));
        const errors = validate(data);

        form.querySelectorAll('.field__input').forEach(input => clearError(input));

        const names = Object.keys(errors);
        if (names.length > 0) {
            names.forEach(name => setError(form.elements[name], errors[name]));
            form.elements[names[0]].focus();
            return;
        }

        console.log('Форма надіслана:', data);
        form.reset();
        status.innerHTML = '<div class="alert alert--success" role="status">Дякуємо! Повідомлення надіслано.</div>';
    });

    // Позначка помилки зникає, щойно користувач почав виправляти поле
    form.addEventListener('input', (event) => {
        if (event.target.classList.contains('field__input')) clearError(event.target);
        status.innerHTML = '';
    });
}

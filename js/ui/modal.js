const modal = document.querySelector('#modal');
const title = document.querySelector('#modal-title');
const text = document.querySelector('#modal-text');
const closeButton = modal.querySelector('.modal__close');

let lastTrigger = null;

export function openModal(trigger, { title: heading, text: body }) {
    lastTrigger = trigger;
    title.textContent = heading;
    text.textContent = body;
    modal.classList.add('modal--open');
    closeButton.focus();
}

export function closeModal() {
    modal.classList.remove('modal--open');
    lastTrigger?.focus();
}

export function initModal() {
    // 1 і 2 способи: кнопка закриття та клік по підкладці (обидва мають data-close)
    modal.addEventListener('click', (event) => {
        if (event.target.closest('[data-close]')) closeModal();
    });

    document.addEventListener('keydown', (event) => {
        if (!modal.classList.contains('modal--open')) return;
        // 3 спосіб: клавіша Escape
        if (event.key === 'Escape') closeModal();
        // у вікні одна кнопка, тому Tab не випускає фокус на сторінку під ним
        if (event.key === 'Tab') {
            event.preventDefault();
            closeButton.focus();
        }
    });
}

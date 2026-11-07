import { getCatalog } from './services/api.js';
import { Store } from './services/store.js';
import { renderList } from './ui/renderList.js';
import { renderFilters } from './ui/renderFilters.js';
import { renderSkeleton } from './ui/renderSkeleton.js';
import { renderError } from './ui/renderError.js';
import { openModal, initModal } from './ui/modal.js';
import { initFeedbackForm } from './ui/feedbackForm.js';
import { formatPrice } from './utils/format.js';

let store = new Store([], []);

const container = document.querySelector('#catalog');
const filters = document.querySelector('#filters');
const searchInput = document.querySelector('#search');
const sortSelect = document.querySelector('#sort');

let state = { status: 'idle', error: null, query: '', brandId: null, sort: 'title' };

function update() {
    if (state.status !== 'success') return;

    const found = store
        .search(state.query)
        .filter(item => !state.brandId || item.brandId === state.brandId);
    const list = store.sortItems(found, state.sort);
    container.innerHTML = renderList(list, brandId => store.brandName(brandId));

    // Кнопки фільтра не перемальовуємо, щоб не губити фокус із клавіатури
    filters.querySelectorAll('[data-action="filter"]').forEach(button => {
        const active = (Number(button.dataset.brandId) || null) === state.brandId;
        button.classList.toggle('button--primary', active);
        button.classList.toggle('button--secondary', !active);
        button.setAttribute('aria-pressed', String(active));
    });
}

// Перемальовування залежить від стану завантаження
function render() {
    container.setAttribute('aria-busy', String(state.status === 'loading'));
    if (state.status === 'loading') {
        container.innerHTML = renderSkeleton();
        return;
    }
    if (state.status === 'error') {
        container.innerHTML = renderError();
        return;
    }
    update();
}

async function load() {
    state = { ...state, status: 'loading', error: null };
    render();
    try {
        const { sneakers, brands } = await getCatalog();
        store = new Store(sneakers, brands);
        filters.innerHTML = renderFilters(brands);
        state = { ...state, status: 'success' };
    } catch (error) {
        console.error('Не вдалося завантажити каталог:', error);
        state = { ...state, status: 'error', error };
    }
    render();
}

// Пошук
searchInput.addEventListener('input', (event) => {
    state = { ...state, query: event.target.value };
    update();
});

// Сортування
sortSelect.addEventListener('change', (event) => {
    state = { ...state, sort: event.target.value };
    update();
});

// Фільтр за брендом (делегування на контейнері кнопок)
filters.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (!button) return;

    if (button.dataset.action === 'filter') {
        state = { ...state, brandId: Number(button.dataset.brandId) || null };
        update();
    }
});

// Делегований обробник каталогу: один на контейнері
container.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (!button) return;

    const { action, id } = button.dataset;
    if (action === 'open') {
        const item = store.byId(Number(id));
        if (!item) return;
        openModal(button, {
            title: item.name,
            text: `Бренд: ${store.brandName(item.brandId)}. Ціна: ${formatPrice(item.price)}.`,
        });
    }
    if (action === 'retry') load();
});

initModal();
initFeedbackForm(document.querySelector('#feedback-form'), document.querySelector('#form-status'));
load();

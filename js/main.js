import { getCatalog, searchSneakers } from './services/api.js';
import { Store } from './services/store.js';
import { loadFilters, saveFilters, clearFilters } from './services/filtersStorage.js';
import { renderList } from './ui/renderList.js';
import { renderFilters } from './ui/renderFilters.js';
import { renderSkeleton } from './ui/renderSkeleton.js';
import { renderError } from './ui/renderError.js';
import { openModal, initModal } from './ui/modal.js';
import { initFeedbackForm } from './ui/feedbackForm.js';
import { formatPrice } from './utils/format.js';
import { debounce } from './utils/debounce.js';
import { getErrorMessage } from './utils/errors.js';

let store = new Store([], []);
let brands = [];
let controller = null;

const toolbar = document.querySelector('.toolbar');
const container = document.querySelector('#catalog');
const filters = document.querySelector('#filters');
const searchInput = document.querySelector('#search');
const sortSelect = document.querySelector('#sort');

// Стан фільтрів відновлюємо зі сховища
let state = { status: 'idle', error: null, query: '', brandId: null, sort: 'title', ...loadFilters() };
searchInput.value = state.query;
sortSelect.value = state.sort;

function update() {
    if (state.status !== 'success') return;

    const found = store.all().filter(item => !state.brandId || item.brandId === state.brandId);
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
        container.innerHTML = renderError(getErrorMessage(state.error), state.error?.status);
        return;
    }
    update();
}

async function load({ force = false } = {}) {
    // Попередній запит скасовуємо: його відповідь уже нікому не потрібна
    controller?.abort();
    controller = new AbortController();
    const { signal } = controller;

    state = { ...state, status: 'loading', error: null };
    render();
    try {
        const catalog = await getCatalog({ signal, force });
        const query = state.query.trim();
        const result = query ? await searchSneakers(query, { signal, force }) : catalog;
        if (signal.aborted) return;

        if (brands.length === 0 || force) {
            brands = catalog.brands;
            filters.innerHTML = renderFilters(brands);
        }
        store = new Store(result.sneakers, brands);
        state = { ...state, status: 'success' };
    } catch (error) {
        if (error.name === 'AbortError') return; // скасування — штатна ситуація, не помилка
        console.error('Не вдалося завантажити каталог:', error);
        state = { ...state, status: 'error', error };
    }
    render();
}

// Пошук: запит надсилається через 300 мс після останнього натискання клавіші
function onSearch(event) {
    state = { ...state, query: event.target.value };
    saveFilters(state);
    load();
}
searchInput.addEventListener('input', debounce(onSearch, 300));

// Сортування
sortSelect.addEventListener('change', (event) => {
    state = { ...state, sort: event.target.value };
    saveFilters(state);
    update();
});

// Кнопки панелі: фільтр за брендом, оновлення, скидання (делегування)
toolbar.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (!button) return;

    const { action } = button.dataset;
    if (action === 'filter') {
        state = { ...state, brandId: Number(button.dataset.brandId) || null };
        saveFilters(state);
        update();
    }
    if (action === 'refresh') load({ force: true });
    if (action === 'reset') {
        state = { ...state, query: '', brandId: null, sort: 'title' };
        clearFilters();
        searchInput.value = '';
        sortSelect.value = 'title';
        load();
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

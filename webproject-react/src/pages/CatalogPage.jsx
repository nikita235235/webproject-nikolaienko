import { useRef, useState } from 'react';
import { SearchField } from '../components/SearchField.jsx';
import { SortSelect } from '../components/SortSelect.jsx';
import { CategoryFilter } from '../components/CategoryFilter.jsx';
import { SneakerList } from '../components/SneakerList.jsx';
import { Modal } from '../components/Modal.jsx';
import { formatPrice } from '../utils/format.js';

// Статус переліку: для перевірки станів його можна задати в адресі, наприклад ?status=loading
function readStatus() {
    const value = new URLSearchParams(window.location.search).get('status');
    return ['loading', 'success', 'error'].includes(value) ? value : 'success';
}

export function CatalogPage({ store, brands }) {
    const [query, setQuery] = useState('');
    const [brandId, setBrandId] = useState(null);
    const [sort, setSort] = useState('title');
    const [status] = useState(readStatus);
    const [opened, setOpened] = useState(null);
    const lastTrigger = useRef(null);

    // Похідні дані: обчислюються під час рендерингу й не зберігаються в стані
    const found = store.search(query).filter(item => !brandId || item.brandId === brandId);
    const visible = store.sortItems(found, sort);

    function handleOpen(id) {
        lastTrigger.current = document.activeElement;
        setOpened(store.byId(id) ?? null);
    }

    function handleClose() {
        setOpened(null);
        lastTrigger.current?.focus();
    }

    return (
        <>
            <h1>Популярні кросівки</h1>
            <section className="toolbar" aria-label="Пошук і фільтри">
                <SearchField value={query} onChange={setQuery} />
                <SortSelect value={sort} onChange={setSort} />
                <CategoryFilter categories={brands} value={brandId} onChange={setBrandId} />
            </section>
            <SneakerList
                status={status}
                items={visible}
                getBrandName={id => store.brandName(id)}
                onOpen={handleOpen}
            />
            {opened && (
                <Modal title={opened.name} onClose={handleClose}>
                    Бренд: {store.brandName(opened.brandId)}. Ціна: {formatPrice(opened.price)}.
                </Modal>
            )}
        </>
    );
}

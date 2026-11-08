import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';
import { Field } from './components/Field.jsx';
import { SneakerList } from './components/SneakerList.jsx';
import { sneakers } from './data/sneakers.js';
import { brands } from './data/brands.js';
import { Store } from './services/store.js';

// Дані поки що беремо з масиву-заглушки через Store з ПР5
const store = new Store(sneakers, brands);

const links = [
    { label: 'Каталог', href: '#', active: true },
    { label: 'Вибране', href: '#' },
];

export default function App() {
    const items = store.sortedByTitle();

    function handleOpen(id) {
        console.log('Відкрито запис:', store.byId(id));
    }

    return (
        <>
            <Header links={links} />
            <main className="main-content">
                <h1>Популярні кросівки</h1>
                <section className="toolbar" aria-label="Пошук">
                    <Field
                        label="Пошук"
                        name="search"
                        className="toolbar__search"
                        onChange={event => console.log('Пошук:', event.target.value)}
                    />
                </section>
                <SneakerList
                    items={items}
                    getBrandName={brandId => store.brandName(brandId)}
                    onOpen={handleOpen}
                />
            </main>
            <Footer year={2026} />
        </>
    );
}

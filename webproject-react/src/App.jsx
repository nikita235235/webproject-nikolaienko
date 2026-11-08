import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';
import { FeedbackForm } from './components/FeedbackForm.jsx';
import { CatalogPage } from './pages/CatalogPage.jsx';
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
    return (
        <>
            <Header links={links} />
            <main className="main-content">
                <CatalogPage store={store} brands={brands} />
                <FeedbackForm />
            </main>
            <Footer year={2026} />
        </>
    );
}

import { Alert } from './Alert.jsx';

const PLACEHOLDERS = ['s1', 's2', 's3', 's4', 's5', 's6'];

export function CatalogSkeleton() {
    return (
        <div className="catalog" aria-busy="true">
            <Alert className="catalog__message">Завантаження каталогу…</Alert>
            {PLACEHOLDERS.map(id => (
                <div key={id} className="card skeleton" aria-hidden="true">
                    <div className="skeleton__image" />
                    <div className="skeleton__body">
                        <div className="skeleton__line" />
                        <div className="skeleton__line skeleton__line--short" />
                    </div>
                </div>
            ))}
        </div>
    );
}

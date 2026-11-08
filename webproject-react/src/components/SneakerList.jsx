import { Card } from './Card.jsx';
import { Alert } from './Alert.jsx';
import { CatalogSkeleton } from './CatalogSkeleton.jsx';
import { getErrorMessage } from '../utils/errors.js';

export function SneakerList({ status, items, getBrandName, onOpen }) {
    if (status === 'loading') {
        return <CatalogSkeleton />;
    }

    if (status === 'error') {
        return (
            <div className="catalog">
                <Alert variant="error" className="catalog__message">
                    {getErrorMessage(null)}
                </Alert>
            </div>
        );
    }

    if (items.length === 0) {
        return <Alert variant="warning">За вашим запитом нічого не знайдено</Alert>;
    }

    return (
        <div className="catalog">
            {items.map(item => (
                <Card
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    imageUrl={item.imageUrl}
                    brandName={getBrandName(item.brandId)}
                    onOpen={onOpen}
                />
            ))}
        </div>
    );
}

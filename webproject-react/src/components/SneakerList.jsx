import { Card } from './Card.jsx';
import { Alert } from './Alert.jsx';

export function SneakerList({ items, getBrandName, onOpen }) {
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

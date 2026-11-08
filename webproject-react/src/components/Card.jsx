import { Button } from './Button.jsx';
import { formatPrice } from '../utils/format.js';

export function Card({ id, name, price, imageUrl, brandName, featured = false, onOpen }) {
    // У масиві-заглушці фото ще немає (шляхи img/…), тому для них показуємо заглушку
    const hasImage = typeof imageUrl === 'string' && imageUrl.startsWith('http');

    return (
        <article className={`card${featured ? ' card--featured' : ''}`}>
            {hasImage ? (
                <img className="card__image" src={imageUrl} alt={name} loading="lazy" />
            ) : (
                <div className="card__image" role="img" aria-label={name} />
            )}
            <h3 className="card__title">{name}</h3>
            <p className="card__text">{brandName}</p>
            <div className="card__footer">
                <span>{formatPrice(price)}</span>
                <Button variant="secondary" onClick={() => onOpen(id)}>
                    Детальніше
                </Button>
            </div>
        </article>
    );
}

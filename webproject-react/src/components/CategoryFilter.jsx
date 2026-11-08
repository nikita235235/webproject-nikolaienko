import { Button } from './Button.jsx';

export function CategoryFilter({ categories, value, onChange }) {
    return (
        <div className="toolbar__filters" role="group" aria-label="Фільтр за брендом">
            <Button
                variant={value === null ? 'primary' : 'secondary'}
                pressed={value === null}
                onClick={() => onChange(null)}
            >
                Усі
            </Button>
            {categories.map(category => (
                <Button
                    key={category.id}
                    variant={value === category.id ? 'primary' : 'secondary'}
                    pressed={value === category.id}
                    onClick={() => onChange(category.id)}
                >
                    {category.name}
                </Button>
            ))}
        </div>
    );
}

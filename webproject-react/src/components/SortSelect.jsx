export function SortSelect({ value, onChange }) {
    return (
        <div className="field toolbar__sort">
            <label className="field__label" htmlFor="sort">
                Сортування
            </label>
            <select
                className="field__input"
                id="sort"
                value={value}
                onChange={event => onChange(event.target.value)}
            >
                <option value="title">За назвою</option>
                <option value="price-asc">Спочатку дешевші</option>
                <option value="price-desc">Спочатку дорожчі</option>
            </select>
        </div>
    );
}

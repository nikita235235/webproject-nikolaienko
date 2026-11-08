import { Field } from './Field.jsx';

export function SearchField({ value, onChange }) {
    return (
        <Field
            label="Пошук"
            name="search"
            type="search"
            value={value}
            onChange={onChange}
            className="toolbar__search"
        />
    );
}

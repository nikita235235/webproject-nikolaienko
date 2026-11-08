export function Field({ label, name, value, error, onChange, type = 'text', multiline = false, className = '' }) {
    const errorId = `${name}-error`;
    const Control = multiline ? 'textarea' : 'input';
    const controlProps = multiline ? { rows: 4 } : { type };

    return (
        <div className={`field${error ? ' field--invalid' : ''} ${className}`.trim()}>
            <label className="field__label" htmlFor={name}>
                {label}
            </label>
            <Control
                className="field__input"
                id={name}
                name={name}
                value={value}
                onChange={event => onChange(event.target.value)}
                aria-invalid={error ? 'true' : undefined}
                aria-describedby={errorId}
                {...controlProps}
            />
            <span className="field__error" id={errorId}>
                {error}
            </span>
        </div>
    );
}

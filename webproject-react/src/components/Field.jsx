export function Field({ label, name, value, error, onChange, type = 'text', className = '' }) {
    const errorId = `${name}-error`;

    return (
        <div className={`field${error ? ' field--invalid' : ''} ${className}`.trim()}>
            <label className="field__label" htmlFor={name}>
                {label}
            </label>
            <input
                className="field__input"
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                aria-invalid={error ? 'true' : undefined}
                aria-describedby={errorId}
            />
            <span className="field__error" id={errorId}>
                {error}
            </span>
        </div>
    );
}

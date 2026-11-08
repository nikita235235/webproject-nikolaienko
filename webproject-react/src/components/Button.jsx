export function Button({ variant = 'primary', type = 'button', disabled = false, onClick, children }) {
    return (
        <button
            className={`button button--${variant}`}
            type={type}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export function Button({ variant = 'primary', type = 'button', disabled = false, pressed, onClick, children }) {
    return (
        <button
            className={`button button--${variant}`}
            type={type}
            disabled={disabled}
            aria-pressed={pressed}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

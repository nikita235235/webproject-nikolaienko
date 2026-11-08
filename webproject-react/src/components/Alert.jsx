export function Alert({ variant = 'warning', children }) {
    return (
        <div className={`alert alert--${variant}`} role={variant === 'error' ? 'alert' : 'status'}>
            {children}
        </div>
    );
}

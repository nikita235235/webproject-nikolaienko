export function Alert({ variant, className = '', children }) {
    const classes = ['alert', variant && `alert--${variant}`, className].filter(Boolean).join(' ');

    return (
        <div className={classes} role={variant === 'error' ? 'alert' : 'status'}>
            {children}
        </div>
    );
}

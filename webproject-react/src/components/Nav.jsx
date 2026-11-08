export function Nav({ links }) {
    return (
        <nav className="nav" aria-label="Основна навігація">
            {links.map(link => (
                <a
                    key={link.label}
                    className={`nav__link${link.active ? ' nav__link--active' : ''}`}
                    href={link.href}
                    aria-current={link.active ? 'page' : undefined}
                >
                    {link.label}
                </a>
            ))}
        </nav>
    );
}

import { Nav } from './Nav.jsx';

export function Header({ links }) {
    return (
        <header className="header">
            <div className="header__logo">SneakerDrop</div>
            <Nav links={links} />
        </header>
    );
}

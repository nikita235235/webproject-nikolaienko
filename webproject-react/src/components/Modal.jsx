import { useEffect, useRef } from 'react';

export function Modal({ title, children, onClose }) {
    const closeRef = useRef(null);

    // Під час відкриття фокус переходить на кнопку закриття
    useEffect(() => {
        closeRef.current.focus();
    }, []);

    // Закриття клавішею Escape; у вікні одна кнопка, тому Tab не випускає фокус назовні
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === 'Escape') onClose();
            if (event.key === 'Tab') {
                event.preventDefault();
                closeRef.current.focus();
            }
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div className="modal modal--open" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="modal__overlay" onClick={onClose} />
            <div className="modal__window">
                <button
                    ref={closeRef}
                    className="modal__close"
                    type="button"
                    aria-label="Закрити"
                    onClick={onClose}
                >
                    &times;
                </button>
                <h2 className="modal__title" id="modal-title">
                    {title}
                </h2>
                <p>{children}</p>
            </div>
        </div>
    );
}

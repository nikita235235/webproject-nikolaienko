import { useState } from 'react';
import { Field } from './Field.jsx';
import { Button } from './Button.jsx';
import { Alert } from './Alert.jsx';
import { validate } from '../utils/validate.js';

const EMPTY_FORM = { name: '', email: '', size: '', message: '' };

export function FeedbackForm() {
    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [sent, setSent] = useState(false);

    // Зміна одного поля: новий об’єкт, а не зміна поточного
    const handleChange = (field) => (value) => {
        setForm(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: '' })); // помилка зникає під час редагування
        setSent(false);
    };

    function handleSubmit(event) {
        event.preventDefault();
        const found = validate(form);
        setErrors(found);
        setSent(false);

        const names = Object.keys(found);
        if (names.length > 0) {
            event.currentTarget.elements[names[0]].focus();
            return;
        }

        console.log('Форма надіслана:', form);
        setForm(EMPTY_FORM);
        setSent(true);
    }

    return (
        <section className="feedback" aria-labelledby="feedback-title">
            <h2 className="feedback__title" id="feedback-title">
                Зворотний зв’язок
            </h2>
            <form className="feedback__form" noValidate onSubmit={handleSubmit}>
                <Field label="Ім’я" name="name" value={form.name} error={errors.name} onChange={handleChange('name')} />
                <Field label="Електронна пошта" name="email" type="email" value={form.email} error={errors.email} onChange={handleChange('email')} />
                <Field label="Розмір взуття (EU)" name="size" value={form.size} error={errors.size} onChange={handleChange('size')} />
                <Field label="Повідомлення" name="message" multiline value={form.message} error={errors.message} onChange={handleChange('message')} />
                <Button type="submit">Надіслати</Button>
            </form>
            {sent && <Alert variant="success">Дякуємо! Повідомлення надіслано.</Alert>}
        </section>
    );
}

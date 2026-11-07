const PREMIUM_PRICE = 5000;

export class Sneaker {
    #id;

    constructor({ id, brandId, name, price, imageUrl }) {
        this.#id = id;
        this.brandId = brandId;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    get id() {
        return this.#id;
    }

    matches(query) {
        return this.name.toLowerCase().includes(query.trim().toLowerCase());
    }

    isAffordable(maxPrice) {
        return this.price <= maxPrice;
    }

    describe() {
        return `${this.name} — ${this.price} грн`;
    }

    static fromObject(obj) {
        return obj.price > PREMIUM_PRICE ? new PremiumSneaker(obj) : new Sneaker(obj);
    }
}

export class PremiumSneaker extends Sneaker {
    describe() {
        return `${super.describe()} (преміум)`;
    }
}

import { sneakers } from './data/sneakers.js';
import { brands } from './data/brands.js';
import { Store } from './services/store.js';
import { renderList } from './ui/renderList.js';

const store = new Store(sneakers, brands);
const container = document.querySelector('#catalog');

const sorted = store.sortedByTitle();
container.innerHTML = renderList(sorted, brandId => store.brandName(brandId));

console.log('countByCategory():', store.countByCategory());
console.log('Порядок id у сховищі (не змінився):', store.all().map(item => item.id));
console.log('Порядок назв після сортування:', sorted.map(item => item.name));
console.log(store.byId(1).describe());
console.log(store.byId(6).describe());

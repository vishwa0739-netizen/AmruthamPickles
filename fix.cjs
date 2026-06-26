const fs = require('fs');
let code = fs.readFileSync('src/app/data.ts', 'utf8');

if (!code.includes('import mangoImg')) {
  code = `import mangoImg from '@/imports/Mango.png';
import chillyImg from '@/imports/Chilly.png';
import dhalImg from '@/imports/dhal.png';
import idliPodiImg from '@/imports/idliPodi.png';
import peanutImg from '@/imports/peanut.png';
import fryumsImg from '@/imports/fryums.png';
import lemonImg from '@/imports/Lemon.png';
import giftImg from '@/imports/gift.png';
import spicesImg from '@/imports/spices.png';
import heroPicklesImg from '@/imports/new_carousel_1.jpg';
import heroPachadiesImg from '@/imports/new_carousel_2.jpg';
import heroPodiesImg from '@/imports/new_carousel_3.jpg';\n\n` + code;
}

const productMap = {
  '1': 'mangoImg',
  '2': 'chillyImg',
  '3': 'dhalImg',
  '4': 'idliPodiImg',
  '5': 'peanutImg',
  '6': 'fryumsImg',
  '7': 'lemonImg',
  '8': 'giftImg',
  '9': 'spicesImg'
};

const slideMap = {
  '1': 'heroPicklesImg',
  '2': 'heroPachadiesImg',
  '3': 'heroPodiesImg'
};

// Replace PRODUCTS array images
code = code.replace(/id:\s*['"](\d)['"],[\s\S]*?images:\s*\[[\s\S]*?\],/g, (match, id) => {
  const img = productMap[id];
  if (img) {
    return match
      .replace(/image:\s*['"].*?['"],/, `image: ${img},`)
      .replace(/images:\s*\[[\s\S]*?\],/, `images: [\n      ${img},\n      ${img},\n    ],`);
  }
  return match;
});

// Update product 7 to Lemon Pickle (if it hasn't been updated)
code = code.replace(
  /id:\s*['"]7['"],[\s\S]*?tags:\s*\[[^\]]*\],/,
  `id: "7",
    slug: "lemon-pickle",
    name: "Lemon pickle",
    tagline: "Tangy and zesty — a classic pickle",
    category: "pickles",
    price: 160,
    rating: 4.8,
    reviewCount: 145,
    image: lemonImg,
    images: [
      lemonImg,
      lemonImg,
    ],
    weights: [
      { label: "100g", price: 160 },
      { label: "200g", price: 290 },
    ],
    spiceLevels: ["Medium"],
    description: "Our signature Lemon pickle — balanced, fragrant, and deeply satisfying. Just add cooked rice and tamarind paste.",
    ingredients: "Lemon, Mustard seeds, Fenugreek, Turmeric, Asafoetida, Rock salt, Sesame oil",
    shelfLife: "4 months from manufacture",
    newArrival: true,
    tags: ["pickle", "lemon", "new"],`
);

// Replace HERO_SLIDES images
code = code.replace(/export const HERO_SLIDES = \[([\s\S]*?)\];/, (match, inner) => {
  let updatedInner = inner.replace(/id:\s*['"](\d)['"],\s*image:\s*['"].*?['"],/g, (m, id) => {
    return `id: "${id}",\n    image: ${slideMap[id]},`;
  });
  return `export const HERO_SLIDES = [${updatedInner}];`;
});

fs.writeFileSync('src/app/data.ts', code);
console.log('Update complete');

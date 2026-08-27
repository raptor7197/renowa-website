# renowa (株式会社リノワ)

corporate website for a japanese renovation company. single page, japanese language.

## structure

- `index.html` - the whole page: hero, about, greeting, manager message, services, customer voice, works, company info, contact
- `css/styles.css` - all styling, design tokens in `:root`
- `js/main.js` - mobile menu (with focus trap), smooth anchor scrolling, hero image carousel
- `assets/` - images and svg decorations

## run

no build step, no dependencies. open the file or serve the folder:

```sh
python3 -m http.server 8000
```

then visit http://localhost:8000

## notes

- phone number `03-6555-4881` and mail buttons are linked via `tel:` and button elements (mail is a placeholder button)
- hero carousel rotates every 5 seconds
- desktop and mobile layouts switch at 1024px

made by ### vamsi krishna (https://thekrishna.me/)

const menu = [
  {
    id: 1,
    title: "buttermilk pancakes",
    category: "breakfast",
    price: 15.99,
    img: "./img/item-1.jpeg",
    desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
  },
  {
    id: 2,
    title: "diner double",
    category: "lunch",
    price: 13.99,
    img: "./img/item-2.jpeg",
    desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
  },
  {
    id: 3,
    title: "godzilla milkshake",
    category: "shakes",
    price: 6.99,
    img: "./img/item-3.jpeg",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
  },
  {
    id: 4,
    title: "country delight",
    category: "breakfast",
    price: 20.99,
    img: "./img/item-4.jpeg",
    desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
  },
  {
    id: 5,
    title: "egg attack",
    category: "lunch",
    price: 22.99,
    img: "./img/item-5.jpeg",
    desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
  },
  {
    id: 6,
    title: "oreo dream",
    category: "shakes",
    price: 18.99,
    img: "./img/item-6.jpeg",
    desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
  },
  {
    id: 7,
    title: "bacon overflow",
    category: "breakfast",
    price: 8.99,
    img: "./img/item-7.jpeg",
    desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
  },
  {
    id: 8,
    title: "american classic",
    category: "lunch",
    price: 12.99,
    img: "./img/item-8.jpeg",
    desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
  },
  {
    id: 9,
    title: "quarantine buddy",
    category: "shakes",
    price: 16.99,
    img: "./img/item-9.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
  {
    id: 10,
    title: "stake dinner",
    category: "dinner",
    price: 36.99,
    img: "./img/item-10.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
];

const sectionCenter = document.querySelector(".section-center");
const btnContainer = document.querySelector(".btn-container");

// 1. load items
// Kada se sav sadrzaj ucita onda pozivamo funkciju displayMenuItems
// uz pomoc koje prolazimo kroz niz menu
// i uz pomoc map metode za svaki item kreiramo novu stavku na meniju
// to sve dodajemo zajedno u jedan string
// i taj string postavljamo kao novu vrednost sectionCenter kontejnera
window.addEventListener("DOMContentLoaded", function () {
  displayMenuItems(menu);
  displayMenuButtons();
});

function displayMenuItems(menuItems) {
  let displayMenu = menuItems.map(function (item) {
    return `
  <article class="menu-item">
    <img src=${item.img} class="photo" alt=${item.title} />
    <div class="item-info">
      <header>
        <h4>${item.title}</h4>
        <h4 class="price">$${item.price}</h4>
      </header>
      <p class="item-text">
        ${item.desc}
      </p>
    </div>
  </article>`;
  });
  displayMenu = displayMenu.join("");
  sectionCenter.innerHTML = displayMenu;
}

// function displayMenuButtons
function displayMenuButtons() {
  // 3. Zelimo da dobijemo jedinstvene kategorije iz niza menu
  // promenljiva categories ce sadrzati niz koji dobijamo tako sto
  // uz pomoc reduce metode prolazimo kroz menu niz
  // i proveravamo, ako akumulator ne sadrzi item.category tj stavku sa svojom kategorijom
  // onda je dodaj na kraj niza
  // na kraju vracamo akumulator
  const categories = menu.reduce(
    function (values, item) {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ["all"]
  );

  const categoryBtns = categories
    .map(function (category) {
      return `<button class="filter-btn" type="button" data-id=${category}>${category}</button>`;
    })
    .join("");

  btnContainer.innerHTML = categoryBtns;
  const filterBtns = document.querySelectorAll(".filter-btn");

  // 2. filter items
  // Selektujemo svu dugmad koju imamo za odabir kategorija obroka
  // Prolazimo kroz niz svig dugmati i onda svakom dodajemo event listener koji reaguje na klik
  // u promenljivu category selektujemo dugme na koje smo kliknuli i selektujemo njego dataset
  // koji je u ovom slucaju ID
  //
  // onda u promenljivu menuCategory sacuvavamo
  // prolazenje kroz menu niz uz pomoc filter metode
  // unutar filter metode proveravamo da li stavka iz menu niza ima svojstvo category
  // kao dataset.id koju poseduje kliknuto dugme
  // Ako imaju isto onda ubacujemo taj item u novi filtriran niz koji se nalazi unutar
  // promenljive menuCategory
  //
  // Na kraju proveravamo da li dataset.id od pritisnutog dugmeta je isti kao string all
  // ako jeste onda pozivamo funkciju displayMenuItems(menu) koja ce iscrtati sve elemente
  // ali ako dataset.id je razlicito od all onda
  // pozivamo funkciju displayMenuItems(menuCategory) ali sa nizom koji je filtriran
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const category = e.currentTarget.dataset.id;

      const menuCategory = menu.filter(function (menuItem) {
        if (menuItem.category == category) {
          return menuItem;
        }
      });

      if (category === "all") {
        displayMenuItems(menu);
      } else {
        displayMenuItems(menuCategory);
      }
    });
  });
}

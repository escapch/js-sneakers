const sneakersContent = document.querySelector('.sneakers__block');
const searchInput = document.querySelector('.search input');
const searchBtn = document.querySelector('.searchBtn');
const favoritLink = document.querySelector('.favoritLink');
const cart = document.querySelector('.cart');
const cartBtn = document.querySelector('.cartBtn');
const closeCart = cart.querySelector('.closeCart');
const cartSneakers = cart.querySelector('.cart__sneakers');
// favoritLink.addEventListener('click', (e) => {
//     e.preventDefault()
// })

const favoritCard = [];
const cartArr = [];
let newSneakers = {
  title: '',
  price: 0,
  imageUrl: '',
};

let inputTherm = '';
const renderCartSneakers = async (cartArr) => {
  cartSneakers.innerHTML += `
            <div class="cart__item">
                <img src="${cartArr.imageUrl}" alt="sneak">
                <div class="sneakers__price">
                    <span class="sneakers-title title">${cartArr.title}</span>
                    <p class="sneakers-price">${cartArr.price} руб.</p>
                </div>
                <img class="removeBtn" src="./img/removeItem.svg" alt="delete">
            </div>
    
        `;
};
searchInput.addEventListener('input', () => {
  // Обновляем текст в элементе для отображения текущего значения
  inputTherm = searchInput.value.toLowerCase();
});
const render = async (inputTherm) => {
  const response = await fetch('https://62fa813affd7197707ee0944.mockapi.io/items');
  const sneakers = await response.json();

  sneakersContent.innerHTML = '';

  if (inputTherm) {
    const items = sneakers
      .filter((obj) => {
        if (obj.title.toLowerCase().includes(inputTherm)) {
          return true;
        }

        return false;
      })
      .map((element) => {
        sneakersContent.innerHTML += `
            <div class="sneakers__card">
                <button class="sneakers__favorit">
                    <img src="./img/favorit.svg" alt="no liked">
                </button>
                <div class="sneakers__img">
                    <img src="${element.imageUrl}" alt="sneakersIMG"/>
                </div>
                <div class="sneakers-title">${element.title}</div>
                <div class="sneakers__lower">
                    <div class="sneakers__price">
                        <span class="sneakers-price-title">Цена:</span>
                        <p class="sneakers-price">${element.price} руб.</p>
                    </div>
                    <div class="sneacers__add">
                        <button class="addSneakers"><img src="./img/addSneakers.svg" alt="">
                        </button>
                    </div>
                </div>
            </div>
        `;
      });
  } else {
    sneakers.forEach((element) => {
      sneakersContent.innerHTML += `
            <div class="sneakers__card">
                <button class="sneakers__favorit">
                    <img src="./img/favorit.svg" alt="no liked">
                </button>
                <div class="sneakers__img">
                    <img src="${element.imageUrl}" alt="sneakersIMG"/>
                </div>
                <div class="sneakers-title">${element.title}</div>
                <div class="sneakers__lower">
                    <div class="sneakers__price">
                        <span class="sneakers-price-title">Цена:</span>
                        <p class="sneakers-price">${element.price} руб.</p>
                    </div>
                    <div class="sneacers__add">
                        <button class="addSneakers"><img src="./img/addSneakers.svg" alt="">
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
  }

  // searchInput.addEventListener('keydown', (e) => {
  //   if (e.key === 'Enter') {
  //     e.preventDefault();
  //     performSearch();
  //   }
  // });
  // searchBtn.addEventListener('click', () => {
  //   performSearch();
  // });

  // function performSearch() {
  //   const searchTerm = searchInput.value;

  //   const getSneakers = (word, sneakers) => {
  //     return sneakers.filter((s) => {
  //       const regex = new RegExp(word, 'gi');
  //       return s.title.match(regex);
  //     });
  //   };

  //   const options = getSneakers(searchTerm, sneakers);
  //   const html = options
  //     .map((sneaker) => {
  //       return `
  //               <div class="sneakers__card">
  //                   <button class="sneakers__favorit">
  //                       <img src="./img/favorit.svg" alt="">
  //                   </button>
  //                   <div class="sneakers__img">
  //                       <img src="${sneaker.imageUrl}" alt="sneakersIMG"/>
  //                   </div>
  //                   <div class="sneakers-title">${sneaker.title}</div>
  //                   <div class="sneakers__lower">
  //                       <div class="sneakers__price">
  //                           <span class="sneakers-price-title">Цена:</span>
  //                           <p class="sneakers-price">${sneaker.price} руб.</p>
  //                       </div>
  //                       <div class="sneacers__add">
  //                           <button><img src="./img/addSneakers.svg" alt="">
  //                           </button>
  //                       </div>
  //                   </div>
  //               </div>
  //           `;
  //     })
  //     .join('');
  //   sneakersContent.innerHTML = html;
  //   searchInput.value = ''; // Очистите поле ввода
  // }

  const addFavoritBtn = document.querySelectorAll('.sneakers__favorit');
  const addSneakers = sneakersContent.querySelectorAll('.addSneakers');

  addFavoritBtn.forEach((item, i) => {
    item.addEventListener('click', (e) => {
      // item.innerHTML.includes('favorit.svg') ? item.innerHTML = '<img src="./img/like.svg" alt="liked">' : item.innerHTML = `<img src="./img/favorit.svg" alt="no liked">`
      e.preventDefault();
      if (item.innerHTML.includes('favorit.svg')) {
        item.innerHTML = '<img src="./img/like.svg" alt="liked">';
        newSneakers = {
          title: sneakers[i].title,
          price: sneakers[i].price,
          imageUrl: sneakers[i].imageUrl,
        };
        favoritCard.push(newSneakers);
        localStorage.setItem('favoritCard', JSON.stringify(favoritCard));
        console.log(favoritCard);
      } else {
        item.innerHTML = `<img src="./img/favorit.svg" alt="no liked">`;
        favoritCard.pop(newSneakers);
        localStorage.removeItem('favoritCard');
        console.log(favoritCard);
      }
    });
  });

  addSneakers.forEach((addBtn, i) => {
    addBtn.addEventListener('click', (e) => {
      e.preventDefault();

      if (addBtn.innerHTML.includes('addSneakers.svg')) {
        addBtn.innerHTML = `<img src="./img/pushBtn.svg" alt="">`;
        newSneakers = {
          title: sneakers[i].title,
          price: sneakers[i].price,
          imageUrl: sneakers[i].imageUrl,
        };
        // cartArr.push(newSneakers)
        renderCartSneakers(newSneakers);
        console.log(newSneakers);
      } else {
        addBtn.innerHTML = `<img src="./img/addSneakers.svg" alt="">`;
        cartArr.pop(newSneakers);
        console.log(newSneakers);

        console.log(cartArr);
        renderCartSneakers(cartArr);
      }
    });
  });
};

render();

console.log(cartSneakers);

cartBtn.addEventListener('click', () => {
  cart.classList.remove('cartActiv');
  cart.classList.add('cartActiv');
  document.body.style.overflow = 'hidden';
});

closeCart.addEventListener('click', () => {
  cart.classList.remove('cartActiv');
  document.body.style.overflow = 'visible';
});

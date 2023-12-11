const sneakers = [
  {
    title: 'Мужские Кроссовки Nike Blazer Mid Suede',
    price: 12999,
    imageUrl: '/img/sneakers/1.png',
  },
  {
    title: 'Мужские Кроссовки Nike Air Max 270',
    price: 12999,
    imageUrl: '/img/sneakers/2.png',
  },
  {
    title: 'Мужские Кроссовки Nike Blazer Suede 2',
    price: 8490,
    imageUrl: '/img/sneakers/3.png',
  },
  {
    title: 'Кроссовки Puma X Aka Boku Future Rider',
    price: 8999,
    imageUrl: '/img/sneakers/4.png',
  },
  {
    title: 'Мужские Кроссовки Under Armour Curry 8',
    price: 15199,
    imageUrl: '/img/sneakers/5.png',
  },
  {
    title: 'Мужские Кроссовки Nike Kyrie 7',
    price: 11299,
    imageUrl: '/img/sneakers/6.png',
  },
  {
    title: 'Мужские Кроссовки Jordan Air Jordan 11',
    price: 10799,
    imageUrl: '/img/sneakers/7.png',
  },
  {
    title: 'Мужские Кроссовки Nike LeBron XVIII',
    price: 16499,
    imageUrl: '/img/sneakers/8.png',
  },
  {
    title: 'Мужские Кроссовки Nike Lebron XVIII Low',
    price: 13999,
    imageUrl: '/img/sneakers/9.png',
  },
];

const sneakersContent = document.querySelector('.sneakers__block');
const title = document.querySelector('.title-search');
const favoritTitle = document.querySelector('.favorit__title');

const favoritLink = document.querySelector('.favoritLink');
const userProfileLink = document.querySelector('.userProfile');
const cart = document.querySelector('.cart');
const cartBtn = document.querySelector('.cartBtn');
const totalPrice = cartBtn.querySelector('span');
const closeCart = cart.querySelector('.closeCart');
const cartSneakers = cart.querySelector('.cart__sneakers');
const cartBottomBlock = cart.querySelector('.bottom__block');
const mainContent = document.querySelector('.main__content');

const cartIsEmpty = `
      <div class="empty-box">
        <img src="./img/empty-box.svg" alt="" />
        <h3>Корзина пустая</h3>
        <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
        <button class="closeCartBtn greenBtn">
          <img src="./img/next.svg" alt="arrow" />
          <span>Вернуться назад</span>
        </button>
      </div>`;

const favoritIsEmpty = `
<div class="emptyFavoritPage page">
<div class="page__container">
  <img src="./img/emoji.svg" alt="emojy" />
  <h3>Закладок нет :(</h3>
  <p>Вы ничего не добавляли в закладки</p>
  <button class="comeBack greenBtn">
    <img src="./img/next.svg" alt="arrow" />
    <span>Вернуться назад</span>
  </button>
</div>
</div>`;

const profileIsEmpty = `
<div class="emptyUserPage page">
  <div class="page__container">
    <img src="./img/emojy2.svg" alt="emojy" />
    <h3>У вас нет заказов</h3>
    <p>Вы нищеброд? <br />Оформите хотя бы один заказ.</p>
    <button class="comeBack greenBtn">
      <img src="./img/next.svg" alt="arrow" />
      <span>Вернуться назад</span>
    </button>
  </div>
</div>
`;

const items = sneakers.map((sneaker) => ({
  ...sneaker,
  isInCart: false,
  isFavorit: false,
}));

let cartPrice = 0;
const favoritCard = [];
const cartArray = [];
let orderedItems = [];
totalPrice.innerText = cartPrice + ' руб.';

const checkCart = () => {
  if (!cartArray.length) {
    cartSneakers.innerHTML = cartIsEmpty;
    const closeCartBtn = document.querySelector('.closeCartBtn');
    closeCartBtn.addEventListener('click', () => {
      cart.classList.remove('cartActive');
      document.body.style.overflow = 'visible';
    });
  }
};

cartBtn.addEventListener('click', () => {
  cart.classList.remove('cartActive');
  cart.classList.add('cartActive');
  checkCart();
  document.body.style.overflow = 'hidden';
});

favoritLink.addEventListener('click', (e) => {
  e.preventDefault();
  renderFavoritSneakers();
});

userProfileLink.addEventListener('click', (e) => {
  e.preventDefault();
  renderUserProfile();
});
const isAddFavoritCard = () => {
  const addFavoritBtn = document.querySelectorAll('.sneakers__favorit');

  addFavoritBtn.forEach((item, i) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      if (item.innerHTML.includes('favorit.svg')) {
        item.querySelector('img').src = './img/like.svg';
        items[i].isFavorit = true;
        favoritCard.push(1);
        console.log(favoritCard);
      } else {
        item.querySelector('img').src = `./img/favorit.svg`;
        items[i].isFavorit = false;
        favoritCard.pop();
        console.log(favoritCard);
      }
    });
  });
};

const isAddToCart = () => {
  const addSneakers = sneakersContent.querySelectorAll('.addSneakers');

  addSneakers.forEach((addBtn, i) => {
    addBtn.addEventListener('click', (e) => {
      e.preventDefault();

      if (addBtn.innerHTML.includes('addSneakers.svg')) {
        addBtn.innerHTML = `<img src="./img/pushBtn.svg" alt="">`;
        cartArray.push(1);
        items[i].isInCart = true;
        cartPrice += items[i].price;
        checkCart();
        renderCartSneakers();
        totalPrice.innerText = cartPrice + ' руб.';
      } else {
        addBtn.innerHTML = `<img src="./img/addSneakers.svg" alt="">`;
        items[i].isInCart = false;

        cartPrice -= items[i].price;
        cartArray.pop();

        checkCart();
        renderCartSneakers();
        cartBottomBlock.innerHTML = '';
        totalPrice.innerText = cartPrice + ' руб.';
      }
    });
  });
};

const render = () => {
  sneakersContent.innerHTML = '';
  title.innerHTML = `
        <div class="title">Все кроссовки</div>
        <form class="search">
          <img class="searchBtn" src="./img/searchIcon.svg" alt="search" />
          <input type="text" placeholder="Search..." />
        </form>`;
  items.forEach((element) => {
    sneakersContent.innerHTML += `
            <div class="sneakers__card">
              <button class="sneakers__favorit">
                <img src="${
                  element.isFavorit ? './img/like.svg' : './img/favorit.svg'
                }" alt="no liked">
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
                        <button class="addSneakers">  
                        <img src="${
                          element.isInCart ? `./img/pushBtn.svg` : `./img/addSneakers.svg`
                        }" alt="">
                        </button>
                    </div>
                </div>
            </div>
        `;
  });

  const searchInput = document.querySelector('.search input');
  const searchBtn = document.querySelector('.searchBtn');

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      performSearch();
    }
  });

  searchBtn.addEventListener('click', () => {
    performSearch();
  });

  function performSearch() {
    const searchTerm = searchInput.value;

    const getSneakers = (word, sneakers) => {
      return sneakers.filter((s) => {
        const regex = new RegExp(word, 'gi');
        return s.title.match(regex);
      });
    };

    const options = getSneakers(searchTerm, sneakers);
    const html = options
      .map((sneaker) => {
        return `
                <div class="sneakers__card">
                    <button class="sneakers__favorit">
                        <img src="./img/favorit.svg" alt="">
                    </button>
                    <div class="sneakers__img">
                        <img src="${sneaker.imageUrl}" alt="sneakersIMG"/>
                    </div>
                    <div class="sneakers-title">${sneaker.title}</div>
                    <div class="sneakers__lower">
                        <div class="sneakers__price">
                            <span class="sneakers-price-title">Цена:</span>
                            <p class="sneakers-price">${sneaker.price} руб.</p>
                        </div>
                        <div class="sneacers__add">
                            <button><img src="./img/addSneakers.svg" alt="">
                            </button>
                        </div>
                    </div>
                </div>
            `;
      })
      .join('');
    sneakersContent.innerHTML = html;
    searchInput.value = ''; // Очистите поле ввода
  }

  isAddFavoritCard();
  isAddToCart();
};

render();

const renderUserProfile = () => {
  console.log(orderedItems);
  if (orderedItems.length) {
    title.innerHTML = `
    <div class="title">Мои покупки</div>
    <img class="closeFavorit" src="./img/prev.svg" alt="prev" />
    `;
    const closeUserProfile = title.querySelector('.closeFavorit');
    closeUserProfile.addEventListener('click', () => {
      sneakersContent.innerHTML = '';
      render();
    });
    sneakersContent.innerHTML = '';
    orderedItems.forEach((item) => {
      sneakersContent.innerHTML += `
      <div class="sneakers__card">  
          <button class="sneakers__favorit">
          </button>
          <div class="sneakers__img">
              <img src="${item.imageUrl}" alt="sneakersIMG"/>
          </div>
          <div class="sneakers-title">${item.title}</div>
          <div class="sneakers__lower">
              <div class="sneakers__price">
                  <span class="sneakers-price-title">Цена:</span>
                  <p class="sneakers-price">${item.price} руб.</p>
              </div>
              <div class="sneacers__add">
                  
              </div>
          </div>
        </div>
`;
    });
  } else {
    title.innerHTML = '';
    sneakersContent.innerHTML = profileIsEmpty;
    const comeBack = sneakersContent.querySelector('.comeBack');
    comeBack.addEventListener('click', () => {
      sneakersContent.innerHTML = '';
      render();
    });
  }
};

const renderFavoritSneakers = () => {
  title.innerHTML = `
                <div class="title">Мои закладки</div>
                <img class="closeFavorit" src="./img/prev.svg" alt="prev" />
  `;

  if (favoritCard.length) {
    const favoritItems = items.filter((item) => item.isFavorit === true);
    sneakersContent.innerHTML = '';
    favoritItems.forEach((element) => {
      sneakersContent.innerHTML += `
        <div class="sneakers__card">  
          <button class="sneakers__favorit">
          <img src="${element.isFavorit ? './img/like.svg' : './img/favorit.svg'}" alt="no liked">
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

    const favoritBtns = document.querySelectorAll('.sneakers__favorit');
    favoritBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const favoritItem = btn.closest('.sneakers__card');
        const itemTitle = favoritItem.querySelector('.sneakers-title');
        items.forEach((item) => {
          if (item.title === itemTitle.innerText) {
            item.isFavorit = false;
            favoritCard.pop();
            renderFavoritSneakers();
          }
        });
      });
    });
    isAddToCart();
  } else {
    sneakersContent.innerHTML = '';
    sneakersContent.innerHTML = favoritIsEmpty;
    const comeBack = sneakersContent.querySelector('.comeBack');
    comeBack.addEventListener('click', () => {
      sneakersContent.innerHTML = '';
      render();
    });
  }

  const closeFavorit = title.querySelector('.closeFavorit');
  closeFavorit.addEventListener('click', () => {
    sneakersContent.innerHTML = '';
    render();
  });
};

const renderCartSneakers = () => {
  const cartItems = items.filter((item) => item.isInCart);
  cartSneakers.innerHTML = '';
  cartItems.forEach((sneaker) => {
    cartSneakers.innerHTML += `
      <div class="cart__item">
          <img src="${sneaker.imageUrl}" alt="sneak">
          <div class="sneakers__price">
              <span class="sneakers-title title">${sneaker.title}</span>
              <p class="sneakers-price">${sneaker.price} руб.</p>
          </div>
          <img class="removeBtn" src="./img/removeItem.svg" alt="delete">
      </div>
  `;
  });

  cartBottomBlock.innerHTML = `
            <div class="total">
              <p>Итого:</p>
              <span></span>
            </div>
            <div class="tax">
              <p>Налог 5%:</p>
              <span></span>
            </div>
            <button class="checkout greenBtn">
              <span>Оформить заказ</span>
              <img src="./img/arrow.svg" alt="arrow" />
            </button>
  `;

  const succesMessage = `
  <div class="succes-message">
  <img src="./img/succesMessage.svg" alt="" />
  <h3>Заказ оформлен!</h3>
  <p>Ваш заказ #18 скоро будет передан курьерской доставке</p>
  <button class="closeCartBtn greenBtn">
    <img src="./img/next.svg" alt="arrow" />
    <span>Вернуться назад</span>
  </button>
  </div>`;

  const totalCartPrice = document.querySelector('.total span');
  const taxCartPrice = document.querySelector('.tax span');
  const deleteSneakersBtn = cartSneakers.querySelectorAll('.removeBtn');
  const sendOrder = cartBottomBlock.querySelector('.checkout.greenBtn');

  sendOrder.addEventListener('click', () => {
    items.map((item) => {
      item.isInCart = false;
    });
    orderedItems = [...cartItems];
    console.log(orderedItems);
    cartPrice = 0;
    totalPrice.innerText = cartPrice + ' руб.';
    cartBottomBlock.innerHTML = '';
    cartSneakers.innerHTML = succesMessage;
    const closeCartBtn = document.querySelector('.closeCartBtn');
    isCloseCart(closeCartBtn);
    cartArray.splice(0, cartArray.length);
    render();
  });

  totalCartPrice.innerText = cartPrice + ' руб.';
  taxCartPrice.innerText = Math.round(cartPrice * 0.05) + ' руб.';
  deleteSneakersBtn.forEach((deleletBtn) => {
    deleletBtn.addEventListener('click', () => {
      const cartItemBlock = deleletBtn.closest('.cart__item');
      const itemTitle = cartItemBlock.querySelector('.sneakers-title');

      items.forEach((item) => {
        if (item.title === itemTitle.innerText) {
          item.isInCart = false;
          cartPrice -= item.price;
        }
      });
      cartArray.pop();
      totalPrice.innerText = cartPrice + ' руб.';
      sneakersContent.innerHTML = '';
      renderCartSneakers();
      render();
      if (!cartArray.length) {
        cartBottomBlock.innerHTML = '';
      }
      checkCart();
    });
  });
};

const isCloseCart = (btn) => {
  btn.addEventListener('click', () => {
    cart.classList.remove('cartActive');
    document.body.style.overflow = 'visible';
  });
};
isCloseCart(closeCart);

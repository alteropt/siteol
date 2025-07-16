// Custom Select
const select = document.querySelector('.select');
const selectButton = select.querySelector('.select__button');
const selectList = select.querySelector('.select__list');
const selectItems = select.querySelectorAll('.select__list-item');

function closeSelect() {
  select.classList.remove('select--active');
  selectList.classList.remove('select__list--visible');
}

selectButton.addEventListener('click', function() {
  if (select.classList.contains('select--active')) {
    closeSelect();
  }
  else {
    select.classList.add('select--active');
    selectList.classList.add('select__list--visible');
  }
});

for (let item of selectItems) {
  item.addEventListener('click', function() {
    while(selectButton.firstChild) {
      selectButton.removeChild(selectButton.firstChild)
    }
    for(let child of item.childNodes) {
      let clonedChild = child.cloneNode(true)
      item.childNodes.forEach(function() {
        selectButton.appendChild(clonedChild)
      })
    }

    closeSelect();
  });
}

select.addEventListener('keydown', function(event) {
  if (event.code === 'Tab') {
    const focusedElement = document.activeElement;
    if (focusedElement === selectItems[selectItems.length - 1]) {
      closeSelect();
    }
  }
});

document.addEventListener('click', function(event) {
  if (!select.contains(event.target)) {
    closeSelect();
  }

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      select.classList.remove('select--active');
      selectList.classList.remove('select__list--visible');
    }
  });
});

// Intro Slider
const introSwiper = new Swiper('.intro__inner', {
  slidesPerView: 1,
  loop: true,
  spaceBetween: 20,
  navigation: {
    nextEl: '.intro__swiper-next',
    prevEl: '.intro__swiper-prev',
  },
  pagination: {
    el: '.intro__swiper-dots',
    type: 'bullets',
    bulletClass: 'intro__swiper-dot',
    bulletActiveClass: 'intro__swiper-dot-active',
    clickable: true
  }
})

// Portfolio Tabs
const portfolioTabs = document.querySelectorAll('.portfolio__tabs button')
const portfolioItemsBlocks = document.querySelectorAll('.portfolio__items')

portfolioTabs.forEach(portfolioTab => {
  portfolioTab.addEventListener('click', () => {
    const currentData = portfolioTab.dataset.portfolio
    portfolioTabs.forEach(tab => {tab.classList.remove('active')})
    portfolioTab.classList.add('active')
    portfolioItemsBlocks.forEach(portfolioItemsBlock => {
      if(portfolioItemsBlock.dataset.portfolio === currentData) {
        portfolioItemsBlock.classList.add('active')
      } else {
        portfolioItemsBlock.classList.remove('active')
      }
    })
  })
})

// News Fade
const newsMore = document.querySelector('.news__more')
const fadeEl = document.querySelector('.news__fade')
newsMore.addEventListener('scroll', function() {
  let scrolledWidth = newsMore.scrollLeft
  if(newsMore.scrollWidth - newsMore.offsetWidth === scrolledWidth) {
    fadeEl.classList.add('end')
  } else {
    fadeEl.classList.remove('end')
  }
})

// Header Fixed
const header = document.querySelector('header')

let lastScrollTop = 0
window.addEventListener('scroll', function() {
  let st = window.pageYOffset || header.scrollTop;
  if (st - lastScrollTop > 50){
     header.classList.add('hide')
  } else if(lastScrollTop - st > 50) {
    header.classList.remove('hide')
  }

  if(st === 0) {
    header.classList.remove('scrolled')
    header.classList.remove('hide')
  } else {
    header.classList.add('scrolled')
  }

  lastScrollTop = st <= 0 ? 0 : st; 
})

// Header Burger
const burger = document.querySelector('.burger')
const headerInner = document.querySelector('.header__inner')
const body = document.querySelector('body')

burger.addEventListener('click', () => {
  headerInner.classList.toggle('active')
  body.classList.toggle('overflow')
  burger.classList.toggle('active')
})

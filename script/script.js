document.addEventListener('DOMContentLoaded', function () {

  // scrol

  document.addEventListener('click', function (e) {
    if (e.target.matches('a[href^="#"]')) {
      e.preventDefault();

      document.querySelector(e.target.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });

  // burger

  const burgerBtn = document.getElementById('burger');
  const burgerNavTop = document.querySelector('.header__top-nav');
  const burgerNavBottom = document.querySelector('.header__bottom-nav');
  const menuLinksTop = burgerNavTop.querySelectorAll('.header__nav-link--top');
  const menuLinksBottom = burgerNavBottom.querySelectorAll('.header__nav-link--bottom');

  function burgerRemove() {
    if (window.screen.width <= 591) {
      burgerNavBottom.classList.remove('header__bottom-nav--open');
    }
    burgerBtn.classList.remove('header__burger--active');
    burgerNavTop.classList.remove('header__top-nav--open');
    document.body.classList.remove('stop-scroll');
  }

  burgerBtn.addEventListener('click', function () {
    if (window.screen.width <= 591) {
      burgerNavBottom.classList.toggle('header__bottom-nav--open');
    }

    burgerBtn.classList.toggle('header__burger--active');
    burgerNavTop.classList.toggle('header__top-nav--open');
    document.body.classList.toggle('stop-scroll');
  })

  menuLinksTop.forEach((e) => {
    e.addEventListener('click', function () {
      burgerRemove();
    })
  })

  menuLinksBottom.forEach((e) => {
    e.addEventListener('click', function () {
      burgerRemove();
    })
  })

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      burgerRemove();
    }
  });

  burgerNavTop.addEventListener('click', (e) => {
    e._isClickWithInMenu = true;
  });

  burgerNavBottom.addEventListener('click', (e) => {
    e._isClickWithInMenu = true;
  });

  burgerBtn.addEventListener('click', (e) => {
    e._isClickWithInMenu = true;
  });

  document.body.addEventListener('click', (e) => {
    if (e._isClickWithInMenu) return;
    burgerRemove();
  });

  // modal

  const modalHeader = document.getElementById('modal')

  function modalRemove() {
    modalHeader.classList.remove('modal--active');
    document.body.classList.remove('stop-modal-scroll');
  }

  document.getElementById('modal-open').addEventListener('click', function () {
    modalHeader.classList.add('modal--active');
    document.body.classList.add('stop-modal-scroll');
  })

  document.getElementById('modal-close').addEventListener('click', function () {
    modalRemove();
  })

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modalRemove();
    }
  });

  document.querySelector('#modal .modal__container').addEventListener('click', (e) => {
    e._isClickWithInModal = true;
  });

  modalHeader.addEventListener('click', (e) => {
    if (e._isClickWithInModal) return;
    e.currentTarget.classList.remove('modal--active');
    document.body.classList.remove('stop-modal-scroll');
  });

  // header-search
  const headerInputSearch = document.getElementById('header-search-inp');

  document.getElementById('header-search').addEventListener('click', () => {
    headerInputSearch.classList.toggle('header__search-inp--active');
  });

  // button play mobile

  const headerPlayMobile = document.getElementById('button-mobile');
  const headerPlay = document.querySelector('.header__play');
  const wrapperPlayMobile = document.querySelector('.header__play-mobile');

  headerPlayMobile.addEventListener('click', () => {
    headerPlayMobile.classList.toggle('button-mobile--active');
    headerPlay.classList.toggle('header__play--active');
    wrapperPlayMobile.classList.toggle('header__play-mobile--active')
  })

  // Кнопки play в header

  function togglePlayButton(button) {
    const playImg = button.children[0];
    const pauseImg = button.children[1];

    pauseImg.classList.toggle('active');
    playImg.classList.toggle('active');
  }

  const headerPlayButtons = document.querySelectorAll('.header__play-button');

  headerPlayButtons.forEach(button => {
    button.addEventListener('click', () => {
      togglePlayButton(button);
    })
  });

  const podastsPlayButtons = document.querySelectorAll('.podcasts__play-button');

  podastsPlayButtons.forEach(button => {
    button.addEventListener('click', () => {
      togglePlayButton(button);
    })
  });

  // podcasts-more
  const podcastsContainer = document.getElementById('podcasts-list');
  const podcastsBtnMore = document.getElementById('podcasts-button-more');
  let open = true;

  if (window.screen.width <= 480) {
    for (let i = podcastsContainer.children.length - 1; i >= podcastsContainer.children.length - 8; i--) {
      podcastsContainer.children[i].classList.add('podcasts__item--hide');
    }
  };

  podcastsBtnMore.addEventListener('click', () => {
    if (open) {
      if (window.screen.width <= 480) {
        for (let i = podcastsContainer.children.length - 1; i >= podcastsContainer.children.length - 8; i--) {
          podcastsContainer.children[i].classList.remove('podcasts__item--hide');
          podcastsBtnMore.textContent = 'Cкрыть';
          open = false;
        }
      } else {
        for (let i = podcastsContainer.children.length - 1; i >= podcastsContainer.children.length - 4; i--) {
          podcastsContainer.children[i].classList.remove('podcasts__item--hide');
          podcastsBtnMore.textContent = 'Cкрыть';
          open = false;
        }
      }
    } else {
      if (window.screen.width <= 480) {
        for (let i = podcastsContainer.children.length - 1; i >= podcastsContainer.children.length - 8; i--) {
          podcastsContainer.children[i].classList.add('podcasts__item--hide');
          podcastsBtnMore.textContent = 'Ещё подкасты';
          open = true;
        }
      } else {
        for (let i = podcastsContainer.children.length - 1; i >= podcastsContainer.children.length - 4; i--) {
          podcastsContainer.children[i].classList.add('podcasts__item--hide');
          podcastsBtnMore.textContent = 'Ещё подкасты';
          open = true;
        }
      }
    }
  });

  // select

  const selectHeader = document.querySelector('.broadcast__select-header');
  const selectItem = document.querySelectorAll('.broadcast__select-item');
  let currentElemIndex = 0;

  selectHeader.addEventListener('click', selectToggle);
  selectHeader.addEventListener('keydown', function (e) {
    if (e.code === "ArrowDown" || e.code === "ArrowUp") {
      e.preventDefault();

      const direction = e.code === "ArrowDown" ? 1 : -1;
      currentElemIndex = (currentElemIndex + direction + selectItem.length) % selectItem.length;
      selectItem[currentElemIndex].focus();
    } else if (e.keyCode === 13) {
      selectToggle();
    }
  });

  selectItem.forEach((item, index) => {
    item.addEventListener('click', selectChoose);
    item.addEventListener('keydown', function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();

        selectChoose.call(this, e);
      } else if (e.code === "ArrowDown" || e.code === "ArrowUp") {
        const direction = e.code === "ArrowDown" ? 1 : -1;

        currentElemIndex = (index + direction + selectItem.length) % selectItem.length;
        selectItem[currentElemIndex].focus();
      }
    });
  });

  function selectToggle() {
    selectHeader.parentElement.classList.toggle('broadcast__select--active');
    selectHeader.classList.toggle('broadcast__select-header--rotated');
  }

  function selectChoose() {
    selectItem.forEach(item => item.classList.remove('hidden'));
    selectHeader.classList.toggle('broadcast__select-header--rotated');
    this.classList.add('hidden');

    let text = this.textContent;
    let select = this.closest('.broadcast__select');
    let currentText = select.querySelector('.broadcast__select-current');
    currentText.textContent = text;
    select.classList.remove('broadcast__select--active');
  }

  // accordion

  const accordionElement = document.querySelectorAll('.guests__accordion-item');
  const accordionControls = document.querySelectorAll('.guests__accordion-control');

  accordionElement.forEach(iterator => {
    iterator.firstElementChild.addEventListener('click', () => {
      const accordionActive = document.querySelector('.guests__accordion-content--active');
      const btnActive = document.querySelector('.guests__accordion-control--active');
      const clickedAccordion = iterator.lastElementChild;

      if (clickedAccordion.classList.contains('guests__accordion-content--active')) {
        clickedAccordion.classList.remove('guests__accordion-content--active');
        return;
      }

      if (accordionActive !== null) {
        accordionActive.classList.remove('guests__accordion-content--active');
        btnActive.classList.remove('guests__accordion-control--active');
      }

      clickedAccordion.classList.add('guests__accordion-content--active');
    })
  });

  accordionControls.forEach(control => {
    control.addEventListener('click', () => {
      control.classList.toggle('guests__accordion-control--active');
    });
  });

  // tab

  const guestsTab = document.getElementById('guests-tab');
  const guestsTabList = document.querySelectorAll('.guests__accordion-content');
  const guestsArr = [{
    id: 0,
    img: 'img/guests-plug.jpg',
    imgTablet: 'img/768/guests-plug-768.jpg',
    name: 'Сергей Денисов',
    instagram: '#',
    facebook: '#',
    twitter: '#',
    text: `Сама компания очень успешная. От испорченного получает заблуждение, тягость трудов переносится всеми вещами,
    и так же, как о них говорится, в потребностях, обусловленных удовольствием, трудах.`,
    link: '#',
  },
  {
    id: 1,
    img: 'img/guests-plug.jpg',
    imgTablet: 'img/768/guests-plug-768.jpg',
    name: 'Евгений Войновский',
    instagram: '#',
    facebook: '#',
    twitter: '#',
    text: `Сама компания очень успешная. От испорченного получает заблуждение, тягость трудов переносится всеми вещами,
    и так же, как о них говорится, в потребностях, обусловленных удовольствием, трудах.`,
    link: '#',
  },
  {
    id: 2,
    img: 'img/guests-plug.jpg',
    imgTablet: 'img/768/guests-plug-768.jpg',
    name: 'Олег Свиридовский',
    instagram: '#',
    facebook: '#',
    twitter: '#',
    text: `Сама компания очень успешная. От испорченного получает заблуждение, тягость трудов переносится всеми вещами,
    и так же, как о них говорится, в потребностях, обусловленных удовольствием, трудах.`,
    link: '#',
  },
  {
    id: 3,
    img: 'img/guests-plug.jpg',
    imgTablet: 'img/768/guests-plug-768.jpg',
    name: 'Денис Тельман',
    instagram: '#',
    facebook: '#',
    twitter: '#',
    text: `Сама компания очень успешная. От испорченного получает заблуждение, тягость трудов переносится всеми вещами,
    и так же, как о них говорится, в потребностях, обусловленных удовольствием, трудах.`,
    link: '#',
  },
  {
    id: 4,
    img: 'img/guests-plug.jpg',
    imgTablet: 'img/768/guests-plug-768.jpg',
    name: 'Матвей Мечников',
    instagram: '#',
    facebook: '#',
    twitter: '#',
    text: `Сама компания очень успешная. От испорченного получает заблуждение, тягость трудов переносится всеми вещами,
    и так же, как о них говорится, в потребностях, обусловленных удовольствием, трудах.`,
    link: '#',
  },
  {
    id: 5,
    img: 'img/guests-img.jpg',
    imgTablet: 'img/768/guests-img-768.jpg',
    name: 'Ольга Мартынова',
    instagram: '#',
    facebook: '#',
    twitter: '#',
    text: `Российский искусствовед, арт-критик, куратор выставок, дизайнер, кандидат культурологии.
    Арт-критик газеты &laquo;Коммерсантъ&raquo;.
    Ведёт активную блогерскую деятельность как куратор музея &laquo;Гараж&raquo;, коим является с&nbsp;2016&nbsp;года.`,
    link: '#',
  },
  {
    id: 6,
    img: 'img/guests-plug.jpg',
    imgTablet: 'img/768/guests-plug-768.jpg',
    name: 'Владислав Кауперс',
    instagram: '#',
    facebook: '#',
    twitter: '#',
    text: `Сама компания очень успешная. От испорченного получает заблуждение, тягость трудов переносится всеми вещами,
    и так же, как о них говорится, в потребностях, обусловленных удовольствием, трудах.`,
    link: '#',
  },
  {
    id: 7,
    img: 'img/guests-plug.jpg',
    imgTablet: 'img/768/guests-plug-768.jpg',
    name: 'Юрий Горин',
    instagram: '#',
    facebook: '#',
    twitter: '#',
    text: `Сама компания очень успешная. От испорченного получает заблуждение, тягость трудов переносится всеми вещами,
    и так же, как о них говорится, в потребностях, обусловленных удовольствием, трудах.`,
    link: '#',
  },
  {
    id: 8,
    img: 'img/guests-plug.jpg',
    imgTablet: 'img/768/guests-plug-768.jpg',
    name: 'Константин Прусино',
    instagram: '#',
    facebook: '#',
    twitter: '#',
    text: `Сама компания очень успешная. От испорченного получает заблуждение, тягость трудов переносится всеми вещами,
    и так же, как о них говорится, в потребностях, обусловленных удовольствием, трудах.`,
    link: '#',
  },
  {
    id: 9,
    img: 'img/guests-plug.jpg',
    imgTablet: 'img/768/guests-plug-768.jpg',
    name: 'Дмитрий Михалок',
    instagram: '#',
    facebook: '#',
    twitter: '#',
    text: `Сама компания очень успешная. От испорченного получает заблуждение, тягость трудов переносится всеми вещами,
    и так же, как о них говорится, в потребностях, обусловленных удовольствием, трудах.`,
    link: '#',
  },
  {
    id: 10,
    img: 'img/guests-plug.jpg',
    imgTablet: 'img/768/guests-plug-768.jpg',
    name: 'Михаил Пожитников',
    instagram: '#',
    facebook: '#',
    twitter: '#',
    text: `Сама компания очень успешная. От испорченного получает заблуждение, тягость трудов переносится всеми вещами,
    и так же, как о них говорится, в потребностях, обусловленных удовольствием, трудах.`,
    link: '#',
  },
  {
    id: 11,
    img: 'img/guests-plug.jpg',
    imgTablet: 'img/768/guests-plug-768.jpg',
    name: 'Максим Сергеев',
    instagram: '#',
    facebook: '#',
    twitter: '#',
    text: `Сама компания очень успешная. От испорченного получает заблуждение, тягость трудов переносится всеми вещами,
    и так же, как о них говорится, в потребностях, обусловленных удовольствием, трудах.`,
    link: '#',
  },
  {
    id: 12,
    img: 'img/guests-plug.jpg',
    imgTablet: 'img/768/guests-plug-768.jpg',
    name: 'Иван Калитников',
    instagram: '#',
    facebook: '#',
    twitter: '#',
    text: `Сама компания очень успешная. От испорченного получает заблуждение, тягость трудов переносится всеми вещами,
    и так же, как о них говорится, в потребностях, обусловленных удовольствием, трудах.`,
    link: '#',
  },
  {
    id: 13,
    img: 'img/guests-plug.jpg',
    imgTablet: 'img/768/guests-plug-768.jpg',
    name: 'Пётр Пиотровский',
    instagram: '#',
    facebook: '#',
    twitter: '#',
    text: `Сама компания очень успешная. От испорченного получает заблуждение, тягость трудов переносится всеми вещами,
    и так же, как о них говорится, в потребностях, обусловленных удовольствием, трудах.`,
    link: '#',
  },
  {
    id: 14,
    img: 'img/guests-plug.jpg',
    imgTablet: 'img/768/guests-plug-768.jpg',
    name: 'Георгий Полуян',
    instagram: '#',
    facebook: '#',
    twitter: '#',
    text: `Сама компания очень успешная. От испорченного получает заблуждение, тягость трудов переносится всеми вещами,
    и так же, как о них говорится, в потребностях, обусловленных удовольствием, трудах.`,
    link: '#',
  },
  ];

  function createTabContent(guests, id) {
    guests.forEach(guest => {
      if (guest.id === +id) {
        const guestImgMobile = guestsTab.children[0].children[0];
        const guestImgTablet = guestsTab.children[0].children[1];
        const guestImg = guestsTab.children[0].children[2];
        const guestInstagram = guestsTab.children[1].children[0].children[0];
        const guestFacebook = guestsTab.children[1].children[1].children[0];
        const guestTwitter = guestsTab.children[1].children[2].children[0];
        const guestName = guestsTab.children[2];
        const guestText = guestsTab.children[3];
        const guestLink = guestsTab.children[4];

        if (window.screen.width > 1004) {
          guestImg.src = guest.img;
        } else if (window.screen.width <= 480) {
          guestImgMobile.srcset = guest.img;
        } else {
          guestImgTablet.srcset = guest.imgTablet;
        }

        guestInstagram.href = guest.instagram;
        guestFacebook.href = guest.facebook;
        guestTwitter.href = guest.twitter;
        guestName.textContent = guest.name;
        guestText.innerHTML = guest.text;
        guestLink.href = guest.link;
      }
    })
  }

  guestsTabList.forEach(guest => {
    const listElements = guest.children;
    for (let i = 0; i < listElements.length; i++) {
      listElements[i].firstElementChild.addEventListener('click', () => {

        if (window.screen.width <= 1004) {
          guestsTab.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        }

        const tabActiveRem = document.querySelector('.guests__choice-name--active');
        tabActiveRem.classList.remove('guests__choice-name--active');

        const tabActiveAdd = listElements[i].firstElementChild.firstElementChild;
        tabActiveAdd.classList.add('guests__choice-name--active');

        const id = listElements[i].firstElementChild.dataset.id;
        createTabContent(guestsArr, id);
      })
    }
  })

  // swiper

  const swiper = new Swiper('.about__swiper', {
    loop: true,
    a11y: {
      paginationBulletMessage: `Сотрудник компании {{index}}`,
    },
    breakpoints: {
      320: {
        spaceBetween: 20,
        slidesPerView: 2.08,
        slidesPerGroup: 1,
        loop: false,
      },
      481: {
        spaceBetween: 30,
        slidesPerView: 2,
        slidesPerGroup: 1,
        loop: true,
      },
      1025: {
        spaceBetween: 30,
        slidesPerView: 4,
        slidesPerGroup: 1,
        loop: true,
      }
    },
    autoplay: {
      delay: 5000,
    },
  },);

  document.querySelector('.about__swiper-prev').addEventListener('click', function () {
    swiper.slidePrev();
  });

  document.querySelector('.about__swiper-next').addEventListener('click', function () {
    swiper.slideNext();
  });

  // valid form

  const validation = new JustValidate('.about__form');

  validation.addField('#about-textarea', [
    {
      rule: 'minLength',
      value: 7,
      errorMessage: 'Введите свое сообщение',
    },
  ]).addField('#about-input-name', [
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Вы не ввели имя',
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Проверьте правильность введенного имени',
    },
  ]).addField('#about-input-email', [
    {
      rule: 'required',
      errorMessage: 'Вы не ввели e-mail',
    },
    {
      rule: 'email',
      errorMessage: 'Вы не ввели e-mail',
    },
  ]).addField('#checkbox', [
    {
      rule: 'required',
      errorMessage: 'Вы не приняли согласие :(',
    },
  ]).onSuccess(async function () {

    const data = {
      name: document.getElementById('about-input-name').value,
      mail: document.getElementById('about-input-email').value,
      msg: document.getElementById('about-textarea').value,
    }

    const response = await fetch("mail.php", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    })

    const result = await response.text();
    alert('Сообщение успешно отправлено!')
  })
});

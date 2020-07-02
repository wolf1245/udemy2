// строгая типизация
"use strict"
// обращение к DOMElementam
window.addEventListener('DOMContentLoaded', () => {
    // Tabs start
    // стили питания
    let tabs = document.querySelectorAll('.tabheader__item'),
    // дивы с стилями питания
          tabsContent = document.querySelectorAll('.tabcontent'),
    // родитель стилей питания
          tabsParent = document.querySelector('.tabheader__items');
    
    // скрываем дивы с стилями питания
    function hideTabContent() 
    {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        // убираем класс активности
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    // возращаем дивы с стилями питания
    function showTabContent(i = 0)
    {
        tabsContent[i].classList.add('show', 'fade');
        // нужному элменту удаляем класс невидимости
        tabsContent[i].classList.remove('hide');
        // возращаем класс активности
        tabs[i].classList.add('tabheader__item_active');
    }

    // вызов ф-и с скрытием
    hideTabContent();
    // вызов ф-и с показом только 1 блока
    showTabContent();

    // обработка клика на родителе стилях питания
    tabsParent.addEventListener('click', (event)=> {
        // для частого использования записываем метод в переменную(клик пользователя)
        const target = event.target;

        // если при клике, класс равен
        if(target && target.classList.contains('tabheader__item'))
        {
            // перебираем массив и сравнимаем с элементом котрый кликнул пользователь
            tabs.forEach((item, i) => {
                if(target == item)
                {
                    // скрываем все остальные и показываем только тот котрый равен
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Tabs end

    // Timer start
    // время до которого считаем таймер, может приходить из разных источников
    const deadLine = '2020-06-29';

    // ф-я разницы времени c параметром даты которую мы можем получать в виде строки
    function getTimeRemaining(endTime)
    {
        //от даты которую получили в виде строки,парсим в милисекунды и отнимаем текущюю дату пользователя, получаем разницу
        const t = Date.parse(endTime) - Date.parse(new Date());
        // превращаем разницу в дни
        let days = Math.floor(t / (1000 * 60 * 60 * 24));
        // получаем остаток часов до даты
        let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        // получаем остаток минут
        let minutes = Math.floor((t / (1000 * 60)) % 60);
        // получаем остаток секунд
        let seconds = Math.floor((t / 1000) % 60);

        // возращаем обьект с результатами
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    // ф-я помощник в проверке + подставляет 0 если число < 10
    function helperZero(num)
    {
        if(num >= 0 && num < 10)
        {
            return `0${num}`;
        }
        else  if(num < 0)
        {
            return '00';
        }
        else
        {
            return num;
        }
    }

    // ф-я вывода на экран, где selector это родительский элемент тайммера
    function setTimeClock(selector, endTime)
    {
        // получаем элементы где распологаеться таймер
        let timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds');
        // запускаем ф-ю вывода через каждую секунду
        let timeInterval = setInterval(upDateClock, 1000);

        /*для того чтоб убрать баг отображения при перезаругзки 
        таймера вызовим ф-и  для установки даты*/
        upDateClock();

        // расчет времени который остался на данный момент
        function upDateClock()
        {
            // записываем возращаемый объект из ф-и
            let t = getTimeRemaining(endTime);
            
            // выводим на страницу
            days.innerHTML = helperZero(t.days);
            hours.innerHTML = helperZero(t.hours);
            minutes.innerHTML = helperZero(t.minutes);
            seconds.innerHTML = helperZero(t.seconds);

            // проверяем разницу в милисекундых на исчерпание
            if(t.total <= 0)
            {
                // останавливаем если время вышло
                clearInterval(timeInterval);
            }
        }
    }

    // запуск ф-и c элементом поиска и датой окончания таймера
    setTimeClock('.timer', deadLine);
    // end Timer

    // Modal start
 
    //получаем кнопки
    let modelBtn = document.querySelectorAll('[data-model]');
    // получаем сам класс окна
    let modal = document.querySelector('.modal');

    //навешуем события при клике на показать
    modelBtn.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    //ф-я ооткрытия окна
    function openModal()
    {
        modal.classList.add('show');
        modal.classList.remove('hide')
        // скрываем скролл для того чтоб не прокручивалась страница
        document.body.style.overflow = 'hidden';
        //
        clearTimeout(modalTimerId);
    }
    

    // ф-я закрытия модельного окна
    function closeModal()
    {
        modal.classList.add('hide');
        modal.classList.remove('show');
        // снимаем запрет на скролл
        document.body.style.overflow = '';
    }


    // при клике на подложку закрываем а также если есть атрибут data-close у элемента то тоже закрываем
    modal.addEventListener('click', (event) => {
        // проверяем что клик пользователя был именно на подложку или элемент с атрибутом
        if(event.target === modal || event.target.getAttribute('data-close') == '')
        {
            closeModal();
        }
    });

    // при нажатии escape
    document.addEventListener('keydown', (event) => {
        // проверяем открыто ли окно
        if(event.code === 'Escape' && modal.classList.contains('show'))
        {
            closeModal();
        }
    });

    // показываем пользователю при входет окно на  3 сек
    const modalTimerId = setTimeout(openModal, 3000);

    // вычесляем когда пользователь проскролит страницу до низа
    function showModalScroll()
    {
        // проверяем сколько проскролили пользователь
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)
        {
            openModal();
            // удаляем ф-я показа окна при скролее,чтоб 1 раз показалась
            window.removeEventListener('scroll', showModalScroll);
        }
    }

    // показываем пользователю окно, при скролле к низу страницы
    window.addEventListener('scroll', showModalScroll);
    //Modal end

    //class Карточек меню start
    class menuEat
    {
        /**
         * 
         * @param {string} src - путь картинки
         * @param {string} alt - название картинки
         * @param {string} subtitle - название карточки меню
         * @param {string} descr - описание меню
         * @param {number} price - цена меню
         * @param {number} priceDollar - цена доллара
         * @param {...array} classes - rest оператор
         * @param {string} parentSelector - элемерты поиска
         */
        constructor(src, alt, subtitle, descr, price, parentSelector, ...classes)
        {
            this.src = src;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.price = price;
            this.parentSelector = document.querySelector(parentSelector);
            this.classes = classes;
            this.priceDollar = 26.80;
            this.transerUAH();
            this.renderCart();
        }

        // метод конвертирования цены в гривне в доллар
        transerUAH()
        {
            this.price = Math.floor(this.price * this.priceDollar);
        }

        // метод создания какрточки
        renderCart()
        {
            let elem = document.createElement('div');
            // проверяем были ли переданы значения в массив
            if(this.classes.length === 0)
            {
                // если пустой то создаем класс по  умолчанию
                this.classes  = 'menu__item';
                // добавляем класс созданому диву
                elem.classList.add(this.classes);
            }
            else
            {
                // добавляем каждому элементу
                this.classes.forEach(className => elem.classList.add(className));
            }
            elem.innerHTML = `
                <img src="${this.src}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.subtitle}"</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;

            // вставляем после элемента переданого в класс
            this.parentSelector.append(elem);
        }
    }

    // создаем обьект класса и передаем аргументы
    new menuEat(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        '8.5',
        ".menu .container",
        'menu__item'
    );
    new menuEat(
        'img/tabs/elite.jpg',
        'elite',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        '21',
        ".menu .container",
        'menu__item'
    );
    new menuEat(
        'img/tabs/post.jpg',
        'post',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        '16',
        ".menu .container",
        'menu__item'
    );
    //class Карточек мею end

    // AJAX  start

    // берем все формы с страницы в псевдомассив
    const forms = document.querySelectorAll('form');
    
    // создаем обьект с выводм статуса
    const message = 
    {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    // достаем каждую форму из псевдомассива
    forms.forEach(item => {
        // вызов ф-и и передача форм
        postData(item);
    });

    //  обработки форм
    function postData(form) {
        // при собитии отправить
        form.addEventListener('submit', (event) => {
            // сообщаем что событие не обработанно
            event.preventDefault();

            // создаем img куда будем выводить 
            let statusMessage = document.createElement('img');
            // добавляем путь картинки
            statusMessage.src = message.loading;;
            // добавляем стили картинке
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

            // вставляем после формы
            form.insertAdjacentElement('afterend', statusMessage);
            
            // конструктор обьект с формами
            const formData = new FormData(form);
            
            // создаем обьект для превращения Конструктора FormData в JSON формат
            const ob = {};
            
            // перебираем обьект
            formData.forEach(function(value, key){
                ob[key] = value;
            });
             
            // оправляем данные на сервер через fetch с помощью промиса 
            fetch('server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ob)
            })
            // конвертируем json формат в текст
            .then(data => data.text())
            // обрабатываем промис в случае успеха
            .then(data => {
                console.log(data);
                // ответ что удачно отправил
                showThanksModal(message.success);
                // удаляем собщение
                statusMessage.remove();
            })
            // обрабатываем промис в случае неудачи
            .catch(() => {
                // если не успешен оповещаем
                showThanksModal(message.failure);
            })
            // после выпонения одного из результатов
            .finally(() => {
                // очищаем форму
                form.reset();
            });
        });
    }

    // ф-я вывода ответа на запрос пользователю
    function showThanksModal(message) {
        // получаем модельное окно куда будем выводить
        const prevModalDialog = document.querySelector('.modal__dialog');

        // добавляем класс скрыть
        prevModalDialog.classList.add('hide');
        // показываем окно
        openModal();

        // создаем элемент
        const thanksModal = document.createElement('div');
        // добавляем существующий класс
        thanksModal.classList.add('modal__dialog');
        // вставляем в этот элемент элемент с атрибутом закрытия
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        // вставляем созданный элемент после
        document.querySelector('.modal').append(thanksModal);
        // ф-я изменения окна,удаляет о выводк отправке, делает окно прежним, и закрывает
        setTimeout(() => {
            // удаляем созданный элемент
            thanksModal.remove();
            // возращаем классы те что были
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            // закрываем окно
            closeModal();
        }, 4000);
    }
    /// AJAX end
});

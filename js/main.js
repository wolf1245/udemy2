// // обращение к DOMElementam
// window.addEventListener('DOMContentLoaded', () => {
//     // стили питания
//     let tabs = document.querySelectorAll('.tabheader__item'),
//     // дивы с стилями питания
//           tabsContent = document.querySelectorAll('.tabcontent'),
//     // родитель стилей питания
//           tabsParent = document.querySelector('.tabheader__items');
    
//     // скрываем дивы с стилями питания
//     function hideTabContent() 
//     {
//         tabsContent.forEach(item => {
//             item.classList.add('hide');
//             item.classList.remove('show', 'fade');
//         });
//         // убираем класс активности
//         tabs.forEach(item => {
//             item.classList.remove('tabheader__item_active');
//         });
//     }

//     // возращаем дивы с стилями питания
//     function showTabContent(i = 0)
//     {
//         tabsContent[i].classList.add('show', 'fade');
//         // нужному элменту удаляем класс невидимости
//         tabsContent[i].classList.remove('hide');
//         // возращаем класс активности
//         tabs[i].classList.add('tabheader__item_active');
//     }

//     // вызов ф-и с скрытием
//     hideTabContent();
//     // вызов ф-и с показом только 1 блока
//     showTabContent();

//     // обработка клика на родителе стилях питания
//     tabsParent.addEventListener('click', (event)=> {
//         // для частого использования записываем метод в переменную(клик пользователя)
//         const target = event.target;

//         // если при клике, класс равен
//         if(target && target.classList.contains('tabheader__item'))
//         {
//             // перебираем массив и сравнимаем с элементом котрый кликнул пользователь
//             tabs.forEach((item, i) => {
//                 if(target == item)
//                 {
//                     // скрываем все остальные и показываем только тот котрый равен
//                     hideTabContent();
//                     showTabContent(i);
//                 }
//             });
//         }
//     });
// });
window.addEventListener('DOMContentLoaded', function() {

    // Tabs
    
	let tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
	}

	function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
	});
});

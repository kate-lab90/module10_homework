// Задание 2.
// Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert.

const btn = document.querySelector('.j-btn-test');

btn.addEventListener('click', () => {
  const scrWith = window.screen.width;
  const scrHeight = window.screen.height;

  alert(`Ширина экрана: `+ scrWith + ` Высота экрана: ` + scrHeight )

});

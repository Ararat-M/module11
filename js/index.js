// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const minWeightInput = document.querySelector('.min__weight__input'); // кнопка перемешивания
const maxWeightInput = document.querySelector('.max__weight__input'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// список цветов
const fruitsColorMap = new Map([
  ['фиолетовый', '#8b00ff'],
  ['зеленый', '#84cd1b'],
  ['розово-красный', '#dc143c'],
  ['желтый', '#ffd800'],
  ['светло-коричневый', '#cd853f']
]);

const fruitsColorArray = {
  "фиолетовый": "#8b00ff",
  "зеленый": "#84cd1b",
  "розово-красный": "#dc143c",
  "желтый": "#ffd800",
  "светло-коричневый": "#cd853f",
};

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/
function createFruitCard(kind, color, weight) {
  const fruit = document.createElement('li');
  const fruitInfo = document.createElement('div');
  const fruitKind = document.createElement('div')
  const fruitColor = document.createElement('div')
  const fruitWeight = document.createElement('div')

  fruitInfo.append(fruitKind);
  fruitInfo.append(fruitColor);
  fruitInfo.append(fruitWeight);
  fruit.append(fruitInfo);
  fruitsList.append(fruit);
  
  fruitKind.innerHTML = kind;
  fruitColor.innerHTML = color;
  fruitWeight.innerHTML = weight;

  fruit.classList.add('fruit__item');
  fruit.style.background = fruitsColorMap.get(color);
  fruitInfo.classList.add('fruit__info');
}
// отрисовка карточек
const display = (arr) => {
  while (document.querySelector('.fruit__item') !== null) { 
    fruitsList.removeChild(document.querySelector('.fruit__item'));
  }

  for (let i = 0; i < arr.length; i++) {
    // TODO: формируем новый элемент <li>
    createFruitCard(arr[i].kind, arr[i].color, arr[i].weight);
  }

};

// первая отрисовка карточек
display(fruits);

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
function shuffleFruits() {
  let result = [];

  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    randInt = getRandomInt(0, fruits.length - 1);
    result.push(fruits[randInt]);
    fruits.splice(randInt, 1);
  }

  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits()
  display(fruits);
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  let filteredFruits = fruits.filter((item) => {
    // TODO: допишите функцию
    return item.weight > minWeightInput.value && item.weight < maxWeightInput.value
  });
  
  return filteredFruits
};

filterButton.addEventListener('click', () => {
  display(filterFruits());
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  display();
});

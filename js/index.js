// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const minWeightInput = document.querySelector('.min__weight__input'); // поле с минимальным весом
const maxWeightInput = document.querySelector('.max__weight__input'); // поле с максимальным весом
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortColorActionButton = document.querySelector('.sort__color__action__btn'); // кнопка сортировки по цвету
const sortWeightActionButton = document.querySelector('.sort__weight__action__btn'); // кнопка сортировки по весу
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorSelector = document.querySelector('.color__selector'); // поле с названием цвета
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

for (const [color, hex] of fruitsColorMap) {
  option = document.createElement('option');
  option.textContent = color;
  colorSelector.append(option);
}

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/
function createFruitCard(index, kind, color, weight) {
  const fruit = document.createElement('li');
  const fruitInfo = document.createElement('div');
  const fruitIndex = document.createElement('div');
  const fruitKind = document.createElement('div');
  const fruitColor = document.createElement('div');
  const fruitWeight = document.createElement('div');

  fruitInfo.append(fruitIndex);
  fruitInfo.append(fruitKind);
  fruitInfo.append(fruitColor);
  fruitInfo.append(fruitWeight);
  fruit.append(fruitInfo);
  fruitsList.append(fruit);

  fruitIndex.innerHTML = `index: ${index}`;
  fruitKind.innerHTML = `kind: ${kind}`;
  fruitColor.innerHTML = `color: ${color}`;
  fruitWeight.innerHTML = `weight (kg): ${weight}`;

  fruit.classList.add('fruit__item');
  fruit.style.background = fruitsColorMap.get(color);
  fruitInfo.classList.add('fruit__info');
}
// отрисовка карточек
const display = (arr = fruits) => {
  while (document.querySelector('.fruit__item') !== null) {
    fruitsList.removeChild(document.querySelector('.fruit__item'));
  }

  for (let i = 0; i < arr.length; i++) {
    // TODO: формируем новый элемент <li>
    createFruitCard(i, arr[i].kind, arr[i].color, arr[i].weight);
  }

};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
function shuffleFruits() {
  let oldArray = fruits.slice(0)
  let newArray = [];

  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    randInt = getRandomInt(0, fruits.length - 1);
    newArray.push(fruits[randInt]);
    fruits.splice(randInt, 1);
  }
  
  const isEqual = JSON.stringify(oldArray) === JSON.stringify(newArray);
  if (isEqual) {
    alert('Массив не изменился')
  }

  fruits = newArray;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits()
  display();
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
const BUBBLE_SORT = 'bubbleSort';
const QUICK_SORT = 'quickSort';
let sortKind = BUBBLE_SORT; // инициализация состояния вида сортировки
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = '-'; // инициализация состояния времени сортировки

let priorityColor = [
  'красный',
  'розово-красный',
  'оранжевый',
  'желтый',
  'зеленый',
  'голубой',
  'синий',
  'фиолетовый',
  'светло-коричневый',
]

function comparationColor(a, b)  {
  return priorityColor.findIndex(i => i == a.color) < priorityColor.findIndex(i => i == b.color);
};

function comparationWeight(a, b)  {
  return a.weight < b.weight;
};

function bubbleSort(arr, compareFunc) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {

      if (compareFunc(arr[j + 1], arr[j])) {
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
      }

    }
  }
  return arr;
}

function quickSort(arr, compareFunc) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = arr[pivotIndex];
  const less = [];
  const greater = [];

  for (let i = 0; i < arr.length; i++) {

    if (i === pivotIndex) {
      continue;
    }

    if (compareFunc(arr[i], pivot)) {
      less.push(arr[i]);
    } else {
      greater.push(arr[i]);
    }

  }

  return [...quickSort(less, compareFunc), pivot, ...quickSort(greater, compareFunc)]
}

function startSort(arr, sortKind, compareFunc) {
  sortedArray = [];

  switch (sortKind) {
    case BUBBLE_SORT:
      start = new Date().getTime();
      sortedArray = bubbleSort(arr, compareFunc)
      end = new Date().getTime();
      break;

    case QUICK_SORT:
      start = new Date().getTime();
      sortedArray = quickSort(arr, compareFunc)
      end = new Date().getTime();
      break;
  }

  sortTimeLabel.textContent = `${end - start} ms`;

  return sortedArray;
}

sortChangeButton.addEventListener('click', () => {
  (sortKind === BUBBLE_SORT) ? sortKind = QUICK_SORT : sortKind = BUBBLE_SORT;

  sortKindLabel.innerHTML = sortKind;
})

sortColorActionButton.addEventListener('click', () => {
  fruits = startSort(fruits, sortKind, comparationColor);
  display();
})

sortWeightActionButton.addEventListener('click', () => {
  fruits = startSort(fruits, sortKind, comparationWeight);
  display();
})

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  if (kindInput.value === '' || weightInput.value === '') {
    alert('Осталось не заполненное поле');
  } 
  else{
    fruits.push({kind: kindInput.value, color: colorSelector.value, weight: weightInput.value});
  }

  display();
});
// 如何定义一个函数，一共4种方式
function add1(x: number, y: number) {
  return x + y;
}

// 下面3种只是函数类型的定义，没有具体实现
let add3 : (x: number, y: number) => number;

type add4 = (x: number, y: number) => number;

interface add5 {
  (x: number, y: number): number;
}

// 可选参数
function add6(x: number, y?: number) {
  return y ? x + y : x;
}

add6(1);
add6(1, 2);

// 参数默认值
function add7(x: number, y = 0, z: number, q = 1) {
  return x + y + z + q;
}

console.log(add7(1, undefined, 3)); // 第二个参数必须传，第四个参数可以不传

// 参数个数不确定，剩余参数
function add8(x: number, ...rest: number[]) {
  return x + rest.reduce((pre, cur) => pre + cur);
}

console.log(add8(1, 2, 3, 4, 5));

// 函数重载
// ts编译器会查询重载列表，会优先尝试第一个定义，依次向下匹配
function add9(...rest: number[]): number;
function add9(...rest: string[]): string;
function add9(...rest: any[]): any {
  let first = rest[0];
  if (typeof first === 'string') {
    return rest.join('');
  }
  if (typeof first === 'number') {
    return rest.reduce((pre, cur) => pre + cur);
  }
}

console.log(add9(1, 2, 3));
console.log(add9('a', 'b', 'c'));

console.log('-'.repeat(6));

let myAdd = function(x: number, y: number) {
  return x + y;
}

// function type: (baseValue: number, increment: number) => number
let myAdd2 : (baseValue: number, increment: number) => number = function (x, y) {
  return x + y;
};

// the number of arguments given to a function has to match the number of parameters the function expects.
// optional and default parameters
// A required parameter cannot follow an optional parameter.
function buildName(firstName: string, lastName?: string) {
  if (lastName) return firstName + " " + lastName;
  else return firstName;
}

// default-initialized parameters
// default-initialized parameters don’t need to occur after required parameters.
// f a default-initialized parameter comes before a required parameter, users need to explicitly pass undefined to get the default initialized value. 
function buildName2(firstName: string, lastName = "Jiang") {
  return firstName + " " + lastName;
}

let result2 = buildName2('undefined');
console.log(result2);

// rest parameters
function buildName3(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(' ');
}

let result3 = buildName3('Andy');

let buildNameFun: (fname: string, ...rest: string[]) => string = buildName3;

interface Card {
  suit: string;
  card: number;
}

interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this: Deck): () => Card;
}

// 在Typescript中，只能在function的第一个参数添加this约束，对this进行约束后，则表示只能在约束的对象上调用，否则将会出错。
// Arrow functions capture the this where the function is created rather than where it is invoked
let deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker: function(this: Deck) { // this parameters
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    }
  }
};

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();
console.log('card: ' + pickedCard.card + ' of ' + pickedCard.suit);

// this parameters in callbacks
interface Event {
  message: string;
}

interface UIElement {
  addClickListener(onclick: (this: void, e: Event) => void): void;
}

class Handler {
  info: string = '';
  onClickBad(this: void, e: Event) {
    console.log('click');
  }
}

let h = new Handler();
let uiElement: UIElement = {
  addClickListener: (onclick) => {
    window.addEventListener('click', onclick);
  }
}
uiElement.addClickListener(h.onClickBad);

// overloads
let suits = ['hearts', 'spades', 'clubs', 'diamonds'];
function pickedCard2(x: { suit: string; card: number}[]): number;
function pickedCard2(x: number): { suit: string; card: number };
function pickedCard2(x: any): any {
  if (typeof x === 'object') {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  } else if (typeof x === 'number') {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}

let myDeck = [
  { suit: 'diamonds', card: 2 },
  { suit: 'spades', card: 10 },
  { suit: 'hearts', card: 4 }
];
let pickedCard3 = myDeck[pickedCard2(myDeck)];
console.log('card: ' + pickedCard3.card + ' of ' + pickedCard3.suit);

let pickedCard4 = pickedCard2(15);
console.log('card: ' + pickedCard4.card + ' of ' + pickedCard4.suit);

// pickedCard2('string');
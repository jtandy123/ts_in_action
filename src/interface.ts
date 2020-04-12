// let add: (x: number, y: number) => number // 用 变量 定义函数类型

// 用 接口 定义函数类型
// interface Add {
//   (x: number, y: number): number
// }

// 用 类型别名 定义函数类型
type Add = (x: number, y: number) => number

let add2: Add = (a, b) => a + b

// 混合类型的接口：一个接口既可以定义一个函数，也可以像对象一样拥有属性和方法
interface Lib {
  (): void; // 表明Lib是一个函数类型
  version: string;
  doSomething(): void;
}

function getLib() {
  let lib: Lib = (() => {}) as Lib; // 类型断言
  lib.version = '1.0'
  lib.doSomething = () => {}
  return lib;
}

// 使用getLib函数封装后，可以创建多个实例
let lib1 = getLib();
lib1();
lib1.doSomething();
let lib2 = getLib();

console.log('------');

function printLabel(labelObj: { label: string }) {
  console.log(labelObj.label);
}

let myObj = { size: 10, label: 'Size 10 Object' };
printLabel(myObj);

interface LabeledValue {
  label: string;
}

function printLabel2(labelObj: LabeledValue) {
  console.log(labelObj.label);
}

printLabel2(myObj);

// optional properties
interface SquareConfig {
  color?: string;
  width?: number;
  // [propName: string]: any // string index signature
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: 'white', area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let param = { colour: 'red', width: 100 };
createSquare(param);
// excess property checks
createSquare({
  // colour: 'blue',
  width: 120
})

// readonly properties
interface Point {
  readonly x: number;
  readonly y: number;
  readonly z: number[];
}

let p1: Point = { x: 1, y: 2, z: [] };
p1.z.push(1);
console.log(p1.z)

let arr: number[] = [1, 2, 3];
let ro: ReadonlyArray<number> = arr;

arr = <number[]> ro;
arr = ro as number[];

// function types
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (src, sub) {
  let result = src.search(sub);
  return result > -1;
}

// indexable types
interface StringArray {
  [index: number]: string;
  [index2: string]: any;
}

let myArray: StringArray;
myArray = ['bob', 'fred'];
let myStr: string = myArray[0];
console.log(myStr);

interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

interface NotOkay {
  [x: number]: Animal;
  [x: string]: Animal;
}

interface ReadonlyStringArray {
  readonly [index: number]: string;
}
let mA: ReadonlyStringArray = [];
// mA[0] = 'test';

// class types
// interface ClockInterface {
//   currentTime: Date;
//   setTime(d: Date): void;
// }

// class Clock implements ClockInterface {
//   currentTime: Date = new Date();
//   setTime(d: Date) {
//     this.currentTime = d;
//   }
//   constructor(h: number, m: number) {
//   }
// }

interface ClockConstructor {
  new (hour: number, minute: number): any;
}

interface ClockInterface {
  tick(): any;
}

const Clock: ClockConstructor = class Clock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log('beep beep')
  }
};

// extending interfaces
interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square = {} as Square;
square.color = 'blue';
square.sideLength = 10;
square.penWidth = 5.0;

// hybrid types
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = function (start: number) {} as Counter;
  counter.interval = 123;
  counter.reset = function () {};
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;


// interfaces extending classes
class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() {
    console.log('select control');
  }
}








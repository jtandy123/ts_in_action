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
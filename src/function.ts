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
// 原始类型
let bool: boolean = true
let num: number | undefined | null = 123 // 联合类型，语法为在两种类型之间加竖线：|
let str: string = 'abc'

// 数组
let arr1: number[] = [1, 2, 3]
let arr2: Array<number | string> = [1, 2, 3, '4'] // Array<T>是TS预定义的泛型接口

// 元组，特殊的数组，它限定了数组元素的类型和个数
let tuple: [number, string] = [0, '1']
tuple.push(2) // TS允许往元组中插入新的元素的，但还是不能越界访问。实际的开发过程中，强烈不建议如此使用
// 元组的越界访问问题
// tuple[2] // 报错
console.log(tuple)

// 函数，需要为函数参数加上类型注解，否则报错
let add = (x: number, y: number): number => x + y // 通常函数的返回值类型是可以省略的，这就利用了TS的类型推断功能
let compute: (x: number, y: number) => number // 定义函数类型，没有具体实现
compute = (a, b) => a + b // 具体实现，函数的参数名称可以和定义时的不同，也不必指定类型

// 对象
let obj: object = {x: 1, y: 2}
// obj.x = 3 // 报错
let obj2: {x: number, y: number} = {x: 3, y: 4}
obj2.x = 5

// symbol
let s1: symbol = Symbol()
let s2 = Symbol()
console.log(s1 === s2)

// undefined, null是任何类型的子类型，这说明它们可以赋值给其他类型，可以在tsconfig.json中设置strictNullChecks为false
let un: undefined = undefined // 如果声明了undefined类型，值就不可以赋值为其他类型了，只能赋值为undefined
let nu: null = null
num = undefined // tsconfig.json中设置strictNullChecks为true后，可以为num声明联合类型来完成赋值
num = null

// void，在JS中void是一种操作符，它可以让任何表达式返回undefined，返回undefined最便捷的方法就是：void 0
// TS中void类型表示没有任何返回值的类型
let noReturn = () => {}

// any, TS中如果不指定类型，默认就是any类型。如果不是特殊情况，不建议使用any
let x
x = 1
x = []
x = () => {}

// never，永远不会有返回值的类型
let error = () => {
  throw new Error('error')
}

let endless = () => {
  while(true) {}
}

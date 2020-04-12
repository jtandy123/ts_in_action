// 数字枚举
enum Role {
  Reporter = 1, // 若没有赋值，默认为0，后续递增
  Developer,
  Maintainer,
  Owner,
  Guest
}
console.log(Role.Reporter)
console.log(Role)

// 字符串枚举
enum Message {
  Success = '恭喜你，成功了',
  Fail = '抱歉，失败了'
}

// 异构枚举，这种情况容易引起混淆，所以不建议使用
enum Answer {
  N, // 0
  Y = 'Yes'
}

// 枚举成员，枚举成员的值是只读类型，定义了之后是不可以修改的
enum Char {
  // const member：没有初始值的情况；对已有枚举成员的引用；常量的表达式
  // 会在编译的时候计算出结果，然后以常量的形式出现在运行时环境
  a,
  b = Char.a,
  c = 1 + 3,
  // computed member：需要被计算的枚举成员，就是一些非常量的表达式
  // 这些枚举成员的值不会在编译阶段进行计算，而会被保留到程序的执行阶段
  d = Math.random(),
  e = '123'.length,
  f = 4 // computed成员后面的成员必须初始化
}

// 常量枚举，用const声明的枚举，在编译阶段会被移除，编译后没有任何代码
// 常量枚举的作用：当不需要一个对象，而需要对象的值的时候，就可以使用常量枚举，这样会减少在编译环境的代码
const enum Month {
  Jan,
  Feb,
  Mar
}
let month = [Month.Jan, Month.Feb, Month.Mar]

// 枚举类型，在某些情况下，枚举和枚举成员都可以作为一种单独的类型存在
enum E { a, b }
enum F { a = 0, b = 1 }
enum G { a = 'apple', b = 'banana' }

let e: E = 3
let f: F = 3
// e === f // 不同类型的枚举是不可以进行比较的

let e1: E.a = 2
let e2: E.b
// e1 === e2 // 不能比较
let e3: E.a = 2
console.log(e1 === e3) // 相同的枚举成员类型，可以比较，在比较之前需要初始化

// 字符串枚举的取值只能是枚举成员的类型
let g1: G = G.b // G.a或者G.b都可以
let g2: G.a = G.a // 只能赋值G.a


function initByRole(role: Role) {
  if (role === Role.Reporter || role === Role.Developer) {
    // do sth
  } else if (role === Role.Maintainer || role === Role.Owner) {
    // do sth
  } else if (role === Role.Guest) {
    // do sth
  } else {
    // do sth
  }
}

// 对象类型接口
interface List {
  readonly id: number; // 只读属性，属性值不能被修改
  name: string;
  // [x: string]: any; // 字符串索引签名：用任意的字符串去索引List，可以得到任意的结果
  age?: number; // 可选属性
}

interface Result {
  data: List[]
}

function render(result: Result) {
  result.data.forEach((value) => {
    console.log(value.id, value.name)
    if (value.age) {
      console.log(value.age)
    }
  })
}

let result = {
  data: [
    {id: 1, name: 'A', sex: 'male'},
    {id: 2, name: 'B', age: 30}
  ]
}

render(result)

/*
render({
  data: [
    {id: 1, name: 'A', sex: 'male'},
    {id: 2, name: 'B'}
  ]
} as Result) // 类型断言，明确告诉编译器我们知道变量的类型就是Result

render(<Result>{
  data: [
    {id: 1, name: 'A', sex: 'male'},
    {id: 2, name: 'B'}
  ]
}) // 类型断言，这种方式在react中会产生歧义
*/

// 当不确定一个接口中有多少个属性的时候，就可以使用可索引类型的接口
// 索引类型的接口既可以用数字去索引，也可以用字符串去索引

// 用数字索引的接口
interface StringArray {
  [index: number]: string
}
let chars: StringArray = ['A', 'B']

// 两种索引混用：既可以用数字去索引，也可以用字符串去索引
interface Names {
  [x: string]: string;
  [z: number]: string;
}
// 数字索引签名的返回值一定要是字符串索引签名的返回值的子类型
// 这是因为JS会进行类型转换，将number转换为string，这样就能保持类型的兼容性
interface Names2 {
  [x: string]: any;
  [z: number]: number;
}

console.log('------');

enum Color {Red, Green, Blue}
let colorName: string = Color[2];
console.log(colorName);
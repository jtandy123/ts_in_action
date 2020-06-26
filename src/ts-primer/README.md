> TypeScript 是 JavaScript 的类型的超集，它可以编译成纯 JavaScript。编译出来的 JavaScript 可以运行在任何浏览器上。TypeScript 编译工具可以运行在任何服务器和任何系统上。TypeScript 是开源的。

为什么选择TS？
- TS增加了代码的可读性和可维护性
  - 类型系统实际上是最好的文档
  - 可以在编译阶段就发现大部分错误
  - 增强了编辑器和IDE的功能，包括代码补全、接口提示、跳转到定义、重构等
- TS非常包容
  - TS是JS的超集
  - 即使不显示的定义类型，也能够自动做出类型推论
  - 可以定义从简单到复杂的几乎一切类型
  - 即使TS编译报错，也可以生成JS文件
  - 兼容第三方库，即使第三方库不是用TS写的，也可以编写单独的类型文件供TS读取 
- TS拥有活跃的社区
  - 大部分第三方库都有提供给TS的类型定义文件
  - Angular2, Vue3使用TS编写
  - TS拥抱了ES6规范，也支持部分ESNext草案的规范

TS的缺点：
- 有一定学习成本，需要理解接口、泛型、类、枚举等前端工程师可能不是很熟悉的概念
- 短期可能会增加一些开发成本，毕竟要多写一些类型的定义，不过对于一个需要长期维护的项目，TS能够减少其维护成本
- 集成到构建流程需要一些工作量
- 可能和一些库结合的不是很完美

---

```
$ npm install -g typescript
$ tsc hello.ts
```
使用 TypeScript 编写的文件以 .ts 为后缀，用 TypeScript 编写 React 时，以 .tsx 为后缀。   
Visual Studio Code是用TypeScript编写的。

---

```
function sayHello(person: string) {
  return `Hello, ${person}`;
}

let user = 'Tom';
console.log(sayHello(user));
```
TypeScript 中，使用 : 指定变量的类型，: 的前后有没有空格都可以。   
TypeScript 只会进行静态检查，如果发现有错误，编译的时候就会报错。  
TypeScript 编译的时候即使报错了，还是会生成编译结果，我们仍然可以使用这个编译之后的文件。如果要在报错的时候终止 js 文件的生成，可以在 tsconfig.json 中配置 noEmitOnError 即可。  

tsconfig.json(http://json.schemastore.org/tsconfig):
```
{
  files: array,
  exclude: array,
  include: array,
  compileOnSave: boolean,
  extends: string,
  compilerOptions: object with 86 properties,
  typeAcquisition: {
    enable: boolean default false,
    include: array,
    exclude: array
  },
  references: [{
    path: string
  }, ...],
  ts-node: object with 14 properties
}
```
- files: If no 'files' or 'include' property is present in a tsconfig.json, the compiler defaults to including all files in the containing directory and subdirectories except those specified by 'exclude'. When a 'files' property is specified, only those files and those specified by 'include' are included.
- exclude: Specifies a list of files to be excluded from compilation. The 'exclude' property only affects the files included via the 'include' property and not the 'files' property. Glob patterns require TypeScript version 2.0 or later.
- include: Specifies a list of glob patterns that match files to be included in compilation. If no 'files' or 'include' property is present in a tsconfig.json, the compiler defaults to including all files in the containing directory and subdirectories except those specified by 'exclude'. Requires TypeScript version 2.0 or later.
- compileOnSave: Enable Compile-on-Save for this project.
- extends: Path to base configuration file to inherit from. Requires TypeScript version 2.1 or later.
- compilerOptions: Instructs the TypeScript compiler how to compile .ts files.
- typeAcquisition: Auto type (.d.ts) acquisition options for this project. Requires TypeScript version 2.1 or later.
- references: Referenced projects. Requires TypeScript version 3.0 or later.
- ts-node: ts-node options. ts-node offers TypeScript execution and REPL for node.js, with source map support.

---

## 原始数据类型
- boolean
- number
- string
- null
- undefined
- Symbol
- bigint

### boolean
```
let isDone: boolean = false;
let createdByNewBoolean: boolean = new Boolean(1); // error
let createdByNewBoolean: Boolean = new Boolean(1);
let createdByBoolean: boolean = Boolean(1);
```
### number
```
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;
```

### string
```
let myName: string = 'Andy';
let sentence: string = `Hello, my name is ${myName}`;
```

### void
```
// void表示函数没有任何返回值
function alertName(): void {
  alert('My name is Andy');
}

let unusable: void = undefined; // 声明一个 void 类型的变量没有什么用，因为只能将它赋值为 undefined：
```

### Null和Undefined
```
let u: undefined = undefined;
let n: null = null;

let num: number = undefined; // undefined 和 null 是所有类型的子类型。undefined 类型的变量，可以赋值给 number 类型的变量
let num: number = u;

let v: void;
let num: number = v; // error
```

### Any
```
let myFavoriteNumber: any = 'seven';
myFavoriteNumber = 7;
```
在任意值上访问任何属性都是允许的，也允许调用任何方法。声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值。变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型。

### 类型推断
```
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7; // Type 'number' is not assignable to type 'string'
```
TypeScript 会在没有明确的指定类型的时候推测出一个类型。   
如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查：
```
let myFavoriteNumber;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

### 联合类型
```
let myFavoriteNumber: string | number; // 联合类型使用 | 分隔每个类型
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```
当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法。
```
function getLength(something: string | number): number {
  // return something.length; // length 不是 string 和 number 的共有属性，所以会报错
  return something.toString();
}
```
联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型:
```
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
console.log(myFavoriteNumber.length); // 5
myFavoriteNumber = 7;
console.log(myFavoriteNumber.length); // 编译时报错
```

### 对象的类型 --- 接口
在 TypeScript 中，使用接口（Interfaces）来定义对象的类型。  
TypeScript 中的接口除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。
```
interface Person {
  name: string;
  age: number；
}

let person: Person = {
  name: 'Andy',
  age: 31
}
```
接口一般首字母大写。有的编程语言中会建议接口的名称加上 I 前缀。定义的变量比接口少了一些属性是不允许的。多一些属性也是不允许的。赋值的时候，变量的形状必须和接口的形状保持一致。

#### 可选属性
不要完全匹配一个形状，那么可以用可选属性。可选属性的含义是该属性可以不存在。这时仍然不允许添加未定义的属性。
```
interface Person {
  name: string;
  age?: number;
}

let andy: Person = {
  name: 'Andy',
  age: 25,
  gender: 'male' // error
}
```
#### 任意属性
```
interface Person {
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};
```
使用 [propName: string] 定义了任意属性取 string 类型的值。一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集。
一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型。

#### 只读属性
对象中的一些字段只能在创建的时候被赋值，可以用 readonly 定义只读属性：
```
interface Person {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}

let andy: Person = {
  id: 12345,
  name: 'Andy',
  gender: 'male'
};

andy.id = 67890; // error
```
只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候。
```
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = { // error, Property 'id' is missing in type '{ name: string; gender: string; }'
    name: 'Tom',
    gender: 'male'
};

tom.id = 89757;
```

### 数组
- 类型+方括号 表示法
- 数组泛型
- 用接口表示数组
```
let fibonacci: number[] = [1, 1, 2, 3, 5];

let fibonacci: Array<number> = [1, 1, 2, 3, 5];

interface NumberArray {
  [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
```
虽然接口也可以用来描述数组，但是我们一般不会这么做，因为这种方式比前两种方式复杂多了。不过有一种情况例外，那就是它常用来表示类数组。  

#### 类数组
```
function sum() {
  let args: {
    [index: number]: number;
    length: number;
    callee: Function;
  } = arguments;
}
```
事实上常用的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等：
```
function sum() {
  let args: IArguments = arguments;
}
```

#### any在数组中的应用
```
let list: any[] = ['test', 25, {description: 'ts array type'}]; // 用 any 表示数组中允许出现任意类型
```

### 函数
#### 函数声明
```
function sum(x: number, y: number): number { // 输入多余的（或者少于要求的）参数，是不被允许的
  return x + y;
}
```

#### 函数表达式
```
let mySum = function(x: number, y: number): number { // 等号左边的 mySum，是通过赋值操作进行类型推论而推断出来的
  return x + y;
};

let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
```
在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。  

#### 用接口定义函数的形状
```
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  return source.search(subString) !== -1;
}
```
采用函数表达式|接口定义函数的方式时，对等号左侧进行类型限制，可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变。

#### 可以选参数
可选参数后面不允许再出现必需参数
```
function buildName(firstName: string, lastName?: string) {
  return lastName ? `${firstName} ${lastName}` : firstName;
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```

#### 参数默认值
TypeScript 会将添加了默认值的参数识别为可选参数，此时不受「可选参数必须接在必需参数后面」的限制
```
function buildName(firstName: string = 'Tom', lastName: string) {
  return `${firstName} ${lastName}`;
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName(undefined, 'Cat');
```

#### 剩余参数
rest 参数只能是最后一个参数
```
function push(array: any[], ...item: any[]) {
  items.forEach((item) => {
    array.push(item);
  });
}
let a: any[] = [];
push(a, 1, 2, 3);
```

#### 重载
```
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}
```
TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。

### 类型断言
手动指定一个值的类型
```
value as type
或
<type>value
```
在 tsx 语法（React 的 jsx 语法的 ts 版）中必须使用前者，即 值 as 类型。  

- 将一个联合类型断言为其中一个类型
- 将一个父类断言为更加具体的子类
- 将任何一个类型断言为any
- 将any断言为一个具体的类型

```
window.foo = 1; // error

(window as any).foo = 1; // 在 any 类型的变量上，访问任何属性都是允许的
```
将一个变量断言为 any 可以说是解决 TypeScript 中类型问题的最后一个手段。

```
function getCacheData(key: string): any {
  return (window as any).cache[key];
}

interface Cat {
  name: string;
  run(): void;
}

const tom = getCacheData('tom') as Cat;
tom.run();
```

#### 类型断言的限制
- 联合类型可以被断言为其中一个类型
- 父类可以被断言为子类
- 任何类型都可以被断言为any
- any可以被断言为任何类型
- 要使得A能够被断言为B，只需要 A 兼容 B 或 B 兼容 A 即可
```
interface Animal {
  name: string;
}

interface Cat {
  name: string;
  run(): void;
}

let tom: Cat = {
  name: 'Tom',
  run: () => { console.log('run'); }
};
let animal: Animal = tom;
```
TypeScript 是结构类型系统，类型之间的对比只会比较它们最终的结构，而会忽略它们定义时的关系。
TypeScript 并不关心 Cat 和 Animal 之间定义时是什么关系，而只会看它们最终的结构有什么关系——所以它与 Cat extends Animal 是等价的

#### 双重断言
使用双重断言来将任何一个类型断言为任何另一个类型。除非迫不得已，千万别用双重断言。
```
interface Cat {
  run(): void;
}

interface Fish {
  swim(): void;
}

function testCat(cat: Cat) {
  return (cat as any as Fish);
}
```

#### 类型断言 vs 类型转换
类型断言只会影响 TypeScript 编译时的类型，类型断言语句在编译结果中会被删除。类型断言不是类型转换，它不会真的影响到变量的类型。
```
function toBoolean(something: any): boolean {
  return something as boolean;
}

function toBoolean(something: any): boolean {
  return Boolean(something);
}
```

#### 类型断言 vs 类型声明
```
interface Animal {
    name: string;
}
interface Cat {
    name: string;
    run(): void;
}

const animal: Animal = {
    name: 'tom'
};
let tom = animal as Cat;

let tom: Cat = animal; // error
```
- animal 断言为 Cat，只需要满足 Animal 兼容 Cat 或 Cat 兼容 Animal 即可
- animal 赋值给 tom，需要满足 Cat 兼容 Animal 才行

#### 类型断言 vs 泛型
```
function getCacheData<T>(key: string): T {
    return (window as any).cache[key];
}

interface Cat {
    name: string;
    run(): void;
}

const tom = getCacheData<Cat>('tom');
tom.run();
```

### 声明文件
- declare var 声明全局变量
- declare function 声明全局方法
- declare class 声明全局类
- declare enum 声明全局枚举类型
- declare namespace 声明（含有子属性的）全局对象
- interface 和 type 声明全局类型
- export 导出变量
- export namespace 导出（含有子属性的）对象
- export default ES6 默认导出
- export = commonjs 导出模块
- export as namespace UMD 库声明全局变量
- declare global 扩展全局变量
- declare module 扩展模块
- /// &lt;reference /&gt; 三斜线指令

```
declare var jQuery: (selector: string) => any;

jQuery('#foo');
```
declare var 并没有真的定义一个变量，只是定义了全局变量 jQuery 的类型，仅仅会用于编译时的检查，在编译结果中会被删除。  

通常会把声明语句放到一个单独的文件中。声明文件必需以 .d.ts 为后缀。  
```
// src/jQuery.d.ts
declare var jQuery: (selector: string) => any;

// src/index.ts
jQuery('#foo');
```
一般来说，ts 会解析项目中所有的 *.ts 文件，当然也包含以 .d.ts 结尾的文件。所以当我们将 jQuery.d.ts 放到项目中时，其他所有 *.ts 文件就都可以获得 jQuery 的类型定义了。  

#### 第三方声明文件
推荐使用 @types 统一管理第三方库的声明文件。直接用 npm 安装对应的声明模块即可，以 jQuery 举例：
```
$ npm install @types/jquery --save-dev
```
搜索需要的声明文件: https://microsoft.github.io/TypeSearch/

#### 书写声明文件
当一个第三方库没有提供声明文件时，就需要自己书写声明文件了。在不同的场景下，声明文件的内容和使用方式会有所区别。  

库的使用场景主要有以下几种：
- 全局变量：通过 &lt;script&gt; 标签引入第三方库，注入全局变量
- npm 包：通过 import foo from 'foo' 导入，符合 ES6 模块规范
- UMD 库：既可以通过 &lt;script&gt; 标签引入，又可以通过 import 导入
- 直接扩展全局变量：通过 &lt;script&gt; 标签引入后，改变一个全局变量的结构
- 在 npm 包或 UMD 库中扩展全局变量：引用 npm 包或 UMD 库后，改变一个全局变量的结构
- 模块插件：通过 &lt;script&gt; 或 import 导入后，改变另一个模块的结构

##### 全局变量
全局变量是最简单的一种场景，之前举的例子就是通过 &lt;script&gt; 标签引入 jQuery，注入全局变量 $ 和 jQuery。

使用全局变量的声明文件时，如果是以 npm install @types/xxx --save-dev 安装的，则不需要任何配置。如果是将声明文件直接存放于当前项目中，则建议和其他源码一起放到 src 目录下（或者对应的源码目录下）
```
/path/to/project
├── src
|  ├── index.ts
|  └── jQuery.d.ts
└── tsconfig.json
```
如果没有生效，可以检查下 tsconfig.json 中的 files、include 和 exclude 配置，确保其包含了 jQuery.d.ts 文件。

全局变量的声明文件主要有以下几种语法：
- declare var 声明全局变量
- declare function 声明全局方法
- declare class 声明全局类
- declare enum 声明全局枚举类型
- declare namespace 声明（含有子属性的）全局对象
- interface 和 type 声明全局类型

declare var, declare let, declare const  
使用 let 与使用 var 没有什么区别。使用 declare let 定义的 jQuery 类型，允许修改这个全局变量。使用 const 定义时，表示此时的全局变量是一个常量，不允许再去修改它的值了。  

一般来说，全局变量都是禁止修改的常量，所以大部分情况都应该使用 const 而不是 var 或 let。  
声明语句中只能定义类型，切勿在声明语句中定义具体的实现。


declare function
- declare function 用来定义全局函数的类型
- 在函数类型的声明语句中，函数重载也是支持的
```
// src/jQuery.d.ts
declare function jQuery(selector: string): any;
declare function jQuery(domReadyCallback: () => any): any;

// src/index.ts
jQuery('#foo');
jQuery(function() {
    alert('Dom Ready!');
});
```

declare class
- 当全局变量是一个类的时候，用 declare class 来定义它的类型
- declare class 语句也只能用来定义类型，不能用来定义具体的实现
```
// src/Animal.d.ts
declare class Animal {
    name: string;
    constructor(name: string);
    sayHi(): string;
}
```

declare enum
- 使用 declare enum 定义的枚举类型也称作外部枚举（Ambient Enums）
```
// src/Directions.d.ts
declare enum Directions {
    Up,
    Down,
    Left,
    Right
}

// src/index.ts
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```
Directions.d.ts 仅仅会用于编译时的检查，声明文件里的内容在编译结果中会被删除。它编译结果是：
```
var directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```
其中 Directions 是由第三方库定义好的全局变量。  

declare namespace
- 用来表示全局变量是一个对象，包含很多子属性。
- namespace 是 ts 早期时为了解决模块化而创造的关键字，中文称为命名空间。在早期还没有 ES6 的时候，ts 提供了一种模块化方案，使用 module 关键字表示内部模块。由于后来 ES6 也使用了 module 关键字，ts 为了兼容 ES6，使用 namespace 替代了自己的 module，更名为命名空间。
- 如果对象拥有深层的层级，则需要用嵌套的 namespace 来声明深层的属性的类型。

```
// src/jQuery.d.ts
declare namespace jQuery {
    function ajax(url: string, settings?: any): void;
    const version: number;
    class Event {
        blur(eventType: EventType): void
    }
    enum EventType {
        CustomClick
    }
    namespace fn {
        function extend(object: any): void;
    }
}

// src/index.ts
jQuery.ajax('/api/get_something');
console.log(jQuery.version);
const e = new jQuery.Event();
e.blur(jQuery.EventType.CustomClick);
jQuery.fn.extend({
    check: function() {
        return this.each(function() {
            this.checked = true;
        });
    }
});
```

interface和type  
- 除了全局变量之外，可能有一些类型也希望能暴露出来。在类型声明文件中，可以直接使用 interface 或 type 来声明一个全局的接口或类型。
- 防止命名冲突：暴露在最外层的 interface 或 type 会作为全局类型作用于整个项目中，应该尽可能的减少全局变量或全局类型的数量。故最好将他们放到 namespace 下。
- 声明合并： jQuery 既是一个函数，可以直接被调用 jQuery('#foo')，又是一个对象，拥有子属性 jQuery.ajax()（事实确实如此），那么可以组合多个声明语句，它们会不冲突的合并起来。
```
// src/jQuery.d.ts
declare function jQuery(selector: string): any;
declare namespace jQuery {
    interface AjaxSettings {
        method?: 'GET' | 'POST'
        data?: any;
    }
    function ajax(url: string, settings?: AjaxSettings): void;
}

// src/index.ts
jQuery('#foo');
let settings: jQuery.AjaxSettings = {
    method: 'POST',
    data: {
        name: 'foo'
    }
};
jQuery.ajax('/api/post_something', settings);
```

##### npm包
一般来说，npm 包的声明文件可能存在于两个地方：
- 与该 npm 包绑定在一起。判断依据是 package.json 中有 types 字段，或者有一个 index.d.ts 声明文件。这种模式不需要额外安装其他包，是最为推荐的，所以以后我们自己创建 npm 包的时候，最好也将声明文件与 npm 包绑定在一起。
- 发布到 @types 里。只需要尝试安装一下对应的 @types 包就知道是否存在该声明文件，安装命令是 npm install @types/foo --save-dev。这种模式一般是由于 npm 包的维护者没有提供声明文件，所以只能由其他人将声明文件发布到 @types 里了。

假如以上两种方式都没有找到对应的声明文件，那么我们就需要自己为它写声明文件了。由于是通过 import 语句导入的模块，所以声明文件存放的位置也有所约束，一般有两种方案：
- 创建一个 node_modules/@types/foo/index.d.ts 文件，存放 foo 模块的声明文件。这种方式不需要额外的配置，但是 node_modules 目录不稳定，代码也没有被保存到仓库中，无法回溯版本，有不小心被删除的风险，故不太建议用这种方案，一般只用作临时测试。
- 创建一个 types 目录，专门用来管理自己写的声明文件，将 foo 的声明文件放到 types/foo/index.d.ts 中。这种方式需要配置下 tsconfig.json 中的 paths 和 baseUrl 字段。
目录结构：
```
/path/to/project
├── src
|  └── index.ts
├── types
|  └── foo
|     └── index.d.ts
└── tsconfig.json
```
tsconfig.json 内容：
```
{
    "compilerOptions": {
        "module": "commonjs",
        "baseUrl": "./",
        "paths": {
            "*": ["types/*"]
        }
    }
}
```
如此配置之后，通过 import 导入 foo 的时候，也会去 types 目录下寻找对应的模块的声明文件了。  

npm 包的声明文件主要有以下几种语法：
- "export" 导出变量
- "export namespace" 导出（含有子属性的）对象
- "export default" ES6 默认导出
- "export =" commonjs 导出模块


export

npm 包的声明文件与全局变量的声明文件有很大区别。在 npm 包的声明文件中，使用 declare 不再会声明一个全局变量，而只会在当前文件中声明一个局部变量。只有在声明文件中使用 export 导出，然后在使用方 import 导入后，才会应用到这些类型声明。
```
// types/foo/index.d.ts
export const name: string;
export function getName(): string;
export class Animal {
    constructor(name: string);
    sayHi(): string;
}
export enum Directions {
    Up,
    Down,
    Left,
    Right
}
export interface Options {
    data: any;
}

// src/index.ts
import { name, getName, Animal, Directions, Options } from 'foo';

console.log(name);
let myName = getName();
let cat = new Animal('Tom');
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
let options: Options = {
    data: {
        name: 'foo'
    }
};
```

混用 declare 和 export

使用 declare 先声明多个变量，最后再用 export 一次性导出。
```
// types/foo/index.d.ts
declare const name: string;
declare function getName(): string;
declare class Animal {
    constructor(name: string);
    sayHi(): string;
}
declare enum Directions {
    Up,
    Down,
    Left,
    Right
}
interface Options {
    data: any;
}

export { name, getName, Animal, Directions, Options };
```

export namespace

与 declare namespace 类似，export namespace 用来导出一个拥有子属性的对象:
```
// types/foo/index.d.ts
export namespace foo {
    const name: string;
    namespace bar {
        function baz(): string;
    }
}

// src/index.ts
import { foo } from 'foo';

console.log(foo.name);
foo.bar.baz();
```

export default

在类型声明文件中，export default 用来导出默认值的类型。
```
// types/foo/index.d.ts
export default function foo(): string;

// src/index.ts
import foo from 'foo';

foo();
```
注意，只有 function、class 和 interface 可以直接默认导出，其他的变量需要先定义出来，再默认导出。
```
// types/foo/index.d.ts
export default Directions;

declare enum Directions {
    Up,
    Down,
    Left,
    Right
}
```

export =

在 commonjs 规范中，我们用以下方式来导出一个模块：
```
// 整体导出
module.exports = foo;
// 单个导出
exports.bar = bar;
```
在 ts 中，针对这种模块导出，有多种方式可以导入:
- 第一种方式是 const ... = require：
```
// 整体导入
const foo = require('foo');
// 单个导入
const bar = require('foo').bar;
```
- 第二种方式是 import ... from，注意针对整体导出，需要使用 import * as 来导入：
```
// 整体导入
import * as foo from 'foo';
// 单个导入
import { bar } from 'foo';
```
- 第三种方式是 import ... require，这也是 ts 官方推荐的方式：
```
// 整体导入
import foo = require('foo');
// 单个导入
import bar = foo.bar;
```
对于这种使用 commonjs 规范的库，假如要为它写类型声明文件的话，就需要使用到 export = 这种语法了:
```
// types/foo/index.d.ts
export = foo;

declare function foo(): string;
declare namespace foo {
    const bar: number;
}
```
注意：使用了 export = 之后，就不能再单个导出 export { bar } 了。所以我们通过声明合并，使用 declare namespace foo 来将 bar 合并到 foo 里。

export = 不仅可以用在声明文件中，也可以用在普通的 ts 文件中。实际上，import ... require 和 export = 都是 ts 为了兼容 AMD 规范和 commonjs 规范而创立的新语法

##### UMD库

既可以通过 &lt;script&gt; 标签引入，又可以通过 import 导入的库，称为 UMD 库。相比于 npm 包的类型声明文件，我们需要额外声明一个全局变量，为了实现这种方式，ts 提供了一个新语法 export as namespace。一般使用 export as namespace 时，都是先有了 npm 包的声明文件，再基于它添加一条 export as namespace 语句，即可将声明好的一个变量声明为全局变量
```
// types/foo/index.d.ts
export as namespace foo;
export = foo; // export default foo;

declare function foo(): string;
declare namespace foo {
    const bar: number;
}
```

##### 直接扩展全局变量
有的第三方库扩展了一个全局变量，可是此全局变量的类型却没有相应的更新过来，就会导致 ts 编译错误，此时就需要扩展全局变量的类型。  
比如扩展 String 类型，通过声明合并，使用 interface String 即可给 String 添加属性或方法。
```
interface String {
    prependHello(): string;
}

'foo'.prependHello();
```
也可以使用 declare namespace 给已有的命名空间添加类型声明:
```
// types/jquery-plugin/index.d.ts
declare namespace JQuery {
    interface CustomOptions {
        bar: string;
    }
}

interface JQueryStatic {
    foo(options: JQuery.CustomOptions): string;
}

// src/index.ts
jQuery.foo({
    bar: ''
});
```

##### 在 npm 包或 UMD 库中扩展全局变量
对于一个 npm 包或者 UMD 库的声明文件，只有 export 导出的类型声明才能被导入。所以对于 npm 包或 UMD 库，如果导入此库之后会扩展全局变量，则需要使用另一种语法在声明文件中扩展全局变量的类型，那就是 declare global。使用 declare global 可以在 npm 包或者 UMD 库的声明文件中扩展全局变量的类型。
```
// types/foo/index.d.ts
declare global {
    interface String {
        prependHello(): string;
    }
}

export {};

// src/index.ts
'bar'.prependHello();
```
注意即使此声明文件不需要导出任何东西，仍然需要导出一个空对象，用来告诉编译器这是一个模块的声明文件，而不是一个全局变量的声明文件。

##### 模块插件
ts 提供了一个语法 declare module，它可以用来扩展原有模块的类型。如果是需要扩展原有模块的话，需要在类型声明文件中先引用原有模块，再使用 declare module 扩展原有模块。
```
// types/moment-plugin/index.d.ts
import * as moment from 'moment';

declare module 'moment' {
    export function foo(): moment.CalendarKey;
}

// src/index.ts
import * as moment from 'moment';
import 'moment-plugin';

moment.foo();
```
declare module 也可用于在一个文件中一次性声明多个模块的类型：
```
// types/foo-bar.d.ts
declare module 'foo' {
    export interface Foo {
        foo: string;
    }
}

declare module 'bar' {
    export function bar(): string;
}

// src/index.ts
import { Foo } from 'foo';
import * as bar from 'bar';

let f: Foo;
bar.bar();
```

##### 声明文件中的依赖
除了可以在声明文件中通过 import 导入另一个声明文件中的类型之外，还有一个语法也可以用来导入另一个声明文件，那就是三斜线指令。类似于声明文件中的 import，它可以用来导入另一个声明文件。与 import 的区别是，当且仅当在以下几个场景下，我们才需要使用三斜线指令替代 import：
- 当我们在书写一个全局变量的声明文件时：当我们在书写一个全局变量的声明文件时，如果需要引用另一个库的类型，那么就必须用三斜线指令了
- 当我们需要依赖一个全局变量的声明文件时：当我们需要依赖一个全局变量的声明文件时，由于全局变量不支持通过 import 导入，当然也就必须使用三斜线指令来引入了
```
// types/jquery-plugin/index.d.ts
/// <reference types="jquery" />

declare function foo(options: JQuery.AjaxSettings): string;

// src/index.ts
foo({});
```
注意，三斜线指令必须放在文件的最顶端，三斜线指令的前面只允许出现单行或多行注释。
```
// types/node-plugin/index.d.ts
/// <reference types="node" />

export function foo(p: NodeJS.Process): string;
```
以上两种使用场景下，都是由于需要书写或需要依赖全局变量的声明文件，所以必须使用三斜线指令。在其他的一些不是必要使用三斜线指令的情况下，就都需要使用 import 来导入。  

##### 拆分声明文件
当全局变量的声明文件太大时，可以通过拆分为多个文件，然后在一个入口文件中将它们一一引入，来提高代码的可维护性。比如 jQuery 的声明文件就是这样的：
```
// node_modules/@types/jquery/index.d.ts

/// <reference types="sizzle" />
/// <reference path="JQueryStatic.d.ts" />
/// <reference path="JQuery.d.ts" />
/// <reference path="misc.d.ts" />
/// <reference path="legacy.d.ts" />

export = jQuery;
```
其中用到了 types 和 path 两种不同的指令。它们的区别是：types 用于声明对另一个库的依赖，而 path 用于声明对另一个文件的依赖。

##### 自动生成声明文件
如果库的源码本身就是由 ts 写的，那么在使用 tsc 脚本将 ts 编译为 js 的时候，添加 declaration 选项，就可以同时也生成 .d.ts 声明文件了。可以在命令行中添加 --declaration（简写 -d），或者在 tsconfig.json 中添加 declaration 选项。这里以 tsconfig.json 为例：
```
{
    "compilerOptions": {
        "module": "commonjs",
        "outDir": "lib",
        "declaration": true,
    }
}
```
运行 tsc 之后，目录结构如下:
```
/path/to/project
├── lib
|  ├── bar
|  |  ├── index.d.ts
|  |  └── index.js
|  ├── index.d.ts
|  └── index.js
├── src
|  ├── bar
|  |  └── index.ts
|  └── index.ts
├── package.json
└── tsconfig.json
```
自动生成的声明文件基本保持了源码的结构，而将具体实现去掉了，生成了对应的类型声明。  
除了 declaration 选项之外，还有几个选项也与自动生成声明文件有关:
- declarationDir 设置生成 .d.ts 文件的目录
- declarationMap 对每个 .d.ts 文件，都生成对应的 .d.ts.map（sourcemap）文件
- emitDeclarationOnly 仅生成 .d.ts 文件，不生成 .js 文件

#### 发布声明文件
- 将声明文件和源码放在一起
- 将声明文件发布到 @types 下

##### 将声明文件和源码放在一起
如果声明文件是通过 tsc 自动生成的，那么无需做任何其他配置，只需要把编译好的文件也发布到 npm 上，使用方就可以获取到类型提示了。

如果是手动写的声明文件，那么需要满足以下条件之一，才能被正确的识别：
- 给 package.json 中的 types 或 typings 字段指定一个类型声明文件地址
- 在项目根目录下，编写一个 index.d.ts 文件
- 针对入口文件（package.json 中的 main 字段指定的入口文件），编写一个同名不同后缀的 .d.ts 文件

先识别 package.json 中是否存在 types 或 typings 字段。发现不存在，那么就会寻找是否存在 index.d.ts 文件。如果还是不存在，那么就会寻找是否存在 lib/index.d.ts 文件。假如说连 lib/index.d.ts 都不存在的话，就会被认为是一个没有提供类型声明文件的库

有的库为了支持导入子模块，比如 import bar from 'foo/lib/bar'，就需要额外再编写一个类型声明文件 lib/bar.d.ts 或者 lib/bar/index.d.ts，这与自动生成声明文件类似，一个库中同时包含了多个类型声明文件。

##### 将声明文件发布到 @types 下
与普通的 npm 模块不同，@types 是统一由 DefinitelyTyped 管理的。要将声明文件发布到 @types 下，就需要给 DefinitelyTyped 创建一个 pull-request，其中包含了类型声明文件，测试代码，以及 tsconfig.json 等。

pull-request 需要符合它们的规范，并且通过测试，才能被合并，稍后就会被自动发布到 @types 下。
https://github.com/DefinitelyTyped/DefinitelyTyped#create-a-new-package  

### 内置对象
- ECMAScript的内置对象：Boolean、Error、Date、RegExp 等。
- DOM和BOM的内置对象：Document、HTMLElement、Event、NodeList 等。
- TypeScript核心库的定义文件：https://github.com/Microsoft/TypeScript/tree/master/src/lib
- 用TypeScript写Node.js
Node.js 不是内置对象的一部分，如果想用 TypeScript 写 Node.js，则需要引入第三方声明文件：
```
$ npm install @types/node --save-dev
```

### 类型别名
类型别名用来给一个类型起个新名字。类型别名常用于联合类型。
```
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
```

### 字符串字面量类型
字符串字面量类型用来约束取值只能是某几个字符串中的一个。
```
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
    // do something
}

handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
handleEvent(document.getElementById('world'), 'dblclick'); // 报错，event 不能为 'dblclick'
```

### 元组
数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。  
当直接对元组类型的变量进行初始化或者赋值的时候，需要提供所有元组类型中指定的项。
```
let tom: [string, number];
tom[0] = 'Tom';
tom[1] = 25;

tom[0].slice(1);
tom[1].toFixed(2);

let tom: [string, number];
tom[0] = 'Tom';

let tom: [string, number];
tom = ['Tom', 25];
```
当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型。
```
let tom: [string, number];
tom = ['Tom', 25];
tom.push('male');
tom.push(true);

// Argument of type 'true' is not assignable to parameter of type 'string | number'.
```

### 枚举
枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。
```
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
```
枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射：
```
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true

console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true
```
```
"use strict";
var Days;
(function (Days) {
    Days[Days["Sun"] = 0] = "Sun";
    Days[Days["Mon"] = 1] = "Mon";
    Days[Days["Tue"] = 2] = "Tue";
    Days[Days["Wed"] = 3] = "Wed";
    Days[Days["Thu"] = 4] = "Thu";
    Days[Days["Fri"] = 5] = "Fri";
    Days[Days["Sat"] = 6] = "Sat";
})(Days || (Days = {}));
;
```

#### 手动赋值
```
enum Days {Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 7); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true
```
未手动赋值的枚举项会接着上一个枚举项递增。如果未手动赋值的枚举项与手动赋值的重复了，TypeScript 是不会察觉到这一点的：
```
enum Days {Sun = 3, Mon = 1, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 3); // true
console.log(Days["Wed"] === 3); // true
console.log(Days[3] === "Sun"); // false
console.log(Days[3] === "Wed"); // true
```
手动赋值的枚举项可以不是数字:
```
enum Days {Sun = 7, Mon, Tue, Wed, Thu, Fri, Sat = <any>"S"};
enum Days {Sun = 7, Mon, Tue, Wed, Thu, Fri, Sat = "S"};
```
手动赋值的枚举项也可以为小数或负数，此时后续未手动赋值的项的递增步长仍为 1：
```
enum Days {Sun = 7, Mon = 1.5, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 7); // true
console.log(Days["Mon"] === 1.5); // true
console.log(Days["Tue"] === 2.5); // true
console.log(Days["Sat"] === 6.5); // true
```

#### 常数项和计算所得项
枚举项有两种类型：常数项（constant member）和计算所得项（computed member）。
```
enum Color {Red, Green, Blue = "blue".length};
```
如果紧接在计算所得项后面的是未手动赋值的项，那么它就会因为无法获得初始值而报错：
```
enum Color {Red = "red".length, Green, Blue};

// index.ts(1,33): error TS1061: Enum member must have initializer.
// index.ts(1,40): error TS1061: Enum member must have initializer.
```

当满足以下条件时，枚举成员被当作是常数：
- 不具有初始化函数并且之前的枚举成员是常数。在这种情况下，当前枚举成员的值为上一个枚举成员的值加 1。但第一个枚举元素是个例外。如果它没有初始化方法，那么它的初始值为 0。
- 枚举成员使用常数枚举表达式初始化。常数枚举表达式是 TypeScript 表达式的子集，它可以在编译阶段求值。当一个表达式满足下面条件之一时，它就是一个常数枚举表达式：
  - 数字字面量
  - 引用之前定义的常数枚举成员（可以是在不同的枚举类型中定义的）如果这个成员是在同一个枚举类型中定义的，可以使用非限定名来引用
  - 带括号的常数枚举表达式
  - +, -, ~ 一元运算符应用于常数枚举表达式
  - +, -, *, /, %, <<, >>, >>>, &, |, ^ 二元运算符，常数枚举表达式做为其一个操作对象。若常数枚举表达式求值后为 NaN 或 Infinity，则会在编译阶段报错
所有其它情况的枚举成员被当作是需要计算得出的值。

#### 常数枚举
常数枚举是使用 const enum 定义的枚举类型：
```
const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```
常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。
```
// 编译结果
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];

const enum Color {Red, Green, Blue = "blue".length};
// index.ts(1,38): error TS2474: In 'const' enum declarations member initializer must be constant expression.
```

#### 外部枚举
外部枚举（Ambient Enums）是使用 declare enum 定义的枚举类型：
```
declare enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```
declare 定义的类型只会用于编译时的检查，编译结果中会被删除。上例的编译结果是：
```
var directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```
外部枚举与声明语句一样，常出现在声明文件中。同时使用 declare 和 const 也是可以的：
```
declare const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```
编译结果：
```
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
```








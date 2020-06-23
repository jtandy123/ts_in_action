# TypeScript

## Basic Types
- Boolean
- Number
- String
- Array
- Tuple
- Enum
- Any
- Void
- Null and Undefined
- Never
- Object
- Type assertions

## Variable Declarations
- let declarations (block-scoping, temporal dead zone, re-declarations, shadowing)
- const declarations
- let vs. const
- Destructuring
- Spread

object spread limits:
- 仅包括对象的自己的可枚举属性，即当spread一个对象的实例的时候，将丢失方法
- TypeScript编译器不允许从泛型函数扩展类型参数。

## Interfaces
- Optional Properties
- Readonly properties (ReadonlyArray<T>)
- Excess Property Checks
- Function Types (call signature)
- Indexable Types (index signature: string and number)  
  - TypeScript支持两种索引签名：字符串和数字。 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。 这是因为当使用 number来索引时，JavaScript会将它转换成string然后再去索引对象。 也就是说用 100（一个number）去索引等同于使用"100"（一个string）去索引，因此两者需要保持一致。  
  - 可以将索引签名设置为只读，防止给索引赋值
- Class Types (Implementing an interface)
  - 接口描述了类的公共部分，而不是公共和私有两部分。它不会帮你检查类是否具有某些私有成员
  - the static and instance of classes
    - 类具有两个类型：静态部分的类型和实例的类型。
    - 当一个类实现了一个接口时，只对其实例部分进行类型检查。constructor存在于类的静态部分，所以不在检查的范围内。因此应该直接操作类的静态部分。定义两个接口，一个为构造函数所用，一个为实例方法所用。
- Extending Interfaces (接口继承接口)
- Hybrid Types (一个对象可以同时作为函数和对象使用，并带有额外的属性)
- Interfaces Extending Classes  
当接口继承了一个类类型时，它会继承类的成员但不包括其实现。 就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。 接口同样会继承到类的private和protected成员。 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现。  
```
class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}

class TextBox extends Control {
    select() { }
}
```
在Control类内部，是允许通过SelectableControl的实例来访问私有成员state的。 实际上， SelectableControl接口和拥有select方法的Control类是一样的。Button和TextBox类是SelectableControl的子类（因为它们都继承自Control并有select方法）

## Classes
- Inheritance
- Public, private, and protected modifiers

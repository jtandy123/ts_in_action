/*
abstract class Animal {
  eat() {
    console.log('eat')
  }
  abstract sleep(): void
}

class Dog extends Animal {
  // public: 默认项，表明类可以被实例化，可以被继承
  // private: 表明类不能被实例化，不能被继承
  // protected: 表明类不能被实例化，只能被继承
  constructor(name: string) {
    super()
    this.name = name
  }
  public name: string // 默认为public，属性挂在类的实例上
  run() {} // 方法挂在类的原型上
  private pri() {} // 私有成员只能被类本身调用，而不能被类的实例和子类调用
  protected pro() {}
  readonly legs: number = 4 // 只读属性一定要被初始化，且不可修改
  static food: string = 'bones' // 只能通过类名来调用，可以被继承
  sleep() {
    console.log('dog sleep')
  }
}

console.log(Dog.prototype)
let dog = new Dog('wangwang')
dog.eat()
console.log(dog)
// dog.pri()
// dog.pro()
console.log(Dog.food)

class Husky extends Dog {
  constructor(name: string, public color: string) {
    super(name)
    this.color = color;
    // this.pri()
    this.pro()
  }
  // color: string
}
console.log(Husky.food)

class Cat extends Animal {
  constructor() {
    super()
  }

  sleep() {
    console.log('Cat sleep')
  }
}

let cat = new Cat()

let animals: Animal[] = [dog, cat]
animals.forEach(i => {
  i.sleep()
})


class WorkFlow {
  sleep1() {
    return this
  }

  sleep2() {
    return this
  }
}
new WorkFlow().sleep1().sleep2()

class MyFlow extends WorkFlow {
  next() {
    return this
  }
}
new MyFlow().next().sleep1().sleep2() 
*/

class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return 'Hello, ' + this.greeting;
  }
}

const greet = new Greeter('world');
console.log(greet.greet());

class Animal {
  name: string;
  constructor(theName: string) {
    this.name = theName;
  }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}`);
  }
}

class Snake extends Animal {
  constructor(name: string) {
    super(name);
  }
  move(distanceInMeters = 5) {
    console.log('Slithering...');
    super.move(distanceInMeters);
  }
}

class Horse extends Animal {
  constructor(name: string) {
    super(name);
  }
  move(distanceInMeters = 45) {
    console.log('Galloping...');
    super.move(distanceInMeters);
  }
}

let sam = new Snake('Sammy the Python');
let tom: Animal = new Horse('Tommy the Palomino');

sam.move();
tom.move(34);



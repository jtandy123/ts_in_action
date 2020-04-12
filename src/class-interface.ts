interface Human {
  // new (name: string): void; // 接口不能约束类的构造函数
  name: string;
  eat(): void;
}

// 类实现接口时，必须实现接口中声明的所有属性
class Asian implements Human {
  constructor(name: string) {
    this.name = name;
  }
  name: string; // 接口只能约束类的公有成员
  eat() {};
  sleep() {};
}

// 接口可以继承多个接口
interface Man extends Human {
  run(): void;
}

interface Child {
  cry(): void;
}

interface Boy extends Man, Child {}

let boy: Boy = {
  name: '',
  run() {},
  eat() {},
  cry() {}
}

// 接口继承类, 会抽象出类中的属性，包括公有属性、私有属性和保护属性
class Auto {
  state = 1;
  private state2 = 0;
  private test() {}
}

interface AutoInterface extends Auto {}

// class C implements AutoInterface {
//   state = 1
// }

class Bus extends Auto implements AutoInterface {
  run() {
    // super.test();
  }
}

let bus = new Bus();
// console.log(bus.state2);
console.log(Bus.prototype);
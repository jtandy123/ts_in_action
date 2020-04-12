let never1 = function err(): never {
  throw Error('something failed');
}

let never2 = function fail() {
  return never1();
}

never2 = never1;

// let num1: number = never1;
// let str1: string = never1;
// let bool1: boolean = never1;
// let void1: void = never1;
let obj1: Object = never1;
let any1: any = 1;
never2 = any1;
any1 = never1;
// never2 = obj1;
// never2 = void1;

// let un1: undefined = never1;
// let nu1: null = never1;

// never2 = undefined;
// never2 = null;


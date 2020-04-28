function foo() {
  return a2;
}

console.log(foo());

let a2: any;

function sumMatrix(matrix: number[][]) {
  let sum = 0;
  for (let i = 0; i < matrix.length; i++) {
    var currentRow = matrix[i];
    for (let i = 0; i < currentRow.length; i++) {
      sum += currentRow[i];
    }
  }
  return sum;
}

console.log(sumMatrix([[1, 2], [3, 4, 5]]));

let t: [number, string, boolean] = [7, 'hello', true];
let [d, k, i] = t;

type C = { a: string, b?: number};
function fu({a, b}: C): void {
  console.log(a, b);
}

class D {
  p = 12;
  m() {
  }
}

let g = new D();
let clone = {...g};
console.log(clone.p);
// console.log(clone.m());
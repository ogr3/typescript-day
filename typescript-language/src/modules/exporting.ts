// Man kan exportera funktioner
export function func1(): number {
  return 42;
}

// ... interface
export interface IF {
  kaka: number;
}

// klasser
export class Banan {
  zz = 'hepp';
}

// ...konstanter och variable
export const PI = 3.14;
export let globalState = 42;


class Bugaloo {
  bulle = 12;
}

// Export statements
// Exportera deklarerad klass
export {Bugaloo};

// Ge alias för exporterad deklaration
export {Bugaloo as Bulle};
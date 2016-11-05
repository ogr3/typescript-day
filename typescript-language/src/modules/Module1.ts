// All things can be expoerted
export function func1(): number {
  return 42;
}

export interface IF {
  kaka: number;
}

export class Banan {
  zz = 'hepp';
}

export const PI = 3.14;

class Bugaloo {
  bulle = 12;
}

// Export statements
export {Bugaloo};
export {Bugaloo as Bulle};
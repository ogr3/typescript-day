import {expect} from "chai";
import {Hello} from "./Hello";
import "mocha";


describe("Typescript", () => {
  it("Se till att mocha och chai snurrar", () => {
    expect(true).to.equal(true);
  });

  it("should handle basic types", () => {
    const aNumber: number = 2;
    const aString: string = 'strängen';
    const aTemplateString: string = `En sträng på ${aNumber}
rader`;
    console.log(aTemplateString);

    const anArray: number[] = [1, 2, 3, 4];
    const aTuple: [number, string] = [1, 'två'];
    enum Bageri {
      KAKA, BAKA, DEG
    };
    const anEnum: Bageri = Bageri.KAKA;
  });

  it("should demonstrate import classes", () => {
    const hello: Hello = new Hello();
    expect(hello.greeting('Joel')).to.equal('Hello there, Joel');
  });

  it("should demonstrate generators which return values", () => {
    function* g(): Iterator<number> {
      let index = 0;
      while (true) {
        yield index++;
      }
    }

    // Alternativ 1
    let iterator = g();
    expect(iterator.next().value).to.equal(0);
    expect(iterator.next().value).to.equal(1);

    // Alternativ 2
    let i = 0;
    for (let x in g()) {
      expect(x).to.equal(i);
      i++;
    }
  });

  it("should demonstrate async/await", () => {
    Promise.resolve(123).then(x => console.log('x:',x));
    const fetchSomething = () => new Promise((resolve) => {
      setTimeout(() => {
        resolve('future value');
      }, 1);
    });

    async function asyncFunction() {
      const result = await fetchSomething(); // returns promise; await only allowed in async functions
      // waits for promise and uses promise result
      return result + ' 2';
    }

    asyncFunction().then(result => console.log(result));
  });

  it("should demonstrate generators which consume values", () => {
    function* g(): Iterator<number> {
      let sum = 0;
      while (true) {
        let x = yield;
        if (x === undefined) return sum;
        sum += x;
      }
    }

    let iterator = g();
    iterator.next();
    iterator.next(42);
    iterator.next(34);
    expect(iterator.next().value).to.equal(42 + 34);
  });

});

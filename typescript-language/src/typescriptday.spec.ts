import {expect} from "chai";
import "mocha";


describe("Typescript", () => {
  it("Se till att mocha och chai snurrar", () => {
    expect(true).to.equal(true);
  });

  describe("Bastyper", ()=> {
    it("number (för både heltal och flyttal)", () => {
      const aNumber: number = 2;
      expect(aNumber).to.equal(2);
      const anotherNumber = Number(3);
      expect(anotherNumber).to.equal(3);
      const pi: number = 3.14;
      expect(anotherNumber).to.equal(3);

      // number är ett objekt med metoder
      expect(pi.toFixed(0)).to.equal('3');
    });

    it("string", () => {
      const aString: string = 'strängen';
      // även string har metoder
      expect(aString.substr(3)).to.equal('ängen');
    });

    it("template string (back ticks)", () => {
      const aNumber: number = 2;
      // Stödjer radbrytning och inbäddade uttryck (${...})
      const aTemplateString: string = `En sträng på ${aNumber}
rader`;
      expect(aTemplateString).to.equal('En sträng på 2\nrader');
    });

    it("typad array", () => {
      const anArray: number[] = [1, 2, 3, 4];
    });

    it("Typescript har tuple", () => {
      const aTuple: [number, string] = [1, 'två'];
    });

    it("enum", () => {
      enum Bageri {
        KAKA, BAKA, DEG
      }
      const anEnum: Bageri = Bageri.KAKA;
      // Ta reda på strängvärd
      expect(Bageri[Bageri.KAKA]).to.equal('KAKA');
    });

    it("any funkar som vanlig javascriptvariabel, helt otypad", () => {
      let blob: any = {kaka: 123};
      blob = 'kaka';
      blob = 123;
    });

    it("void", ()=> {
      // Används såklart för funktioner
      function nada(): void {
      }

      // Men variabler kan ha typen med endast ha värdet undefined eller null
      let cannotHaveValue: void = undefined;
      cannotHaveValue = null;
    });

    it("null och undefinded", ()=> {
      // Null och undefined är typer, men variabler med dessa typer är begränsade till dessa värden.
      let x: undefined = undefined;
      let y: null = null;

      // Null och undefined är sub-typer till alla andra typer, vilket gör att null och undefined kan tilldelas som
      // värde till referenser till alla andra typer.
    });

    it("never", ()=> {
      // Representerar värden som aldrig kan förekomma
      function error(message: string): never {
        throw new Error(message);
      }
    });

    it("type assertion (aka type casting)", ()=> {
      const myString:string = 'string';
      // Använd för att type casta
      let a = (<string>myString);
      let b = (myString as string);
      // kompilerar ej (<number>myString);
    });
  });

  describe("Variabeldeklarationer", () => {
    it("let ist.f var", () => {
      function varIsBad() {
        x = 22; // Kan tilldelas innan deklaration
        var x:number;
        expect(x).to.equal(22);

        if (true) {
          // skapar ingen ny variabel, refererar till föregående
          var x:number = 33;
        }

        // det man tror är scope-lokalt är egentligen den yttre variabeln
        expect(x).to.equal(33);
      }

      function letIsGood() {
        // x = 22; kan inte tilldelas innan deklaration
        let x:number = 22;
        expect(x).to.equal(22);

        if(true) {
          // privat i scopet
          let x:number = 33;
          expect(x).to.equal(33);
        }

        // Nu funkar det som man förväntar sig
        expect(x).to.equal(22);
      }
      varIsBad();
      letIsGood();
    });

    it("const",() => {
      const a = 'en sträng';

      // a = 'byt sträng'; det går ej att tilldela
    });

    it("array destructuring", () => {
      const anArray = ['baka','kaka','deg','apa'];
      // Extrahera element 0 till symbolen 'aaa' och element 3 till symbolen 'bbb'
      const [aaa,,bbb] = anArray;
      expect(aaa).to.equal('baka');
      expect(bbb).to.equal('deg');

      // Extrahera element 0 till symbolen 'head' och arayen som utgörs av element 1 och framåt till 'tail'
      const [head,...tail] = anArray;
      expect(head).to.equal('baka');
      expect(tail).to.eql(['kaka','deg','apa']);

    });
    it("object destructuring", () => {
      const anObject = {
        a:'foo',
        b:12,
        c:'bar'
      };

      // Extrahera property a och b till motsvarande symboler
      const {a,b} = anObject;
      expect(a).to.equal('foo');
      expect(b).to.equal(12);

      // Extrahera property a till symbolen 'apa' och property b till symbolen 'banan
      const {a:apa,b:banan} = anObject;
      expect(apa).to.equal('foo');
      expect(banan).to.equal(12);
    });
  });

  it("should demonstrate import classes", () => {
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
    Promise.resolve(123).then(x => console.log('x:', x));
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

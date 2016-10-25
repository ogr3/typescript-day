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
      const myString: string = 'string';
      // Använd för att type casta
      const a: string = <string>myString;
      const b: string = myString as string;
      // kompilerar ej: (<number>myString);
    });
  });

  describe("Variabeldeklarationer", () => {
    it("let ist.f var", () => {
      function varIsBad() {
        x = 22; // Kan tilldelas innan deklaration
        var x: number;
        expect(x).to.equal(22);

        if (true) {
          // skapar ingen ny variabel, refererar till föregående
          var x: number = 33;
        }

        // det man tror är scope-lokalt är egentligen den yttre variabeln
        expect(x).to.equal(33);
      }

      function letIsGood() {
        // x = 22; kan inte tilldelas innan deklaration
        let x: number = 22;
        expect(x).to.equal(22);

        if (true) {
          // privat i scopet
          let x: number = 33;
          expect(x).to.equal(33);
        }

        // Nu funkar det som man förväntar sig
        expect(x).to.equal(22);
      }

      varIsBad();
      letIsGood();
    });

    it("const", () => {
      const a = 'en sträng';

      // a = 'byt sträng'; det går ej att tilldela
    });

    it("array destructuring", () => {
      const anArray = ['baka', 'kaka', 'deg', 'apa'];
      // Extrahera element 0 till symbolen 'aaa' och element 3 till symbolen 'bbb'
      const [aaa,,bbb] = anArray;
      expect(aaa).to.equal('baka');
      expect(bbb).to.equal('deg');

      // Extrahera element 0 till symbolen 'head' och arayen som utgörs av element 1 och framåt till 'tail'
      const [head,...tail] = anArray;
      expect(head).to.equal('baka');
      expect(tail).to.eql(['kaka', 'deg', 'apa']);

    });
    it("object destructuring", () => {
      const anObject = {
        a: 'foo',
        b: 12,
        c: 'bar',
        d: {
          e: 'hepp'
        }
      };

      // Extrahera property a, b och e till motsvarande symboler
      const {a, b, d:{e}} = anObject;
      expect(a).to.equal('foo');
      expect(b).to.equal(12);
      expect(e).to.equal('hepp');

      // Extrahera property a till symbolen 'apa' och property b till symbolen 'banan
      const {a:apa, b:banan} = anObject;
      expect(apa).to.equal('foo');
      expect(banan).to.equal(12);
    });
  });

  describe("Interface", ()=> {
    it("shape", ()=> {
      // Typescript utgår först och främst i att beskriva formen/strukturen på saker, s.k
      // "duck-typing". Man kan t.ex ange typen på en variabel eller parameter enligt nedan
      let x: {a: number,f(): void};
      x = {
        a: 23, f(){
        }
      };
      // Men inte
      //x = {a:23};
      function g(p: {z: string,u: number}): string {
        return p.z + '-' + p.u;
      }

      g({z: 'banan', u: 23});
      // Men inte
      // g({u:23})
    });

    it("interface", ()=> {
      // Interface namnger dessa strukturer på samma sätt som Java
      interface X {
        a: number;
        f(): void;
      }

      let x: X;
      x = {
        a: 23, f(){
        }
      };
    });

    it("optional properties", ()=> {
      // För att stödja existerande mönster i javascript tillåts att
      // fält är icke-obligatoriska
      interface X {
        a?: number;
        f(): void;
      }

      // Nu är det OK att utelämna 'a'
      let x: X = {
        f(){
        }
      };
    });

    it("readonly properties", () => {
      // readonly properties kan endast tilldelas vid konstruktion
      interface X {
        readonly a: number;
      }

      let x: X = {a: 23};
      // x.a = 42; Ej tillåtet

    });

    it("function types", ()=> {
      // Man kan deklarera interface för en funktion enligt följande.
      interface NumberTransformer {
        (x: number): number;
      }

      const doubleUp: NumberTransformer = a => a * 2;
      expect(doubleUp(2)).to.equal(4);

      // Användbart när man skall använda FP-möster där man skickar
      // funktioner som parametrar eller returvärde:
      function g(z: number, t: NumberTransformer): string {
        return 'g = ' + t(z);
      }

      const square = x => x * x; // Notera att typen NumberTransformer och typen för x infereras från sammanhanget
      expect(g(3, square)).to.equal('g = 9');

      // eller:
      function add(z: number): NumberTransformer {
        return (x) => z + x;
      }

      const add3: NumberTransformer = add(3);
      expect(add3(4)).to.equal(7);
    });

    it("indexerbara typer", () => {
      // Typer som man kan indexera i, t.ex a[0] och b['kaka'] uttrycks enligt följande:
      interface StringArray {
        // Ange att StringArray är indexerbar med number och elementtypen är string
        [index: number]: string;
      }

      const a: StringArray = ['kaka', 'baka'];
      expect(a[0]).to.equal('kaka');
      // a[10] = 12; error!

      // OBS 1: ej detsamma som array:
      // a.length kompilerar ej!

      // OBS 2: endast number och string kan användas som index

      // OBS 3: alla fält måste vara av samma typ som indextypen:
      interface DateDictionary {
        [key: string]: Date;
        // name:string; error!
        createdAt: Date;
      }

      const d: DateDictionary = {createdAt: new Date()};
      d['kaka'] = new Date();
    });

    it("kontrakt för klasser", () => {
      interface Clock {
        currentTime: Date;
        setTime(d: Date):void;
      }

      class MyClock implements Clock {
        currentTime: Date; // publik per default

        setTime(d: Date) {
          this.currentTime = d;
        }

        constructor(d: Date) {
          this.currentTime = d;
        }
      }

      const now = new Date(); // Type på now infereras från konstruktoranrop
      const c: Clock = new MyClock(now);
      expect(c.currentTime).to.equal(now);

    });

    it("hybridtyper", () => {
      // Eftersom javascript har möjlighet att skapa objekt som både agerar funktion och objekt
      // kan även detta uttryckas
      interface Logger {
        (message: string): void;
        prefix: string;
        blankLine(): void;
      }

      function createLogger(logBuffer: string[]): Logger {
        const logger: Logger = <Logger>function (msg: string) {
          logBuffer.push(logger.prefix + msg);
        };
        logger.prefix = '[zzz]: ';
        logger.blankLine = () => logBuffer.push('\n');
        return logger;
      }

      const logBuf = [];
      const log = createLogger(logBuf);
      log('kaka');
      log.blankLine();
      log('banan');
      expect(logBuf).to.eql(['[zzz]: kaka', '\n', '[zzz]: banan']);
    });

    it("interface som ärever från class", () => {
      // Ett interface kan ärva från klass och ärver då dess medlemmar
      // men ej immplementation.
      class A {
        b:number;
        kaka():void {
          this.b = 12;
        }
      }

      interface B extends A {
        banan():void;
      }

      class C implements B {
        b: number;

        kaka(): void {
        }

        banan(): void {
        }
      }

      // Även privata och protected medlemmer ärvs, men då kan
      // interfacet endast implementeras av denna klass eller dess
      // subklasser.
      //
      class X {
        private a:number;
        doIt():void {this.a = 42}
      }

      interface Y extends X {
        stuff():void;
      }

      // Detta går inte eftersom a är privat i X
      // class Z implements Y {
      //   private a: number;
      //   doIt(): any {
      //     return null;
      //   }
      // }
      // Däremot går det bra med (vad nu arvet Y <- X ska vara bra för?):
      class Z extends X implements Y {
        stuff(): void {
        }
      }
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
    const iterator = g();
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

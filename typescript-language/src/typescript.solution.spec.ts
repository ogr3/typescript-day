import {expect} from "chai";

describe("Typescript", () => {
  it("Se till att mocha och chai snurrar", () => {
    expect(true).to.equal(true);
  });

  describe("var, let och const", () => {
    it("Demonstrera problemen med var: Function scoping", () => {
      function stumble() {
        a = 1; // Kan tilldelas innan deklaration
        var a = 2; // Ingen varning, alla 'a' refererar till samma variabel
        var a = 123;

        if (true) {
          // Den här tror man är lokal, men egentligen är det detsamma som 'a' ovanför
          var a = 99;
        }

        expect(a).to.equal(99); // Inte vad man förväntar sig
      }

      stumble();

    });

    it("Demonstrera problemen med var: Capturing", () => {
      function stumble() {
        var funcs = [];

        // skapa funktioner som man tror skall returnera räknarvärdet
        for (var i = 0; i < 3; i++) {
          funcs.push(function () {
            return i;
          });
        }
        // Man skulle nu förvänta sig att stumbles[0]() = 0, stumbles[0]() = 1, stumbles[0]() = 2
        // men stället:
        expect(funcs[0]()).to.equal(3); // Inte vad man förväntar sig
        expect(funcs[1]()).to.equal(3); // Inte vad man förväntar sig
        expect(funcs[2]()).to.equal(3); // Inte vad man förväntar sig
      }

      stumble();

    });

    it("let ist.f var", () => {
      // Fr.o.m ES6 tillkommer 'let' som ger ett mer säkert och intuitivt beteende.
      // I ES6 får man runtime-fel, TS ger kompileringsfel.
      // 'var' finns kvar med existerande beteende för att bevara bakåtkompatibilitet.

      function letIsGood() {
        // x = 22; // prova att inkludera detta i koden; kompileringsfel: 'x' kan inte tilldelas innan deklaration
        let x: number = 22;
        // let x: number = 99; // prova att inkludera detta i koden; kompileringsfel: 'x' kan inte omdeklareras
        expect(x).to.equal(22);

        if (true) {
          // privat i scopet
          let x: number = 33;
          expect(x).to.equal(33);
        }

        var funcs = [];

        // skapa funktioner som man tror skall returnera räknarvärdet
        for (let i = 0; i < 3; i++) {
          funcs.push(function () {
            return i;
          });
        }

        // Nu funkar det som man förväntar sig
        expect(x).to.equal(22);
        expect(funcs[0]()).to.equal(0); // Inte vad man förväntar sig
        expect(funcs[1]()).to.equal(1); // Inte vad man förväntar sig
        expect(funcs[2]()).to.equal(2); // Inte vad man förväntar sig
      }

      letIsGood();

      // Kort sagt: använd alltid 'let' om en variabel skall kunna uppdateras (annars använd 'const'); använd _aldrig_ 'var'.

    });

    it("const", () => {
      // Fr.o.m ES6 tillkommer 'const' för att deklarera read-only variabel.
      // I ES6 får man runtime-fel, TS ger kompileringsfel.
      const a = 'en sträng';

      // a = 'byt sträng'; // prova att inkludera detta i koden; kompileringsfel: 'a' kan ej uppdateras
    });

  });

  describe("Bastyper", () => {
    it("TS har typinferens", () => {
      let a = 1; // 'a' är ett number
      let b = 'en sträng'; // 'b' är en sträng

      // a = b; // prova att inkludera detta i koden; kompileringsfel: 'a' som är ett number kan ej tilldelas en string
    });

    it("TS har boolean", () => {
      const aBool: boolean = true;
    });

    it("TS har number (för både heltal och flyttal)", () => {
      const aNumber: number = 2;
      const anotherNumber: number = Number(3);
      const pi: number = 3.14;

      // number är ett objekt med metoder, se javascript Number (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
      expect(pi.toFixed(0)).to.equal('3');
    });

    it("TS har string", () => {
      const aString: string = 'strängen';
      // även string har metoder (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
      expect(aString.substr(3)).to.equal('ängen');
    });

    it("TS har template string (back ticks)", () => {
      const aNumber: number = 2;
      // Stödjer radbrytning och inbäddade uttryck (${...})
      const aTemplateString: string = `En sträng på ${aNumber}
rader`;
      expect(aTemplateString).to.equal('En sträng på 2\nrader');
    });

    it("TS har typad array", () => {
      const anArray: number[] = [1, 2, 3, 4];
      const anotherArray: Array<number> = [4, 3, 2, 1];
      // const thirdArray:number[] = ['kaka','baka']; // prova att inkludera detta i koden; kompileringsfel: number kan ej tilldelas en string
    });

    it("Javascripts standardiserade inbyggda objekt", () => {
      const regexp: RegExp = /abc.*/;
      const f: Function = () => 123;
      const d: Date = new Date();
      const m: Map<Date, number> = new Map<Date, number>(); // Map, Set, etc stöds endast i ES6-kompatibla runtimes
      var date = new Date(123); // OBS! Map kräver ===-likhet
      m.set(date, 42);
      expect(m.get(date)).to.equal(42);

      // Se mer på https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
    });

    it("TS har tuple", () => {
      const aTuple: [number, string] = [1, 'två'];

      // aTuple[0] = 'aString'; // prova att inkludera detta i koden; kompileringsfel: ett number kan inte tilldelas en string
    });

    it("TS har enum", () => {
      enum Bageri {
        KAKA, BAKA, DEG
      }
      const anEnum: Bageri = Bageri.KAKA;
      // Översätts till heltal
      expect(Bageri.KAKA).to.equal(0);
      // Ta reda på strängvärde
      expect(Bageri[Bageri.KAKA]).to.equal('KAKA');

      // Man kan ange egna värden
      enum Bakery {
        COOKIE = 12,
        BAKE = 34,
        DOW = 56 * 42
      }

      expect(Bakery.DOW).to.equal(56*42);
    });

    it("any funkar som vanlig javascriptvariabel, helt otypad", () => {
      let blob: any = {kaka: 123};
      blob = 'kaka';
      blob = 123;

      // Dessutom kan man stoppa in any på vad som helst
      const d: Date = blob;

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
      // const c = (<number>myString); // prova att inkludera detta i koden; kompileringsfel: string kan ej konverteras till number
    });
  });

  describe("Variabeldeklarationer", () => {
    it("TS stödjer destrukturering av arrayer", () => {
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

    it("TS stödjer destrukturering av objekt", () => {
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

  describe("Interface", () => {
    it("shape", ()=> {
      // Typescript utgår först och främst i att beskriva formen/strukturen på saker, s.k
      // "duck-typing". Man kan t.ex ange typen på en variabel eller parameter enligt nedan
      let x: {a: number,f(): void};
      x = {
        a: 23,
        f(){
        }
      };
      // Men inte
      //x = {a:23}; // prova att inkludera detta i koden; kompileringsfel: objektet saknar 'f'
      // Inte heller
      //x = {a:23, f:34}; // prova att inkludera detta i koden; kompileringsfel: 'f' har fel typ

      // I funktionssignaturer
      function g(p: {z: string,u: number}): string {
        return p.z + '-' + p.u;
      }

      g({z: 'banan', u: 23});
      // Men inte
      //g({u:23}) ; // prova att inkludera detta i koden; kompileringsfel: objektet saknar 'z'
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
      //x.a = 42; ; // prova att inkludera detta i koden; kompileringsfel: får ej tilldela read-only props

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
      expect(g(3, square)).to.equal('g = 9'); // I detta fall infererar kompilatorn att 'square' är en NumberTransformer och att 'x' är number

      // eller:
      function add(z: number): NumberTransformer {
        return (x) => z + x;
      }

      const add3 = add(3);
      expect(add3(4)).to.equal(7);
    });

    it("indexerbara typer", () => {
      // Typer som man kan indexera i, t.ex a[0] (arrayish) och b['kaka'] (javascript objectish)
      // uttrycks enligt följande:
      interface StringArray {
        // Ange att StringArray är indexerbar med number och elementtypen är string
        [index: number]: string;
      }

      const a: StringArray = ['kaka', 'baka'];
      expect(a[0]).to.equal('kaka');
      // a[10] = 12; // prova att inkludera detta i koden; kompileringsfel: kan inte tilldela number till string

      // OBS 1: ej detsamma som array:
      // const l = a.length; // prova att inkludera detta i koden; kompileringsfel: 'length' existerar ej!

      // OBS 3: alla fält måste vara av samma typ som indextypen:
      interface DateDictionary {
        [key: string]: Date;
        // name:string; error!
        createdAt: Date;
      }

      const d: DateDictionary = {createdAt: new Date()};
      d['kaka'] = new Date();

      // OBS 2: endast number och string kan användas som index
      // prova att inkludera detta i koden; kompileringsfel: indextyp måste vara string eller number
      // interface DateToNumberDictionary {
      //   [key:Date]:number;
      // }

    });

    it("kontrakt för klasser", () => {
      // Interface används såklart som kontrakt för en klass
      interface Clock {
        currentTime: Date;
        setTime(d: Date): void;
      }

      class MyClock implements Clock {
        currentTime: Date;

        setTime(d: Date) {
          this.currentTime = d;
        }

        constructor(d: Date) {
          this.currentTime = d;
        }
      }

      const now = new Date();
      const c: Clock = new MyClock(now);
      expect(c.currentTime).to.equal(now);

    });

    it("hybridtyper", () => {
      // Eftersom javascript har möjlighet att skapa objekt som både agerar funktion och objekt
      // kan även detta uttryckas
      interface Logger {
        (message: string): void;
        type: string;
        blankLine(): void;
      }

      function createLogBufLogger(logBuffer: string[]): Logger {
        const logger: Logger = <Logger>function (msg: string) {
          // OBS this är inte funktionsobjektet i denna funktion, så man kan inte komma åt t.ex
          // 'this.type'
          logBuffer.push(msg);
        };
        logger.type = 'LogBuf logger';
        logger.blankLine = () => logBuffer.push('\n');
        return logger;
      }

      const logBuf = [];
      const log = createLogBufLogger(logBuf);
      log('kaka');
      log.blankLine();
      log('banan');
      expect(logBuf).to.eql(['kaka', '\n', 'banan']);
      expect(log.type).to.eql('LogBuf logger');
    });

    it("interface som ärver från class", () => {
      // ???Lite esoterisk språkegenskap??? Kan någon komma på ett användingsområde?

      // Ett interface kan ärva från klass och ärver då dess medlemmar
      // men ej implementation.
      class A {
        b: number;

        kaka(): void {
          this.b = 12;
        }
      }

      interface B extends A {
        banan(): void;
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
        private a: number;

        doIt(): void {
          this.a = 42
        }
      }

      interface Y extends X {
        stuff(): void;
      }

      // Detta går inte eftersom a är privat i X
      // prova att inkludera detta i koden; kompileringsfel: typer har separata dekl av 'a'
      // class Z1 implements Y {
      //   private a: number;
      //   stuff(): void {
      //   }
      //   doIt(): any {
      //     return null;
      //   }
      // }
      // Däremot går det bra med följande (vad nu arvet Y <- X ska vara bra för?):
      class Z extends X implements Y {
        stuff(): void {
        }
      }
    });
  });

  describe("Klasser", () => {
    it("Demonstrera klass", () => {
      // Klasser fungerar i stort som i Java
      // - fält är publika per default (men man kan även ange det explicit)
      class Bas {
        aPublicProperty: number; // publik per default
        private aPrivateProperty: string;
        protected aProtectedProperty: number[];

        constructor(aPublicProperty: number) {
          this.aPublicProperty = aPublicProperty; // OBS 'this' måste alltid anges
          this.aPrivateProperty = "Startade med: " + aPublicProperty;
        }

        getAPrivateProperty(): string {
          return this.aPrivateProperty;
        }
      }

      const b: Bas = new Bas(42);
      const z = b.getAPrivateProperty();
      expect(z).to.eql('Startade med: 42');

      // Subklasser kan skapas som vanligt
      class Sub extends Bas {
        constructor() {
          super(4711);
          this.aProtectedProperty = [99];
        }

        getProtected() {
          return this.aProtectedProperty;
        }
      }
      const b2: Bas = new Sub(); // Referens till Bas kan referera subklasser som vanligt
      // b2.getProtected() // prova att inkludera detta i koden; kompileringsfel: är ej definierad på Bas
      const sub: Sub = new Sub();
      expect(sub.getProtected()).to.eql([99]);

    });

    it("Demonstrera deklaration av fält i konstruktor", () => {
      class SlimJim {
        // För att banta ner koden kan man deklarera fält direkt i konstruktor
        constructor(public x: number, private y: number) {
        }

        meaningOfLife(): number {
          return this.x + this.y;
        }
      }
      const slimJim = new SlimJim(40, 2);
      expect(slimJim.x).to.eql(40);
      expect(slimJim.meaningOfLife()).to.eql(42);
    });

    it("Demonstrera strukturell typlikhet för private (och protected)", () => {
      // TypeScript är ett strukturellt typsystem.
      // När man jämför två olika typer, så är typerna kompatibla om alla medlemmar är kompatibla
      // Dock gäller inte detta om medlemmarna är private eller protected. För sådana medlemmar krävs det at de
      // her sitt ursprung i samma deklaration, dvs samma basklass.
      class Animal {
        private name: string;

        constructor(theName: string) {
          this.name = theName;
        }
      }

      class Rhino extends Animal {
        constructor() {
          super("Rhino");
        }
      }

      class Employee {
        private name: string;

        constructor(theName: string) {
          this.name = theName;
        }
      }

      let animal = new Animal("Goat");
      const rhino = new Rhino();
      const employee = new Employee("Bob");

      animal = rhino; // OK
      // animal = employee; // prova att inkludera detta i koden; kompileringsfel: 'Animal' och 'Employee' är inte kompatibla, separata dekl. av 'name'
    });

    it("Konstruktorer kan vara protected", () => {
      class A {
        protected constructor(protected x: number) {
        }
      }

      class B extends A {
        constructor(public y: number) {
          super(42);
        }
      }
    });

    it("Fält kan vara readonly", () => {
      class A {
        readonly x: number;

        constructor(x: number) {
          this.x = x;
        }
      }

      const a: A = new A(42);
      // a.x = 99; // prova att inkludera detta i koden; kompileringsfel:  kan ej ändra readonly

      // Dessutom finns en short-hand för att skapa readonly-fält
      class B {
        constructor(readonly x: number, private readonly: number) {} // publikt per default
      }

      expect((new B(42, 99)).x).to.equal(42);
    });

    it("Demonstrera accessors", () => {
      // Man kan definiera getters/setters (liknande C#) för fält så att man kan
      // använda dem med vanlig property-syntax

      class A {
        private _x: string;

        constructor() {
          this._x = '42';
        }

        get x(): string { // Genererar en property-style getter a'la C#
          return this._x; // Property-namnet får inte krocka med getter-namnet
        }

        set x(newX: string) {
          if (newX.length > 10) {
            throw 'Error: string must no be longer than 10 characters';
          }
          this._x = newX;
        }
      }

      const a: A = new A();
      const z = a.x; // OBS syntax som property
      expect(z).to.equal('42');
      expect(() => {
        a.x = 'a loooooooooooooong string'
      }).to.throw('Error: string must no be longer than 10 characters');
    });

    it("Man kan ha static members", ()=> {
      class A {
        static x = 42;

        static showMe() {
          return 99;
        }
      }

      expect(A.x).to.equal(42);
      expect(A.showMe()).to.equal(99);
    });

    it("Man kan skapa abstrakta klasser", ()=> {
      // Intellij gnäller men inte tsc
      abstract class A {
        abstract f(): number; // Man kan endast ha abstrakta metoder i abstrakta klasser
        g() {
          return this.f() + 99;
        }
      }

      class B extends A {
        f(): number {
          return 42;
        }
      }

      expect((new B().g())).to.equal(42 + 99);
    });

    it("Konstruktorfunktioner", () => {
      // När man definierar en klass blir klassen/symbolen även en konstruktor-funktion
      // som man t.ex kan skicka som parameter.
      // Detta kan man utnyttja när man skall implementera services, controllers, etc. i Angular 1.x
      class A {
        constructor(public x: number) {
        }
      }

      function xx(constr: any, param: number): any {
        return new constr(param);
      }

      // Kompilerar konstigt nog?
      const a: A = xx(A, 21); // Kom ihåg att any kan stoppas in på vad som helst
      const b: Date = xx(A, 21);
      expect(a.x).to.equal(21);
    });
  });

  describe("Funktioner", () => {
    it("Namngivna funktioner", () => {
      // Kan vara namngivna och gäller då oavsett var de deklareras

      expect(f()).to.equal(42); // Kan användas innan deklaration

      function f() {
        return 42;
      }
    });

    it("Anonyma funktioner", () => {
      // Kan inte användas förrän efter dekl.

      // runtime-fel med var
      //v(); // prova att inkludera detta i koden; runtime-fel: v är inte en funktion
      var v = function() {return 'pannkaka';};

      // kompileringsfel med let/const)
      //expect(l()).to.equal('ostkaka'); // prova att inkludera detta i koden; kompileringsfel: 'l' används innan den definierats
      const l = function() {return 'ostkaka'};
      expect(l()).to.equal('ostkaka');
    });

    it("Lambda-uttryck/pilfunktioner", () => {
      // Man kan definiera en funktion som ett lambda-uttryck...
      const double = x => 2*x;

      // ...som såklart betraktas som ett objekt, dvs kan skickas som parameter och returvärde
      function stringify(f:(number) => number):(number)=>string {
        return x => `Resultat: ${f(x)}`;
      }

      expect(stringify(a => 42 + a)(12)).to.equal('Resultat: 54');
    });

    it("Deklarera signatur", ()=>{
      function length(s:string):number {
        return s.length;
      }

      // length(42); // prova att inkludera detta i koden; kompileringsfel: en string kan inte tilldelas number
      //const s:string = length('kaka'); // prova att inkludera detta i koden; kompileringsfel: number kan inte tilldelas string
    });

    it("Typ för funktion", ()=>{
      // Man kan ange en funktionssignatur som en typ
      let a:(s:string) => number;

      a = f;
      // a = g; // prova att inkludera detta i koden; kompileringsfel: (s: string) => number kan inte tilldelas (n: number) => number

      function f(s:string):number {
        return s.length;
      }

      function g(n:number):number {
        return n*2;
      }
    });

    it("Utelämningsbara parametrar", () => {
      // Ange med ?, men utför kontroll själv
      // OBS!! de måste vara sist i parameterlistan
      function f(f?:number): number {
        return f && f * 2 || 0; // Typiskt JS-mönster för kontroll av undefined samt ange default-värde
      }

      expect(f(2)).to.equal(4);
      expect(f()).to.equal(0);
    });

    it("Standardparamterar", () => {
      // Snyggare alternativ till utelämningsbara (?) paramterar
      function f(f:number = 0): number {
        return f * 2;
      }

      expect(f(2)).to.equal(4);
      expect(f()).to.equal(0);
    });

    it("Varargs/rest-parametrar", () =>{
      // Man kan ange varargs-parametrar
      function f(...names:string[]):string {
        return names.reduce((result,s)=>result+s,"");
      }

      expect(f('kaka', 'baka', 'bulle')).to.eql('kakabakabulle');
    });

    it("This i funktioner vs. pil-funktioner", () => {
      // med funktioner binds 'this' vid anropet till undefined eller window ()
      class A {
        x = 23;
        createAdder() {
          return function (y: number): number {
            return this.x + y; // När denna funktion används kommer 'this' inte att vara bunden till detta objekt
          }
        }
        useInnerFunction():number {
          return add();
          function add() {
            return this.x * 2;
          }
        }
      }

      const a = new A();
      const add = a.createAdder();
      // add(4); // prova att inkludera detta i koden; runtime-fel 'this' är ej definierad
      // a.useInnerFunction(); // prova att inkludera detta i koden; runtime-fel 'this' är ej definierad

      // Med pil-funktioner binds 'this' till aktuellt objekt
      class B {
        x = 23;
        createAdder() {
          return (y: number) => this.x + y; // en pil-funktion binder 'this' till omgivande 'this' i detta fall B::this
        }
        useInnerFunctionAlt1():number {
          const add = () => this.x * 2;
          return add();
        }
        useInnerFunctionAlt2():number {
          const self = this;
          return add();

          function add() {
            return self.x * 2;
          }
        }
      }

      const b = new B();
      const add2 = b.createAdder();
      expect(add2(4)).to.equal(27);
      expect(b.useInnerFunctionAlt1()).to.equal(46);
      expect(b.useInnerFunctionAlt2()).to.equal(46);
    });
  });

  describe("Generics", () => {
    it("Generics funkar som i Java", () => {
      class Ref<T> {
        constructor(public value:T){}
      }

      const x = new Ref<string>('Kaka');
      expect(x.value).to.equal('Kaka');

      // x.value = 42; // prova att inkludera detta i koden; kompileringsfel: string kan inte tilldelas number
    });

    it("Generic-funktioner", () => {
      function identity<T>(x:T):T {
        return x;
      }

      expect(identity('Kaka')).to.equal('Kaka');

      // x.value = 42; // prova att inkludera detta i koden; kompileringsfel: string kan inte tilldelas number
    });

    it("Typbegränsning/typvarians", () => {
      // Man kan ange begränsing av typparametern
      interface A {
        size:number;
      }
      function sumSize<T extends A>(...xs:T[]):number {
        return xs.reduce((acc, e) => acc + e.size, 0);
      }

      expect(sumSize({size:1}, {size:2})).to.equal(3);

      // x.value = 42; // prova att inkludera detta i koden; kompileringsfel: string kan inte tilldelas number
    });

    it("Klasstyper", () => {
      // Ett typsäkrare sätt att skapa factory-metod jämfört med vad vi visade tidigare
      // kan man få till med klasstyper.
      // En klasstyp definierar en konstruktorfunktion och är ett objekt.
      //   {
      //     new(): T;
      //   }
      class A {
        x = 23;
      }

      function create<T>(classType: {new(): T; }): T {
        return new classType();
      }

      const a:A = create(A);
      expect(a.x).to.equal(23);

      //const a:string = create(A); // prova att inkludera detta i koden; string kan inte tilldelas A
    });
  });

  describe("Lite extra ES6 features som är ganska onödiga (och kan ha begränsat stöd i runtime)", () => {
    it("Ny for-syntax: for..of", () => {
      // Tidigare for-syntax var endast till för att iterera nycklarna i en array
      const arr = ['kaka', 'baka', 'banan'];
      const keys = [];
      for (let key in arr) {
        keys.push(key);
      }
      expect(keys).to.eql(['0', '1', '2']);

      // Men egentligen vill man ju oftast iterera över elementen, vilket man nu kan göra med for..of
      const elems = [];
      for (let elem of arr) {
        elems.push(elem);
      }
      expect(elems).to.eql(['kaka', 'baka', 'banan']);
    });

    it("Generatorer som returnerar värden", () => {
      // En genarator är ett sätt att skapa iterator av en funktion
      // - returnerar värde vid varje yield
      function* g(): Iterator<number> {
        let index = 0;
        while (true) {
          yield index++;
        }
      }

      // Alternativ 1: anrop till next() triggar yield
      const iterator = g();
      expect(iterator.next().value).to.equal(0);
      expect(iterator.next().value).to.equal(1);

      // Alternativ 2: en iteration triggar yield
      let i = 0;
      for (let x in g()) {
        expect(x).to.equal(i);
        i++;
      }
    });

    it("Generator som konsumerar värden", () => {
      // En genarator kan även ta emot värden vid varje yield
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

    it("async/await", () => {
      const fetchSomething = () => new Promise((resolve) => {
        setTimeout(() => {
          resolve('value from async');
        }, 1);
      });

      async function asyncFunction() {
        const result = await fetchSomething(); // returns promise; await only allowed in async functions
        // waits for promise and uses promise result
        return result + ' 2';
      }

      asyncFunction().then(result => console.log(result));
    });
  });
});

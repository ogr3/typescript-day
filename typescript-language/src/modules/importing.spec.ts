// Med NodeJS strategi för att lösa upp importer gäller följande:
// - Om de inte är relativa så utgår kompilatorn från närmaste i "node_modules/" (från aktuell fil och upp till "/")
// - Om de är relativa utgår man från akutell fill.

// Här importerar vi från en installerad 3pp i "node_modules"
import {expect} from "chai";

// Titta i "./exporting.ts"
// Med syntaxen import {<something>} from "<module>" kan man importera namngivna exportdeklarationer
import {Banan, Bugaloo} from "./exporting";

// Här samlas alla exporter från "./exporting"-modulen under aliaset 'zz'
import * as zz from "./exporting";

// Titta i "./ClassA.ts"
// Här har modulen "./ClassA" en default-export i form av en anonym klass som vi ger aliaset 'ClsA' här
import ClsA from "./ClassA";

// Titta i "./reexport.ts"
// Modulen "./reexport" re-exporterar deklarationer från andra moduler
import * as rex from "./reexport";

// Här imprterar vi CommonJS style. Används framförallt för import av javascript-filer i 3PP
import ClassB = require("./ClassB");

describe("Typescript", () => {
  it("De-structuring", () => {
    const banan = new Banan();
    expect(banan.zz).to.equal('hepp');

    const bugaloo = new Bugaloo();
    expect(bugaloo.bulle).to.equal(12);
  });

  it("* as ... import", () => {
    // Med syntaxen import * as <alias> from "<module>" kan man importera alla exportdeklarationer under aliaset <alias>

    expect(zz.PI).to.equal(3.14);
  });

  it("Importera anonym klass", () => {
    const a: ClsA = new ClsA;
    expect(a.z).to.equal(2);
  });

  it("CommonJS style", ()=> {
    const b: ClassB = new ClassB;
    expect(b.y).to.equal(3);
  });

  it("Demonstrera re-export", () => {
    const c: rex.ClassC = new rex.ClassC();
  });
});
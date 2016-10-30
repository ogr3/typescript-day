Kompetensdag: Typescript
========================

Förutsättning: Node JS 6.x är installerat

Kolla att projektet bygger (på mac eller *nix)
----------------------------------------------

    $ cd typescript-language
    $ npm install && npm run test



Agenda
------
1. Beskriv bakgrund
	- Superset av javascript
	- Demonstrera översättning 
	- modulladdning i NodeJS med commonjs 
	- source map
	- debugga i NodeJS
	- FP-style i kollektioner
	- Lodash
2. Genomgång av språket
	- Sätt upp enkelt node-projekt med kontinuerlig kompilering
	  - Beskriv hur projektet är uppsatt 
	- Basic types
	  - Boolean
	  - Number
	  - String
	  - Array
	  - Tuple
	  - Enum
	  - Any
	  - Void
	  - Null & Undefined
	  - Never
	  - Type assertions
	  - let vs var
	- Variable declarations
	  - let
	    - shadowing
	    - block-scope 
	  - const
	  - destructuring
	    - default values
	    - function decl
	- Interfaces
	  - duck typing
	  - Optional properties
	  - readonly properties
	  - excess property checks
	  - function types
	  - indexable types
	  - class types
	  - hybrid types
	  - extend class
	- Classes
	- Generics
	- Enums
	- Type interference
	- Type compatibility
	- Advanced Types
	- Symbols
	- Iterators and Generators
	- Modules
	- Namespaces
	- Module resolution
	  - Ambient declarations
	  - Generering av .d.ts-filer
	  - Node
	  - Webpack 
	- Declaration merging
	- Decorators
	- Mixins
	- Triple-Slash Directives
2. Hur man använder i front-end-utveckling
    - Enkelt grund-case utan modulladdare
    - Med modulladdare: Webpack
3. Skapa NPM-paket för Angular2-komponent


Typescript allmänt
------------------
### Installera

    $ cd typescript-language
    $ npm install
    
### Kör tester kontinuerligt
Starta tester (*.spec.ts-filer) och kör kontinuerligt. Tester körs
om automatiskt när man sparar filer. 

    $ npm run test:auto
    
    
Testa Gravizo
=============
![Alt text](http://g.gravizo.com/g?
 @startuml;

actor User;
participant "First Class" as A;
participant "Second Class" as B;
participant "Last Class" as C;

User -> A: DoWork;
activate A;

A -> B: Create Request;
activate B;

B -> C: DoWork;
activate C;

C --> B: WorkDone;
destroy C;

B --> A: Request Created;
deactivate B;

A --> User: Done;
deactivate A;

@enduml
)

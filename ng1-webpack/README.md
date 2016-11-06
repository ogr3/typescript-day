Bygga Angular 1.x med Typescript och Webpack
==========================================
OK, nu fortsätter vi där [web-with-webpack](../web-with-webpack) slutade. Nu ska vi bygga en
Angular 1.x-applikation med Typescript och Webpack.

Jag har valt att skippa Angular 2 för det finns redan så mycket tutorials och
starters för typescript och webpack (se t.ex
[Webpack: An introduction](https://angular.io/docs/ts/latest/guide/webpack.html) eller
[angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter)).

Vad behöver vi tänka på?
------------------------

- Se till att alla filer importeras, direkt eller indirekt. (Det finns an fuskväg som kan vara
bra när man har en massa existerande kod:
[webpack-angular-resource-plugin](https://github.com/liyutech/webpack-angular-resource-plugin),
men vi ska inte ta till såna knep.)
- Bootstrappa från kod för att ha kontroll på när bootstrapping körs.
- Implementera tjänster/controllers/moduler, etc., med typescript-klasser. 
- Bra (men inte obligatorisk) grej: använd Angular 1.5 [component](https://docs.angularjs.org/guide/component) för komponenter, st.f direktiv.
- Bra grej 2: använd Angular 1.5's komponent-router 

Sätta upp projekt
-----------------
Vi börjar med samma projekt-setup som vi använde i [web-with-webpack](../web-with-webpack).

Skapa en ny katalog `ng1-webpack` och kopiera in följande filer från [web-with-webpack](../web-with-webpack): 

- `package.json` (byt "name"-värdet till "ng1-webpack") 
- `tsconfig.json`
- `config/`-katalogen med innehåll

Kör

```bash
$ npm install
```
	
Angular 1.5
-----------
OK, då ska vi lägga till Angular 1.5 samt se till att den bootstrappas.

Installera angular smat dess @types:

```bash
$ npm i -S angular
$ npm i -D @types/angular
```	

Vi ska se till att alla 3PP:er hamnar i en egen bundle genom att konfigurera webpack med poster för applikationen resp. 3PP:er 

i `config/webpack.common.js`:

```javascript
:
entry: {
  "app": "./src/app.ts"	,
  "vendor": "./src/vendor.ts"
}
:
```

Och så lägger vi till filerna.

#### src/app.ts

```typescript
import * as ng1 from "angular";

ng1.bootstrap(document, [], {
   strictDi: false
});
```	

#### src/vendor.ts

```typescript
import "angular";	
```

Tills sist lägger vi till `src/index.html`:

```html
<!DOCTYPE html>
<html lang="sv">
  <head>
    <meta charset="UTF-8">
    <title>CAG-labs</title>
  </head>
  <body>
    <h1>Angular 1.x + Webpack</h1>
    <button id="greetButton">Hälsa</button>
    <p id="greeting">Om Angular bootstrappat korrekt skall summan bli rätt: 1 + 1 = {{1+1}}</p>
  </body>
</html>
```

Kör sen 

```bash
$ npm start
```

Och öppna 
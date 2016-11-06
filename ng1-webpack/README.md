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

	$ npm install
	
	


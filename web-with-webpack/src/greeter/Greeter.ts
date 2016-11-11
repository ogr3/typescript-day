export class Greeter {
  private n = 0;
  constructor() {
    document.getElementById("greetButton").addEventListener("click", () => this.sayHi());
  }

  sayHi() {
    this.n++;
    if (this.n > 5) {
      document.getElementById("greeting").innerHTML = "Börjar bli lite tjatigt nu va?";
    } else {
      document.getElementById("greeting").innerHTML = document.getElementById("greeting").innerHTML+"<br>Yo dude!";
    }
  }
}
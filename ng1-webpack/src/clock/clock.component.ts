import * as ng1 from "angular";
import * as app from "../app.module";

class Controller implements ng1.IComponentController {
  time: string;

  constructor(private $timeout:ng1.ITimeoutService) {
    this.tick();
  }

  tick() {
    this.time = new Date().toLocaleTimeString('sv');
    this.$timeout(() => this.tick(), 1000);
  }
}

app.appModule.component('cagClock', {
  template: `
    <div>
    <p>{{$ctrl.time}}</p>
    </div>
      `,
  controller: ['$timeout', Controller]
});
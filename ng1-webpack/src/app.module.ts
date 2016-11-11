import * as ng1 from 'angular';

export const appModule = ng1.module('app.module', []);

import "./clock/clock.component";

console.debug('appModule is initialized');
/**
 * @license Angular v7.0.0-beta.6+34.sha-a880686
 * (c) 2010-2018 Google, Inc. https://angular.io/
 * License: MIT
 */

import { __decorate } from 'tslib';
import { NgModule, createPlatformFactory } from '@angular/core';
import { BrowserDynamicTestingModule, ɵplatformCoreDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ɵINTERNAL_SERVER_PLATFORM_PROVIDERS, ɵSERVER_RENDER_PROVIDERS } from '@angular/platform-server';

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Platform for testing
 *
 * @experimental API related to bootstrapping are still under review.
 */
const platformServerTesting = createPlatformFactory(ɵplatformCoreDynamicTesting, 'serverTesting', ɵINTERNAL_SERVER_PLATFORM_PROVIDERS);
/**
 * NgModule for testing.
 *
 * @experimental API related to bootstrapping are still under review.
 */
let ServerTestingModule = class ServerTestingModule {
};
ServerTestingModule = __decorate([
    NgModule({
        exports: [BrowserDynamicTestingModule],
        imports: [NoopAnimationsModule],
        providers: ɵSERVER_RENDER_PROVIDERS
    })
], ServerTestingModule);

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// This file only reexports content of the `src` folder. Keep it that way.

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

export { platformServerTesting, ServerTestingModule };
//# sourceMappingURL=testing.js.map

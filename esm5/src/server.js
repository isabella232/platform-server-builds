/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { ɵAnimationEngine } from '@angular/animations/browser';
import { PlatformLocation, ɵPLATFORM_SERVER_ID as PLATFORM_SERVER_ID } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Injector, NgModule, NgZone, Optional, PLATFORM_ID, PLATFORM_INITIALIZER, RendererFactory2, Testability, createPlatformFactory, platformCore, ɵALLOW_MULTIPLE_PLATFORMS as ALLOW_MULTIPLE_PLATFORMS } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule, DOCUMENT, EVENT_MANAGER_PLUGINS, ɵSharedStylesHost as SharedStylesHost, ɵgetDOM as getDOM } from '@angular/platform-browser';
import { ɵplatformCoreDynamic as platformCoreDynamic } from '@angular/platform-browser-dynamic';
import { NoopAnimationsModule, ɵAnimationRendererFactory } from '@angular/platform-browser/animations';
import { DominoAdapter, parseDocument } from './domino_adapter';
import { SERVER_HTTP_PROVIDERS } from './http';
import { ServerPlatformLocation } from './location';
import { PlatformState } from './platform_state';
import { ServerEventManagerPlugin } from './server_events';
import { ServerRendererFactory2 } from './server_renderer';
import { ServerStylesHost } from './styles_host';
import { INITIAL_CONFIG } from './tokens';
function notSupported(feature) {
    throw new Error("platform-server does not support '" + feature + "'.");
}
export var INTERNAL_SERVER_PLATFORM_PROVIDERS = [
    { provide: DOCUMENT, useFactory: _document, deps: [Injector] },
    { provide: PLATFORM_ID, useValue: PLATFORM_SERVER_ID },
    { provide: PLATFORM_INITIALIZER, useFactory: initDominoAdapter, multi: true, deps: [Injector] }, {
        provide: PlatformLocation,
        useClass: ServerPlatformLocation,
        deps: [DOCUMENT, [Optional, INITIAL_CONFIG]]
    },
    { provide: PlatformState, deps: [DOCUMENT] },
    // Add special provider that allows multiple instances of platformServer* to be created.
    { provide: ALLOW_MULTIPLE_PLATFORMS, useValue: true }
];
function initDominoAdapter(injector) {
    return function () { DominoAdapter.makeCurrent(); };
}
export function instantiateServerRendererFactory(renderer, engine, zone) {
    return new ɵAnimationRendererFactory(renderer, engine, zone);
}
export var SERVER_RENDER_PROVIDERS = [
    ServerRendererFactory2,
    {
        provide: RendererFactory2,
        useFactory: instantiateServerRendererFactory,
        deps: [ServerRendererFactory2, ɵAnimationEngine, NgZone]
    },
    ServerStylesHost,
    { provide: SharedStylesHost, useExisting: ServerStylesHost },
    { provide: EVENT_MANAGER_PLUGINS, multi: true, useClass: ServerEventManagerPlugin },
];
/**
 * The ng module for the server.
 *
 * @experimental
 */
var ServerModule = /** @class */ (function () {
    function ServerModule() {
    }
    ServerModule = tslib_1.__decorate([
        NgModule({
            exports: [BrowserModule],
            imports: [HttpModule, HttpClientModule, NoopAnimationsModule],
            providers: [
                SERVER_RENDER_PROVIDERS,
                SERVER_HTTP_PROVIDERS,
                { provide: Testability, useValue: null },
            ],
        })
    ], ServerModule);
    return ServerModule;
}());
export { ServerModule };
function _document(injector) {
    var config = injector.get(INITIAL_CONFIG, null);
    if (config && config.document) {
        return parseDocument(config.document, config.url);
    }
    else {
        return getDOM().createHtmlDocument();
    }
}
/**
 * @experimental
 */
export var platformServer = createPlatformFactory(platformCore, 'server', INTERNAL_SERVER_PLATFORM_PROVIDERS);
/**
 * The server platform that supports the runtime compiler.
 *
 * @experimental
 */
export var platformDynamicServer = createPlatformFactory(platformCoreDynamic, 'serverDynamic', INTERNAL_SERVER_PLATFORM_PROVIDERS);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tc2VydmVyL3NyYy9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxtQkFBbUIsSUFBSSxrQkFBa0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzVGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBNkIsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBeUIsZ0JBQWdCLEVBQWdDLFdBQVcsRUFBRSxxQkFBcUIsRUFBYSxZQUFZLEVBQUUseUJBQXlCLElBQUksd0JBQXdCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN1QsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxxQkFBcUIsRUFBRSxpQkFBaUIsSUFBSSxnQkFBZ0IsRUFBa0IsT0FBTyxJQUFJLE1BQU0sRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ25LLE9BQU8sRUFBQyxvQkFBb0IsSUFBSSxtQkFBbUIsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQzlGLE9BQU8sRUFBQyxvQkFBb0IsRUFBRSx5QkFBeUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBRXJHLE9BQU8sRUFBQyxhQUFhLEVBQUUsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDOUQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzdDLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUNsRCxP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USxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNuRDtTQUFNO1FBQ0wsT0FBTyxNQUFNLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0tBQ3RDO0FBQ0gsQ0FBQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxDQUFDLElBQU0sY0FBYyxHQUN2QixxQkFBcUIsQ0FBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLGtDQUFrQyxDQUFDLENBQUM7QUFFdEY7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxJQUFNLHFCQUFxQixHQUM5QixxQkFBcUIsQ0FBQyxtQkFBbUIsRUFBRSxlQUFlLEVBQUUsa0NBQWtDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHvJtUFuaW1hdGlvbkVuZ2luZX0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucy9icm93c2VyJztcbmltcG9ydCB7UGxhdGZvcm1Mb2NhdGlvbiwgybVQTEFURk9STV9TRVJWRVJfSUQgYXMgUExBVEZPUk1fU0VSVkVSX0lEfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtIdHRwQ2xpZW50TW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge0luamVjdGFibGUsIEluamVjdGlvblRva2VuLCBJbmplY3RvciwgTmdNb2R1bGUsIE5nWm9uZSwgT3B0aW9uYWwsIFBMQVRGT1JNX0lELCBQTEFURk9STV9JTklUSUFMSVpFUiwgUGxhdGZvcm1SZWYsIFByb3ZpZGVyLCBSZW5kZXJlckZhY3RvcnkyLCBSb290UmVuZGVyZXIsIFN0YXRpY1Byb3ZpZGVyLCBUZXN0YWJpbGl0eSwgY3JlYXRlUGxhdGZvcm1GYWN0b3J5LCBpc0Rldk1vZGUsIHBsYXRmb3JtQ29yZSwgybVBTExPV19NVUxUSVBMRV9QTEFURk9STVMgYXMgQUxMT1dfTVVMVElQTEVfUExBVEZPUk1TfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SHR0cE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQge0Jyb3dzZXJNb2R1bGUsIERPQ1VNRU5ULCBFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIMm1U2hhcmVkU3R5bGVzSG9zdCBhcyBTaGFyZWRTdHlsZXNIb3N0LCDJtVRSQU5TSVRJT05fSUQsIMm1Z2V0RE9NIGFzIGdldERPTX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge8m1cGxhdGZvcm1Db3JlRHluYW1pYyBhcyBwbGF0Zm9ybUNvcmVEeW5hbWljfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMnO1xuaW1wb3J0IHtOb29wQW5pbWF0aW9uc01vZHVsZSwgybVBbmltYXRpb25SZW5kZXJlckZhY3Rvcnl9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5cbmltcG9ydCB7RG9taW5vQWRhcHRlciwgcGFyc2VEb2N1bWVudH0gZnJvbSAnLi9kb21pbm9fYWRhcHRlcic7XG5pbXBvcnQge1NFUlZFUl9IVFRQX1BST1ZJREVSU30gZnJvbSAnLi9odHRwJztcbmltcG9ydCB7U2VydmVyUGxhdGZvcm1Mb2NhdGlvbn0gZnJvbSAnLi9sb2NhdGlvbic7XG5pbXBvcnQge1BsYXRmb3JtU3RhdGV9IGZyb20gJy4vcGxhdGZvcm1fc3RhdGUnO1xuaW1wb3J0IHtTZXJ2ZXJFdmVudE1hbmFnZXJQbHVnaW59IGZyb20gJy4vc2VydmVyX2V2ZW50cyc7XG5pbXBvcnQge1NlcnZlclJlbmRlcmVyRmFjdG9yeTJ9IGZyb20gJy4vc2VydmVyX3JlbmRlcmVyJztcbmltcG9ydCB7U2VydmVyU3R5bGVzSG9zdH0gZnJvbSAnLi9zdHlsZXNfaG9zdCc7XG5pbXBvcnQge0lOSVRJQUxfQ09ORklHLCBQbGF0Zm9ybUNvbmZpZ30gZnJvbSAnLi90b2tlbnMnO1xuXG5mdW5jdGlvbiBub3RTdXBwb3J0ZWQoZmVhdHVyZTogc3RyaW5nKTogRXJyb3Ige1xuICB0aHJvdyBuZXcgRXJyb3IoYHBsYXRmb3JtLXNlcnZlciBkb2VzIG5vdCBzdXBwb3J0ICcke2ZlYXR1cmV9Jy5gKTtcbn1cblxuZXhwb3J0IGNvbnN0IElOVEVSTkFMX1NFUlZFUl9QTEFURk9STV9QUk9WSURFUlM6IFN0YXRpY1Byb3ZpZGVyW10gPSBbXG4gIHtwcm92aWRlOiBET0NVTUVOVCwgdXNlRmFjdG9yeTogX2RvY3VtZW50LCBkZXBzOiBbSW5qZWN0b3JdfSxcbiAge3Byb3ZpZGU6IFBMQVRGT1JNX0lELCB1c2VWYWx1ZTogUExBVEZPUk1fU0VSVkVSX0lEfSxcbiAge3Byb3ZpZGU6IFBMQVRGT1JNX0lOSVRJQUxJWkVSLCB1c2VGYWN0b3J5OiBpbml0RG9taW5vQWRhcHRlciwgbXVsdGk6IHRydWUsIGRlcHM6IFtJbmplY3Rvcl19LCB7XG4gICAgcHJvdmlkZTogUGxhdGZvcm1Mb2NhdGlvbixcbiAgICB1c2VDbGFzczogU2VydmVyUGxhdGZvcm1Mb2NhdGlvbixcbiAgICBkZXBzOiBbRE9DVU1FTlQsIFtPcHRpb25hbCwgSU5JVElBTF9DT05GSUddXVxuICB9LFxuICB7cHJvdmlkZTogUGxhdGZvcm1TdGF0ZSwgZGVwczogW0RPQ1VNRU5UXX0sXG4gIC8vIEFkZCBzcGVjaWFsIHByb3ZpZGVyIHRoYXQgYWxsb3dzIG11bHRpcGxlIGluc3RhbmNlcyBvZiBwbGF0Zm9ybVNlcnZlciogdG8gYmUgY3JlYXRlZC5cbiAge3Byb3ZpZGU6IEFMTE9XX01VTFRJUExFX1BMQVRGT1JNUywgdXNlVmFsdWU6IHRydWV9XG5dO1xuXG5mdW5jdGlvbiBpbml0RG9taW5vQWRhcHRlcihpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgcmV0dXJuICgpID0+IHsgRG9taW5vQWRhcHRlci5tYWtlQ3VycmVudCgpOyB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5zdGFudGlhdGVTZXJ2ZXJSZW5kZXJlckZhY3RvcnkoXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyRmFjdG9yeTIsIGVuZ2luZTogybVBbmltYXRpb25FbmdpbmUsIHpvbmU6IE5nWm9uZSkge1xuICByZXR1cm4gbmV3IMm1QW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5KHJlbmRlcmVyLCBlbmdpbmUsIHpvbmUpO1xufVxuXG5leHBvcnQgY29uc3QgU0VSVkVSX1JFTkRFUl9QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbXG4gIFNlcnZlclJlbmRlcmVyRmFjdG9yeTIsXG4gIHtcbiAgICBwcm92aWRlOiBSZW5kZXJlckZhY3RvcnkyLFxuICAgIHVzZUZhY3Rvcnk6IGluc3RhbnRpYXRlU2VydmVyUmVuZGVyZXJGYWN0b3J5LFxuICAgIGRlcHM6IFtTZXJ2ZXJSZW5kZXJlckZhY3RvcnkyLCDJtUFuaW1hdGlvbkVuZ2luZSwgTmdab25lXVxuICB9LFxuICBTZXJ2ZXJTdHlsZXNIb3N0LFxuICB7cHJvdmlkZTogU2hhcmVkU3R5bGVzSG9zdCwgdXNlRXhpc3Rpbmc6IFNlcnZlclN0eWxlc0hvc3R9LFxuICB7cHJvdmlkZTogRVZFTlRfTUFOQUdFUl9QTFVHSU5TLCBtdWx0aTogdHJ1ZSwgdXNlQ2xhc3M6IFNlcnZlckV2ZW50TWFuYWdlclBsdWdpbn0sXG5dO1xuXG4vKipcbiAqIFRoZSBuZyBtb2R1bGUgZm9yIHRoZSBzZXJ2ZXIuXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5ATmdNb2R1bGUoe1xuICBleHBvcnRzOiBbQnJvd3Nlck1vZHVsZV0sXG4gIGltcG9ydHM6IFtIdHRwTW9kdWxlLCBIdHRwQ2xpZW50TW9kdWxlLCBOb29wQW5pbWF0aW9uc01vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIFNFUlZFUl9SRU5ERVJfUFJPVklERVJTLFxuICAgIFNFUlZFUl9IVFRQX1BST1ZJREVSUyxcbiAgICB7cHJvdmlkZTogVGVzdGFiaWxpdHksIHVzZVZhbHVlOiBudWxsfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgU2VydmVyTW9kdWxlIHtcbn1cblxuZnVuY3Rpb24gX2RvY3VtZW50KGluamVjdG9yOiBJbmplY3Rvcikge1xuICBsZXQgY29uZmlnOiBQbGF0Zm9ybUNvbmZpZ3xudWxsID0gaW5qZWN0b3IuZ2V0KElOSVRJQUxfQ09ORklHLCBudWxsKTtcbiAgaWYgKGNvbmZpZyAmJiBjb25maWcuZG9jdW1lbnQpIHtcbiAgICByZXR1cm4gcGFyc2VEb2N1bWVudChjb25maWcuZG9jdW1lbnQsIGNvbmZpZy51cmwpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBnZXRET00oKS5jcmVhdGVIdG1sRG9jdW1lbnQoKTtcbiAgfVxufVxuXG4vKipcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGNvbnN0IHBsYXRmb3JtU2VydmVyID1cbiAgICBjcmVhdGVQbGF0Zm9ybUZhY3RvcnkocGxhdGZvcm1Db3JlLCAnc2VydmVyJywgSU5URVJOQUxfU0VSVkVSX1BMQVRGT1JNX1BST1ZJREVSUyk7XG5cbi8qKlxuICogVGhlIHNlcnZlciBwbGF0Zm9ybSB0aGF0IHN1cHBvcnRzIHRoZSBydW50aW1lIGNvbXBpbGVyLlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGNvbnN0IHBsYXRmb3JtRHluYW1pY1NlcnZlciA9XG4gICAgY3JlYXRlUGxhdGZvcm1GYWN0b3J5KHBsYXRmb3JtQ29yZUR5bmFtaWMsICdzZXJ2ZXJEeW5hbWljJywgSU5URVJOQUxfU0VSVkVSX1BMQVRGT1JNX1BST1ZJREVSUyk7XG4iXX0=
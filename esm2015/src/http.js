/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const /** @type {?} */ xhr2 = require('xhr2');
import { Injectable, Injector } from '@angular/core';
import { BrowserXhr, Http, ReadyState, RequestOptions, XHRBackend, XSRFStrategy } from '@angular/http';
import { HttpHandler, HttpBackend, XhrFactory, ɵHttpInterceptingHandler as HttpInterceptingHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
const /** @type {?} */ isAbsoluteUrl = /^[a-zA-Z\-\+.]+:\/\//;
/**
 * @param {?} url
 * @return {?}
 */
function validateRequestUrl(url) {
    if (!isAbsoluteUrl.test(url)) {
        throw new Error(`URLs requested via Http on the server must be absolute. URL: ${url}`);
    }
}
export class ServerXhr {
    /**
     * @return {?}
     */
    build() { return new xhr2.XMLHttpRequest(); }
}
ServerXhr.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ServerXhr.ctorParameters = () => [];
function ServerXhr_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ServerXhr.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ServerXhr.ctorParameters;
}
export class ServerXsrfStrategy {
    /**
     * @param {?} req
     * @return {?}
     */
    configureRequest(req) { }
}
ServerXsrfStrategy.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ServerXsrfStrategy.ctorParameters = () => [];
function ServerXsrfStrategy_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ServerXsrfStrategy.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ServerXsrfStrategy.ctorParameters;
}
/**
 * @abstract
 * @template S, R
 */
export class ZoneMacroTaskWrapper {
    /**
     * @param {?} request
     * @return {?}
     */
    wrap(request) {
        return new Observable((observer) => {
            let /** @type {?} */ task = /** @type {?} */ ((null));
            let /** @type {?} */ scheduled = false;
            let /** @type {?} */ sub = null;
            let /** @type {?} */ savedResult = null;
            let /** @type {?} */ savedError = null;
            const /** @type {?} */ scheduleTask = (_task) => {
                task = _task;
                scheduled = true;
                const /** @type {?} */ delegate = this.delegate(request);
                sub = delegate.subscribe(res => savedResult = res, err => {
                    if (!scheduled) {
                        throw new Error('An http observable was completed twice. This shouldn\'t happen, please file a bug.');
                    }
                    savedError = err;
                    scheduled = false;
                    task.invoke();
                }, () => {
                    if (!scheduled) {
                        throw new Error('An http observable was completed twice. This shouldn\'t happen, please file a bug.');
                    }
                    scheduled = false;
                    task.invoke();
                });
            };
            const /** @type {?} */ cancelTask = (_task) => {
                if (!scheduled) {
                    return;
                }
                scheduled = false;
                if (sub) {
                    sub.unsubscribe();
                    sub = null;
                }
            };
            const /** @type {?} */ onComplete = () => {
                if (savedError !== null) {
                    observer.error(savedError);
                }
                else {
                    observer.next(savedResult);
                    observer.complete();
                }
            };
            // MockBackend for Http is synchronous, which means that if scheduleTask is by
            // scheduleMacroTask, the request will hit MockBackend and the response will be
            // sent, causing task.invoke() to be called.
            const /** @type {?} */ _task = Zone.current.scheduleMacroTask('ZoneMacroTaskWrapper.subscribe', onComplete, {}, () => null, cancelTask);
            scheduleTask(_task);
            return () => {
                if (scheduled && task) {
                    task.zone.cancelTask(task);
                    scheduled = false;
                }
                if (sub) {
                    sub.unsubscribe();
                    sub = null;
                }
            };
        });
    }
}
function ZoneMacroTaskWrapper_tsickle_Closure_declarations() {
    /**
     * @abstract
     * @param {?} request
     * @return {?}
     */
    ZoneMacroTaskWrapper.prototype.delegate = function (request) { };
}
export class ZoneMacroTaskConnection extends ZoneMacroTaskWrapper {
    /**
     * @param {?} request
     * @param {?} backend
     */
    constructor(request, backend) {
        super();
        this.request = request;
        this.backend = backend;
        validateRequestUrl(request.url);
        this.response = this.wrap(request);
    }
    /**
     * @param {?} request
     * @return {?}
     */
    delegate(request) {
        this.lastConnection = this.backend.createConnection(request);
        return /** @type {?} */ (this.lastConnection.response);
    }
    /**
     * @return {?}
     */
    get readyState() {
        return !!this.lastConnection ? this.lastConnection.readyState : ReadyState.Unsent;
    }
}
function ZoneMacroTaskConnection_tsickle_Closure_declarations() {
    /** @type {?} */
    ZoneMacroTaskConnection.prototype.response;
    /** @type {?} */
    ZoneMacroTaskConnection.prototype.lastConnection;
    /** @type {?} */
    ZoneMacroTaskConnection.prototype.request;
    /** @type {?} */
    ZoneMacroTaskConnection.prototype.backend;
}
export class ZoneMacroTaskBackend {
    /**
     * @param {?} backend
     */
    constructor(backend) {
        this.backend = backend;
    }
    /**
     * @param {?} request
     * @return {?}
     */
    createConnection(request) {
        return new ZoneMacroTaskConnection(request, this.backend);
    }
}
function ZoneMacroTaskBackend_tsickle_Closure_declarations() {
    /** @type {?} */
    ZoneMacroTaskBackend.prototype.backend;
}
export class ZoneClientBackend extends ZoneMacroTaskWrapper {
    /**
     * @param {?} backend
     */
    constructor(backend) {
        super();
        this.backend = backend;
    }
    /**
     * @param {?} request
     * @return {?}
     */
    handle(request) { return this.wrap(request); }
    /**
     * @param {?} request
     * @return {?}
     */
    delegate(request) {
        return this.backend.handle(request);
    }
}
function ZoneClientBackend_tsickle_Closure_declarations() {
    /** @type {?} */
    ZoneClientBackend.prototype.backend;
}
/**
 * @param {?} xhrBackend
 * @param {?} options
 * @return {?}
 */
export function httpFactory(xhrBackend, options) {
    const /** @type {?} */ macroBackend = new ZoneMacroTaskBackend(xhrBackend);
    return new Http(macroBackend, options);
}
/**
 * @param {?} backend
 * @param {?} injector
 * @return {?}
 */
export function zoneWrappedInterceptingHandler(backend, injector) {
    const /** @type {?} */ realBackend = new HttpInterceptingHandler(backend, injector);
    return new ZoneClientBackend(realBackend);
}
export const /** @type {?} */ SERVER_HTTP_PROVIDERS = [
    { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions] },
    { provide: BrowserXhr, useClass: ServerXhr }, { provide: XSRFStrategy, useClass: ServerXsrfStrategy },
    { provide: XhrFactory, useClass: ServerXhr }, {
        provide: HttpHandler,
        useFactory: zoneWrappedInterceptingHandler,
        deps: [HttpBackend, Injector]
    }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXNlcnZlci9zcmMvaHR0cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLHVCQUFNLElBQUksR0FBUSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFbEMsT0FBTyxFQUFDLFVBQVUsRUFBRSxRQUFRLEVBQWtDLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sRUFBQyxVQUFVLEVBQWlDLElBQUksRUFBRSxVQUFVLEVBQVcsY0FBYyxFQUFZLFVBQVUsRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFdkosT0FBTyxFQUF5QixXQUFXLEVBQXNDLFdBQVcsRUFBRSxVQUFVLEVBQUUsd0JBQXdCLElBQUksdUJBQXVCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUUzTCxPQUFPLEVBQUMsVUFBVSxFQUF5QixNQUFNLE1BQU0sQ0FBQztBQUV4RCx1QkFBTSxhQUFhLEdBQUcsc0JBQXNCLENBQUM7Ozs7O0FBRTdDLDRCQUE0QixHQUFXO0lBQ3JDLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxnRUFBZ0UsR0FBRyxFQUFFLENBQUMsQ0FBQztLQUN4RjtDQUNGO0FBR0QsTUFBTTs7OztJQUNKLEtBQUssS0FBcUIsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUU7OztZQUY5RCxVQUFVOzs7Ozs7Ozs7Ozs7O0FBTVgsTUFBTTs7Ozs7SUFDSixnQkFBZ0IsQ0FBQyxHQUFZLEtBQVU7OztZQUZ4QyxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7OztBQUtYLE1BQU07Ozs7O0lBQ0osSUFBSSxDQUFDLE9BQVU7UUFDYixNQUFNLENBQUMsSUFBSSxVQUFVLENBQUMsQ0FBQyxR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LE9BQXlCO1FBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNyQztDQUNGOzs7Ozs7Ozs7O0FBRUQsTUFBTSxzQkFBc0IsVUFBc0IsRUFBRSxPQUF1QjtJQUN6RSx1QkFBTSxZQUFZLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMxRCxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0NBQ3hDOzs7Ozs7QUFFRCxNQUFNLHlDQUF5QyxPQUFvQixFQUFFLFFBQWtCO0lBQ3JGLHVCQUFNLFdBQVcsR0FBZ0IsSUFBSSx1QkFBdUIsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDaEYsTUFBTSxDQUFDLElBQUksaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7Q0FDM0M7QUFFRCxNQUFNLENBQUMsdUJBQU0scUJBQXFCLEdBQWU7SUFDL0MsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxFQUFDO0lBQzVFLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBQztJQUNqRyxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBQyxFQUFFO1FBQzFDLE9BQU8sRUFBRSxXQUFXO1FBQ3BCLFVBQVUsRUFBRSw4QkFBOEI7UUFDMUMsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQztLQUM5QjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmNvbnN0IHhocjI6IGFueSA9IHJlcXVpcmUoJ3hocjInKTtcblxuaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3RvciwgT3B0aW9uYWwsIFByb3ZpZGVyLCBJbmplY3RGbGFnc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Jyb3dzZXJYaHIsIENvbm5lY3Rpb24sIENvbm5lY3Rpb25CYWNrZW5kLCBIdHRwLCBSZWFkeVN0YXRlLCBSZXF1ZXN0LCBSZXF1ZXN0T3B0aW9ucywgUmVzcG9uc2UsIFhIUkJhY2tlbmQsIFhTUkZTdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5cbmltcG9ydCB7SHR0cEV2ZW50LCBIdHRwUmVxdWVzdCwgSHR0cEhhbmRsZXIsIEh0dHBJbnRlcmNlcHRvciwgSFRUUF9JTlRFUkNFUFRPUlMsIEh0dHBCYWNrZW5kLCBYaHJGYWN0b3J5LCDJtUh0dHBJbnRlcmNlcHRpbmdIYW5kbGVyIGFzIEh0dHBJbnRlcmNlcHRpbmdIYW5kbGVyfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7T2JzZXJ2YWJsZSwgT2JzZXJ2ZXIsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmNvbnN0IGlzQWJzb2x1dGVVcmwgPSAvXlthLXpBLVpcXC1cXCsuXSs6XFwvXFwvLztcblxuZnVuY3Rpb24gdmFsaWRhdGVSZXF1ZXN0VXJsKHVybDogc3RyaW5nKTogdm9pZCB7XG4gIGlmICghaXNBYnNvbHV0ZVVybC50ZXN0KHVybCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVSTHMgcmVxdWVzdGVkIHZpYSBIdHRwIG9uIHRoZSBzZXJ2ZXIgbXVzdCBiZSBhYnNvbHV0ZS4gVVJMOiAke3VybH1gKTtcbiAgfVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VydmVyWGhyIGltcGxlbWVudHMgQnJvd3NlclhociB7XG4gIGJ1aWxkKCk6IFhNTEh0dHBSZXF1ZXN0IHsgcmV0dXJuIG5ldyB4aHIyLlhNTEh0dHBSZXF1ZXN0KCk7IH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlcnZlclhzcmZTdHJhdGVneSBpbXBsZW1lbnRzIFhTUkZTdHJhdGVneSB7XG4gIGNvbmZpZ3VyZVJlcXVlc3QocmVxOiBSZXF1ZXN0KTogdm9pZCB7fVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgWm9uZU1hY3JvVGFza1dyYXBwZXI8UywgUj4ge1xuICB3cmFwKHJlcXVlc3Q6IFMpOiBPYnNlcnZhYmxlPFI+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxSPikgPT4ge1xuICAgICAgbGV0IHRhc2s6IFRhc2sgPSBudWxsICE7XG4gICAgICBsZXQgc2NoZWR1bGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgICBsZXQgc3ViOiBTdWJzY3JpcHRpb258bnVsbCA9IG51bGw7XG4gICAgICBsZXQgc2F2ZWRSZXN1bHQ6IGFueSA9IG51bGw7XG4gICAgICBsZXQgc2F2ZWRFcnJvcjogYW55ID0gbnVsbDtcblxuICAgICAgY29uc3Qgc2NoZWR1bGVUYXNrID0gKF90YXNrOiBUYXNrKSA9PiB7XG4gICAgICAgIHRhc2sgPSBfdGFzaztcbiAgICAgICAgc2NoZWR1bGVkID0gdHJ1ZTtcblxuICAgICAgICBjb25zdCBkZWxlZ2F0ZSA9IHRoaXMuZGVsZWdhdGUocmVxdWVzdCk7XG4gICAgICAgIHN1YiA9IGRlbGVnYXRlLnN1YnNjcmliZShcbiAgICAgICAgICAgIHJlcyA9PiBzYXZlZFJlc3VsdCA9IHJlcyxcbiAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgIGlmICghc2NoZWR1bGVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgICAgICAnQW4gaHR0cCBvYnNlcnZhYmxlIHdhcyBjb21wbGV0ZWQgdHdpY2UuIFRoaXMgc2hvdWxkblxcJ3QgaGFwcGVuLCBwbGVhc2UgZmlsZSBhIGJ1Zy4nKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzYXZlZEVycm9yID0gZXJyO1xuICAgICAgICAgICAgICBzY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgdGFzay5pbnZva2UoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICghc2NoZWR1bGVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgICAgICAnQW4gaHR0cCBvYnNlcnZhYmxlIHdhcyBjb21wbGV0ZWQgdHdpY2UuIFRoaXMgc2hvdWxkblxcJ3QgaGFwcGVuLCBwbGVhc2UgZmlsZSBhIGJ1Zy4nKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgdGFzay5pbnZva2UoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgY2FuY2VsVGFzayA9IChfdGFzazogVGFzaykgPT4ge1xuICAgICAgICBpZiAoIXNjaGVkdWxlZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHN1Yikge1xuICAgICAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIHN1YiA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IG9uQ29tcGxldGUgPSAoKSA9PiB7XG4gICAgICAgIGlmIChzYXZlZEVycm9yICE9PSBudWxsKSB7XG4gICAgICAgICAgb2JzZXJ2ZXIuZXJyb3Ioc2F2ZWRFcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dChzYXZlZFJlc3VsdCk7XG4gICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8gTW9ja0JhY2tlbmQgZm9yIEh0dHAgaXMgc3luY2hyb25vdXMsIHdoaWNoIG1lYW5zIHRoYXQgaWYgc2NoZWR1bGVUYXNrIGlzIGJ5XG4gICAgICAvLyBzY2hlZHVsZU1hY3JvVGFzaywgdGhlIHJlcXVlc3Qgd2lsbCBoaXQgTW9ja0JhY2tlbmQgYW5kIHRoZSByZXNwb25zZSB3aWxsIGJlXG4gICAgICAvLyBzZW50LCBjYXVzaW5nIHRhc2suaW52b2tlKCkgdG8gYmUgY2FsbGVkLlxuICAgICAgY29uc3QgX3Rhc2sgPSBab25lLmN1cnJlbnQuc2NoZWR1bGVNYWNyb1Rhc2soXG4gICAgICAgICAgJ1pvbmVNYWNyb1Rhc2tXcmFwcGVyLnN1YnNjcmliZScsIG9uQ29tcGxldGUsIHt9LCAoKSA9PiBudWxsLCBjYW5jZWxUYXNrKTtcbiAgICAgIHNjaGVkdWxlVGFzayhfdGFzayk7XG5cbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmIChzY2hlZHVsZWQgJiYgdGFzaykge1xuICAgICAgICAgIHRhc2suem9uZS5jYW5jZWxUYXNrKHRhc2spO1xuICAgICAgICAgIHNjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdWIpIHtcbiAgICAgICAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICBzdWIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGRlbGVnYXRlKHJlcXVlc3Q6IFMpOiBPYnNlcnZhYmxlPFI+O1xufVxuXG5leHBvcnQgY2xhc3MgWm9uZU1hY3JvVGFza0Nvbm5lY3Rpb24gZXh0ZW5kcyBab25lTWFjcm9UYXNrV3JhcHBlcjxSZXF1ZXN0LCBSZXNwb25zZT4gaW1wbGVtZW50c1xuICAgIENvbm5lY3Rpb24ge1xuICByZXNwb25zZTogT2JzZXJ2YWJsZTxSZXNwb25zZT47XG4gIGxhc3RDb25uZWN0aW9uOiBDb25uZWN0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZXF1ZXN0OiBSZXF1ZXN0LCBwcml2YXRlIGJhY2tlbmQ6IFhIUkJhY2tlbmQpIHtcbiAgICBzdXBlcigpO1xuICAgIHZhbGlkYXRlUmVxdWVzdFVybChyZXF1ZXN0LnVybCk7XG4gICAgdGhpcy5yZXNwb25zZSA9IHRoaXMud3JhcChyZXF1ZXN0KTtcbiAgfVxuXG4gIGRlbGVnYXRlKHJlcXVlc3Q6IFJlcXVlc3QpOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XG4gICAgdGhpcy5sYXN0Q29ubmVjdGlvbiA9IHRoaXMuYmFja2VuZC5jcmVhdGVDb25uZWN0aW9uKHJlcXVlc3QpO1xuICAgIHJldHVybiB0aGlzLmxhc3RDb25uZWN0aW9uLnJlc3BvbnNlIGFzIE9ic2VydmFibGU8UmVzcG9uc2U+O1xuICB9XG5cbiAgZ2V0IHJlYWR5U3RhdGUoKTogUmVhZHlTdGF0ZSB7XG4gICAgcmV0dXJuICEhdGhpcy5sYXN0Q29ubmVjdGlvbiA/IHRoaXMubGFzdENvbm5lY3Rpb24ucmVhZHlTdGF0ZSA6IFJlYWR5U3RhdGUuVW5zZW50O1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBab25lTWFjcm9UYXNrQmFja2VuZCBpbXBsZW1lbnRzIENvbm5lY3Rpb25CYWNrZW5kIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBiYWNrZW5kOiBYSFJCYWNrZW5kKSB7fVxuXG4gIGNyZWF0ZUNvbm5lY3Rpb24ocmVxdWVzdDogYW55KTogWm9uZU1hY3JvVGFza0Nvbm5lY3Rpb24ge1xuICAgIHJldHVybiBuZXcgWm9uZU1hY3JvVGFza0Nvbm5lY3Rpb24ocmVxdWVzdCwgdGhpcy5iYWNrZW5kKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgWm9uZUNsaWVudEJhY2tlbmQgZXh0ZW5kc1xuICAgIFpvbmVNYWNyb1Rhc2tXcmFwcGVyPEh0dHBSZXF1ZXN0PGFueT4sIEh0dHBFdmVudDxhbnk+PiBpbXBsZW1lbnRzIEh0dHBCYWNrZW5kIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBiYWNrZW5kOiBIdHRwQmFja2VuZCkgeyBzdXBlcigpOyB9XG5cbiAgaGFuZGxlKHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4pOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7IHJldHVybiB0aGlzLndyYXAocmVxdWVzdCk7IH1cblxuICBwcm90ZWN0ZWQgZGVsZWdhdGUocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55Pik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICByZXR1cm4gdGhpcy5iYWNrZW5kLmhhbmRsZShyZXF1ZXN0KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaHR0cEZhY3RvcnkoeGhyQmFja2VuZDogWEhSQmFja2VuZCwgb3B0aW9uczogUmVxdWVzdE9wdGlvbnMpIHtcbiAgY29uc3QgbWFjcm9CYWNrZW5kID0gbmV3IFpvbmVNYWNyb1Rhc2tCYWNrZW5kKHhockJhY2tlbmQpO1xuICByZXR1cm4gbmV3IEh0dHAobWFjcm9CYWNrZW5kLCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHpvbmVXcmFwcGVkSW50ZXJjZXB0aW5nSGFuZGxlcihiYWNrZW5kOiBIdHRwQmFja2VuZCwgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gIGNvbnN0IHJlYWxCYWNrZW5kOiBIdHRwQmFja2VuZCA9IG5ldyBIdHRwSW50ZXJjZXB0aW5nSGFuZGxlcihiYWNrZW5kLCBpbmplY3Rvcik7XG4gIHJldHVybiBuZXcgWm9uZUNsaWVudEJhY2tlbmQocmVhbEJhY2tlbmQpO1xufVxuXG5leHBvcnQgY29uc3QgU0VSVkVSX0hUVFBfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1xuICB7cHJvdmlkZTogSHR0cCwgdXNlRmFjdG9yeTogaHR0cEZhY3RvcnksIGRlcHM6IFtYSFJCYWNrZW5kLCBSZXF1ZXN0T3B0aW9uc119LFxuICB7cHJvdmlkZTogQnJvd3NlclhociwgdXNlQ2xhc3M6IFNlcnZlclhocn0sIHtwcm92aWRlOiBYU1JGU3RyYXRlZ3ksIHVzZUNsYXNzOiBTZXJ2ZXJYc3JmU3RyYXRlZ3l9LFxuICB7cHJvdmlkZTogWGhyRmFjdG9yeSwgdXNlQ2xhc3M6IFNlcnZlclhocn0sIHtcbiAgICBwcm92aWRlOiBIdHRwSGFuZGxlcixcbiAgICB1c2VGYWN0b3J5OiB6b25lV3JhcHBlZEludGVyY2VwdGluZ0hhbmRsZXIsXG4gICAgZGVwczogW0h0dHBCYWNrZW5kLCBJbmplY3Rvcl1cbiAgfVxuXTtcbiJdfQ==
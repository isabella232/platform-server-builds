import { Injector, Provider } from '@angular/core';
import { BrowserXhr, Connection, ConnectionBackend, Http, ReadyState, Request, RequestOptions, Response, XHRBackend, XSRFStrategy } from '@angular/http';
import { HttpEvent, HttpRequest, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ServerXhr implements BrowserXhr {
    build(): XMLHttpRequest;
    static ngInjectableDef: i0.ɵInjectableDef<ServerXhr>;
}
export declare class ServerXsrfStrategy implements XSRFStrategy {
    configureRequest(req: Request): void;
    static ngInjectableDef: i0.ɵInjectableDef<ServerXsrfStrategy>;
}
export declare abstract class ZoneMacroTaskWrapper<S, R> {
    wrap(request: S): Observable<R>;
    protected abstract delegate(request: S): Observable<R>;
}
export declare class ZoneMacroTaskConnection extends ZoneMacroTaskWrapper<Request, Response> implements Connection {
    request: Request;
    private backend;
    response: Observable<Response>;
    lastConnection: Connection;
    constructor(request: Request, backend: XHRBackend);
    delegate(request: Request): Observable<Response>;
    readonly readyState: ReadyState;
}
export declare class ZoneMacroTaskBackend implements ConnectionBackend {
    private backend;
    constructor(backend: XHRBackend);
    createConnection(request: any): ZoneMacroTaskConnection;
}
export declare class ZoneClientBackend extends ZoneMacroTaskWrapper<HttpRequest<any>, HttpEvent<any>> implements HttpBackend {
    private backend;
    constructor(backend: HttpBackend);
    handle(request: HttpRequest<any>): Observable<HttpEvent<any>>;
    protected delegate(request: HttpRequest<any>): Observable<HttpEvent<any>>;
}
export declare function httpFactory(xhrBackend: XHRBackend, options: RequestOptions): Http;
export declare function zoneWrappedInterceptingHandler(backend: HttpBackend, injector: Injector): ZoneClientBackend;
export declare const SERVER_HTTP_PROVIDERS: Provider[];

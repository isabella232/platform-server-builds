/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-server/src/location.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT, ɵgetDOM as getDOM } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import { Subject } from 'rxjs';
import * as url from 'url';
import { INITIAL_CONFIG } from './tokens';
/**
 * @param {?} urlStr
 * @return {?}
 */
function parseUrl(urlStr) {
    /** @type {?} */
    const parsedUrl = url.parse(urlStr);
    return {
        hostname: parsedUrl.hostname || '',
        protocol: parsedUrl.protocol || '',
        port: parsedUrl.port || '',
        pathname: parsedUrl.pathname || '',
        search: parsedUrl.search || '',
        hash: parsedUrl.hash || '',
    };
}
/**
 * Server-side implementation of URL state. Implements `pathname`, `search`, and `hash`
 * but not the state stack.
 */
let ServerPlatformLocation = /** @class */ (() => {
    /**
     * Server-side implementation of URL state. Implements `pathname`, `search`, and `hash`
     * but not the state stack.
     */
    class ServerPlatformLocation {
        /**
         * @param {?} _doc
         * @param {?} _config
         */
        constructor(_doc, _config) {
            this._doc = _doc;
            this.href = '/';
            this.hostname = '/';
            this.protocol = '/';
            this.port = '/';
            this.pathname = '/';
            this.search = '';
            this.hash = '';
            this._hashUpdate = new Subject();
            /** @type {?} */
            const config = (/** @type {?} */ (_config));
            if (!!config && !!config.url) {
                /** @type {?} */
                const parsedUrl = parseUrl(config.url);
                this.hostname = parsedUrl.hostname;
                this.protocol = parsedUrl.protocol;
                this.port = parsedUrl.port;
                this.pathname = parsedUrl.pathname;
                this.search = parsedUrl.search;
                this.hash = parsedUrl.hash;
            }
        }
        /**
         * @return {?}
         */
        getBaseHrefFromDOM() {
            return (/** @type {?} */ (getDOM().getBaseHref(this._doc)));
        }
        /**
         * @param {?} fn
         * @return {?}
         */
        onPopState(fn) {
            // No-op: a state stack is not implemented, so
            // no events will ever come.
        }
        /**
         * @param {?} fn
         * @return {?}
         */
        onHashChange(fn) {
            this._hashUpdate.subscribe(fn);
        }
        /**
         * @return {?}
         */
        get url() {
            return `${this.pathname}${this.search}${this.hash}`;
        }
        /**
         * @private
         * @param {?} value
         * @param {?} oldUrl
         * @return {?}
         */
        setHash(value, oldUrl) {
            if (this.hash === value) {
                // Don't fire events if the hash has not changed.
                return;
            }
            ((/** @type {?} */ (this))).hash = value;
            /** @type {?} */
            const newUrl = this.url;
            scheduleMicroTask((/**
             * @return {?}
             */
            () => this._hashUpdate.next((/** @type {?} */ ({ type: 'hashchange', state: null, oldUrl, newUrl })))));
        }
        /**
         * @param {?} state
         * @param {?} title
         * @param {?} newUrl
         * @return {?}
         */
        replaceState(state, title, newUrl) {
            /** @type {?} */
            const oldUrl = this.url;
            /** @type {?} */
            const parsedUrl = parseUrl(newUrl);
            ((/** @type {?} */ (this))).pathname = parsedUrl.pathname;
            ((/** @type {?} */ (this))).search = parsedUrl.search;
            this.setHash(parsedUrl.hash, oldUrl);
        }
        /**
         * @param {?} state
         * @param {?} title
         * @param {?} newUrl
         * @return {?}
         */
        pushState(state, title, newUrl) {
            this.replaceState(state, title, newUrl);
        }
        /**
         * @return {?}
         */
        forward() {
            throw new Error('Not implemented');
        }
        /**
         * @return {?}
         */
        back() {
            throw new Error('Not implemented');
        }
        // History API isn't available on server, therefore return undefined
        /**
         * @return {?}
         */
        getState() {
            return undefined;
        }
    }
    ServerPlatformLocation.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ServerPlatformLocation.ctorParameters = () => [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [INITIAL_CONFIG,] }] }
    ];
    return ServerPlatformLocation;
})();
export { ServerPlatformLocation };
if (false) {
    /** @type {?} */
    ServerPlatformLocation.prototype.href;
    /** @type {?} */
    ServerPlatformLocation.prototype.hostname;
    /** @type {?} */
    ServerPlatformLocation.prototype.protocol;
    /** @type {?} */
    ServerPlatformLocation.prototype.port;
    /** @type {?} */
    ServerPlatformLocation.prototype.pathname;
    /** @type {?} */
    ServerPlatformLocation.prototype.search;
    /** @type {?} */
    ServerPlatformLocation.prototype.hash;
    /**
     * @type {?}
     * @private
     */
    ServerPlatformLocation.prototype._hashUpdate;
    /**
     * @type {?}
     * @private
     */
    ServerPlatformLocation.prototype._doc;
}
/**
 * @param {?} fn
 * @return {?}
 */
export function scheduleMicroTask(fn) {
    Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL2xvY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxRQUFRLEVBQWlFLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMzSCxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM3QixPQUFPLEtBQUssR0FBRyxNQUFNLEtBQUssQ0FBQztBQUMzQixPQUFPLEVBQUMsY0FBYyxFQUFpQixNQUFNLFVBQVUsQ0FBQzs7Ozs7QUFHeEQsU0FBUyxRQUFRLENBQUMsTUFBYzs7VUFDeEIsU0FBUyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQ25DLE9BQU87UUFDTCxRQUFRLEVBQUUsU0FBUyxDQUFDLFFBQVEsSUFBSSxFQUFFO1FBQ2xDLFFBQVEsRUFBRSxTQUFTLENBQUMsUUFBUSxJQUFJLEVBQUU7UUFDbEMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJLElBQUksRUFBRTtRQUMxQixRQUFRLEVBQUUsU0FBUyxDQUFDLFFBQVEsSUFBSSxFQUFFO1FBQ2xDLE1BQU0sRUFBRSxTQUFTLENBQUMsTUFBTSxJQUFJLEVBQUU7UUFDOUIsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJLElBQUksRUFBRTtLQUMzQixDQUFDO0FBQ0osQ0FBQzs7Ozs7QUFNRDs7Ozs7SUFBQSxNQUNhLHNCQUFzQjs7Ozs7UUFVakMsWUFDOEIsSUFBUyxFQUFzQyxPQUFZO1lBQTNELFNBQUksR0FBSixJQUFJLENBQUs7WUFWdkIsU0FBSSxHQUFXLEdBQUcsQ0FBQztZQUNuQixhQUFRLEdBQVcsR0FBRyxDQUFDO1lBQ3ZC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QUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNyQyxDQUFDOzs7O1FBRUQsSUFBSTtZQUNGLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNyQyxDQUFDOzs7OztRQUdELFFBQVE7WUFDTixPQUFPLFNBQVMsQ0FBQztRQUNuQixDQUFDOzs7Z0JBN0VGLFVBQVU7Ozs7Z0RBWUosTUFBTSxTQUFDLFFBQVE7Z0RBQXNCLFFBQVEsWUFBSSxNQUFNLFNBQUMsY0FBYzs7SUFrRTdFLDZCQUFDO0tBQUE7U0E3RVksc0JBQXNCOzs7SUFDakMsc0NBQW1DOztJQUNuQywwQ0FBdUM7O0lBQ3ZDLDBDQUF1Qzs7SUFDdkMsc0NBQW1DOztJQUNuQywwQ0FBdUM7O0lBQ3ZDLHdDQUFvQzs7SUFDcEMsc0NBQWtDOzs7OztJQUNsQyw2Q0FBeUQ7Ozs7O0lBR3JELHNDQUFtQzs7Ozs7O0FBb0V6QyxNQUFNLFVBQVUsaUJBQWlCLENBQUMsRUFBWTtJQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzFELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlQsIExvY2F0aW9uQ2hhbmdlRXZlbnQsIExvY2F0aW9uQ2hhbmdlTGlzdGVuZXIsIFBsYXRmb3JtTG9jYXRpb24sIMm1Z2V0RE9NIGFzIGdldERPTX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0ICogYXMgdXJsIGZyb20gJ3VybCc7XG5pbXBvcnQge0lOSVRJQUxfQ09ORklHLCBQbGF0Zm9ybUNvbmZpZ30gZnJvbSAnLi90b2tlbnMnO1xuXG5cbmZ1bmN0aW9uIHBhcnNlVXJsKHVybFN0cjogc3RyaW5nKSB7XG4gIGNvbnN0IHBhcnNlZFVybCA9IHVybC5wYXJzZSh1cmxTdHIpO1xuICByZXR1cm4ge1xuICAgIGhvc3RuYW1lOiBwYXJzZWRVcmwuaG9zdG5hbWUgfHwgJycsXG4gICAgcHJvdG9jb2w6IHBhcnNlZFVybC5wcm90b2NvbCB8fCAnJyxcbiAgICBwb3J0OiBwYXJzZWRVcmwucG9ydCB8fCAnJyxcbiAgICBwYXRobmFtZTogcGFyc2VkVXJsLnBhdGhuYW1lIHx8ICcnLFxuICAgIHNlYXJjaDogcGFyc2VkVXJsLnNlYXJjaCB8fCAnJyxcbiAgICBoYXNoOiBwYXJzZWRVcmwuaGFzaCB8fCAnJyxcbiAgfTtcbn1cblxuLyoqXG4gKiBTZXJ2ZXItc2lkZSBpbXBsZW1lbnRhdGlvbiBvZiBVUkwgc3RhdGUuIEltcGxlbWVudHMgYHBhdGhuYW1lYCwgYHNlYXJjaGAsIGFuZCBgaGFzaGBcbiAqIGJ1dCBub3QgdGhlIHN0YXRlIHN0YWNrLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VydmVyUGxhdGZvcm1Mb2NhdGlvbiBpbXBsZW1lbnRzIFBsYXRmb3JtTG9jYXRpb24ge1xuICBwdWJsaWMgcmVhZG9ubHkgaHJlZjogc3RyaW5nID0gJy8nO1xuICBwdWJsaWMgcmVhZG9ubHkgaG9zdG5hbWU6IHN0cmluZyA9ICcvJztcbiAgcHVibGljIHJlYWRvbmx5IHByb3RvY29sOiBzdHJpbmcgPSAnLyc7XG4gIHB1YmxpYyByZWFkb25seSBwb3J0OiBzdHJpbmcgPSAnLyc7XG4gIHB1YmxpYyByZWFkb25seSBwYXRobmFtZTogc3RyaW5nID0gJy8nO1xuICBwdWJsaWMgcmVhZG9ubHkgc2VhcmNoOiBzdHJpbmcgPSAnJztcbiAgcHVibGljIHJlYWRvbmx5IGhhc2g6IHN0cmluZyA9ICcnO1xuICBwcml2YXRlIF9oYXNoVXBkYXRlID0gbmV3IFN1YmplY3Q8TG9jYXRpb25DaGFuZ2VFdmVudD4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvYzogYW55LCBAT3B0aW9uYWwoKSBASW5qZWN0KElOSVRJQUxfQ09ORklHKSBfY29uZmlnOiBhbnkpIHtcbiAgICBjb25zdCBjb25maWcgPSBfY29uZmlnIGFzIFBsYXRmb3JtQ29uZmlnIHwgbnVsbDtcbiAgICBpZiAoISFjb25maWcgJiYgISFjb25maWcudXJsKSB7XG4gICAgICBjb25zdCBwYXJzZWRVcmwgPSBwYXJzZVVybChjb25maWcudXJsKTtcbiAgICAgIHRoaXMuaG9zdG5hbWUgPSBwYXJzZWRVcmwuaG9zdG5hbWU7XG4gICAgICB0aGlzLnByb3RvY29sID0gcGFyc2VkVXJsLnByb3RvY29sO1xuICAgICAgdGhpcy5wb3J0ID0gcGFyc2VkVXJsLnBvcnQ7XG4gICAgICB0aGlzLnBhdGhuYW1lID0gcGFyc2VkVXJsLnBhdGhuYW1lO1xuICAgICAgdGhpcy5zZWFyY2ggPSBwYXJzZWRVcmwuc2VhcmNoO1xuICAgICAgdGhpcy5oYXNoID0gcGFyc2VkVXJsLmhhc2g7XG4gICAgfVxuICB9XG5cbiAgZ2V0QmFzZUhyZWZGcm9tRE9NKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGdldERPTSgpLmdldEJhc2VIcmVmKHRoaXMuX2RvYykhO1xuICB9XG5cbiAgb25Qb3BTdGF0ZShmbjogTG9jYXRpb25DaGFuZ2VMaXN0ZW5lcik6IHZvaWQge1xuICAgIC8vIE5vLW9wOiBhIHN0YXRlIHN0YWNrIGlzIG5vdCBpbXBsZW1lbnRlZCwgc29cbiAgICAvLyBubyBldmVudHMgd2lsbCBldmVyIGNvbWUuXG4gIH1cblxuICBvbkhhc2hDaGFuZ2UoZm46IExvY2F0aW9uQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9oYXNoVXBkYXRlLnN1YnNjcmliZShmbik7XG4gIH1cblxuICBnZXQgdXJsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke3RoaXMucGF0aG5hbWV9JHt0aGlzLnNlYXJjaH0ke3RoaXMuaGFzaH1gO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRIYXNoKHZhbHVlOiBzdHJpbmcsIG9sZFVybDogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuaGFzaCA9PT0gdmFsdWUpIHtcbiAgICAgIC8vIERvbid0IGZpcmUgZXZlbnRzIGlmIHRoZSBoYXNoIGhhcyBub3QgY2hhbmdlZC5cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgKHRoaXMgYXMge2hhc2g6IHN0cmluZ30pLmhhc2ggPSB2YWx1ZTtcbiAgICBjb25zdCBuZXdVcmwgPSB0aGlzLnVybDtcbiAgICBzY2hlZHVsZU1pY3JvVGFzayhcbiAgICAgICAgKCkgPT4gdGhpcy5faGFzaFVwZGF0ZS5uZXh0KFxuICAgICAgICAgICAge3R5cGU6ICdoYXNoY2hhbmdlJywgc3RhdGU6IG51bGwsIG9sZFVybCwgbmV3VXJsfSBhcyBMb2NhdGlvbkNoYW5nZUV2ZW50KSk7XG4gIH1cblxuICByZXBsYWNlU3RhdGUoc3RhdGU6IGFueSwgdGl0bGU6IHN0cmluZywgbmV3VXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBvbGRVcmwgPSB0aGlzLnVybDtcbiAgICBjb25zdCBwYXJzZWRVcmwgPSBwYXJzZVVybChuZXdVcmwpO1xuICAgICh0aGlzIGFzIHtwYXRobmFtZTogc3RyaW5nfSkucGF0aG5hbWUgPSBwYXJzZWRVcmwucGF0aG5hbWU7XG4gICAgKHRoaXMgYXMge3NlYXJjaDogc3RyaW5nfSkuc2VhcmNoID0gcGFyc2VkVXJsLnNlYXJjaDtcbiAgICB0aGlzLnNldEhhc2gocGFyc2VkVXJsLmhhc2gsIG9sZFVybCk7XG4gIH1cblxuICBwdXNoU3RhdGUoc3RhdGU6IGFueSwgdGl0bGU6IHN0cmluZywgbmV3VXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnJlcGxhY2VTdGF0ZShzdGF0ZSwgdGl0bGUsIG5ld1VybCk7XG4gIH1cblxuICBmb3J3YXJkKCk6IHZvaWQge1xuICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XG4gIH1cblxuICBiYWNrKCk6IHZvaWQge1xuICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XG4gIH1cblxuICAvLyBIaXN0b3J5IEFQSSBpc24ndCBhdmFpbGFibGUgb24gc2VydmVyLCB0aGVyZWZvcmUgcmV0dXJuIHVuZGVmaW5lZFxuICBnZXRTdGF0ZSgpOiB1bmtub3duIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzY2hlZHVsZU1pY3JvVGFzayhmbjogRnVuY3Rpb24pIHtcbiAgWm9uZS5jdXJyZW50LnNjaGVkdWxlTWljcm9UYXNrKCdzY2hlZHVsZU1pY3JvdGFzaycsIGZuKTtcbn1cbiJdfQ==
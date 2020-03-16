/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { InjectionToken } from '@angular/core';
/**
 * The DI token for setting the initial config for the platform.
 *
 * @publicApi
 */
export var INITIAL_CONFIG = new InjectionToken('Server.INITIAL_CONFIG');
/**
 * A function that will be executed when calling `renderModuleFactory` or `renderModule` just
 * before current platform state is rendered to string.
 *
 * @publicApi
 */
export var BEFORE_APP_SERIALIZED = new InjectionToken('Server.RENDER_MODULE_HOOK');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tc2VydmVyL3NyYy90b2tlbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQVk3Qzs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLElBQU0sY0FBYyxHQUFHLElBQUksY0FBYyxDQUFpQix1QkFBdUIsQ0FBQyxDQUFDO0FBRTFGOzs7OztHQUtHO0FBQ0gsTUFBTSxDQUFDLElBQU0scUJBQXFCLEdBQzlCLElBQUksY0FBYyxDQUFvQywyQkFBMkIsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGlvblRva2VufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBDb25maWcgb2JqZWN0IHBhc3NlZCB0byBpbml0aWFsaXplIHRoZSBwbGF0Zm9ybS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGxhdGZvcm1Db25maWcge1xuICBkb2N1bWVudD86IHN0cmluZztcbiAgdXJsPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIFRoZSBESSB0b2tlbiBmb3Igc2V0dGluZyB0aGUgaW5pdGlhbCBjb25maWcgZm9yIHRoZSBwbGF0Zm9ybS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBJTklUSUFMX0NPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxQbGF0Zm9ybUNvbmZpZz4oJ1NlcnZlci5JTklUSUFMX0NPTkZJRycpO1xuXG4vKipcbiAqIEEgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGV4ZWN1dGVkIHdoZW4gY2FsbGluZyBgcmVuZGVyTW9kdWxlRmFjdG9yeWAgb3IgYHJlbmRlck1vZHVsZWAganVzdFxuICogYmVmb3JlIGN1cnJlbnQgcGxhdGZvcm0gc3RhdGUgaXMgcmVuZGVyZWQgdG8gc3RyaW5nLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IEJFRk9SRV9BUFBfU0VSSUFMSVpFRCA9XG4gICAgbmV3IEluamVjdGlvblRva2VuPEFycmF5PCgpID0+IHZvaWQgfCBQcm9taXNlPHZvaWQ+Pj4oJ1NlcnZlci5SRU5ERVJfTU9EVUxFX0hPT0snKTtcbiJdfQ==
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileNotFoundError = void 0;
var http_error_1 = require("./http-error");
var ProfileNotFoundError = /** @class */ (function (_super) {
    __extends(ProfileNotFoundError, _super);
    function ProfileNotFoundError() {
        return _super.call(this, 404, 'User profile not found') || this;
    }
    return ProfileNotFoundError;
}(http_error_1.HttpError));
exports.ProfileNotFoundError = ProfileNotFoundError;
//# sourceMappingURL=profile-not-found-error.js.map
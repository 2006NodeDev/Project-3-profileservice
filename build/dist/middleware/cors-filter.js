"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsFilter = void 0;
function corsFilter(req, res, next) {
    res.header('Access-Control-Allow-Origin', "" + req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    }
    else {
        next();
    }
}
exports.corsFilter = corsFilter;
//# sourceMappingURL=cors-filter.js.map
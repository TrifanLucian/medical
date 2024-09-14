"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flattenString = void 0;
function flattenString(input) {
    // Remove all non-alphanumeric characters and spaces, then convert to lowercase
    return input.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}
exports.flattenString = flattenString;
//# sourceMappingURL=flattenString.js.map
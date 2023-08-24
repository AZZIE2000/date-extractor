"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
exports.default = {
    typeString: { type: constants_1.default.STRING_TYPE, nullable: true },
    typeStringOrNumber: { type: [constants_1.default.STRING_TYPE, constants_1.default.NUMBER_TYPE] },
    typeNumber: { type: constants_1.default.NUMBER_TYPE, nullable: true },
    typeObject: { type: constants_1.default.OBJECT_TYPE, nullable: true },
    typeBoolean: { type: constants_1.default.BOOL_TYPE, nullable: true },
    typeArray: { type: constants_1.default.ARRAY_TYPE, nullable: true },
    createObjectSchemaType: function (obj_type, props) {
        return {
            type: obj_type,
            properties: __assign({}, props),
        };
    },
};

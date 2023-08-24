'use strict';
module.exports = {
    isUsingNode: function () {
        var usingNode = false;
        if (typeof process === 'object') {
            if (typeof process.versions === 'object') {
                if (typeof process.versions.node !== 'undefined') {
                    usingNode = true;
                }
            }
        }
        return usingNode;
    },
};

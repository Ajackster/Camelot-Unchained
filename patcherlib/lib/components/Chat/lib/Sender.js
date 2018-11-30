"use strict";
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var Sender = /** @class */function () {
    function Sender(id, sender, senderName, isCSE) {
        this.id = id;
        this.sender = sender;
        this.senderName = senderName;
        this.isCSE = isCSE;
    }
    return Sender;
}();
exports.default = Sender;
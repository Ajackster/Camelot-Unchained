"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
var __1 = require("../../../");
var React = require("react");
function fromText(text, keygen) {
    return [React.createElement("span", { key: keygen(), className: 'chat-room-link', onClick: function onClick() {
            __1.events.fire('chat-show-room', text.substr(1));
        } }, text.substr(1))];
}
function createRegExp() {
    return (/\B#[\S]+/g
    );
}
exports.default = {
    fromText: fromText,
    createRegExp: createRegExp
};
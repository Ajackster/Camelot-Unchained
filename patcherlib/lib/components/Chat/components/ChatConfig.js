"use strict";
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("../../../");
var chat_defaults_1 = require("./settings/chat-defaults");
var ChatConfig = /** @class */function () {
    function ChatConfig() {
        var _this = this;
        this.SCROLLBACK_BUFFER_SIZE = 100;
        this.SHOW_COLORS = false;
        this.SHOW_EMOTICONS = false;
        this.SHOW_MARKDOWN = false;
        this.EMBED_IMAGES = false;
        this.EMBED_VIDEOS = false;
        this.JOIN_PARTS = false;
        this.TIMESTAMPS = false;
        this.NICK = '';
        this.HIGHLIGHTS = ['alpha', 'beta', 'CSE'];
        this.setNick = function (nick) {
            _this.NICK = nick;
        };
        this.getHighlights = function () {
            return _this.HIGHLIGHTS.concat(_this.NICK);
        };
        this.refresh = function () {
            var LOAD = function LOAD(option) {
                return JSON.parse(localStorage.getItem("" + chat_defaults_1.prefixes.display + option.key));
            };
            _this.SHOW_COLORS = LOAD(chat_defaults_1.display.showColors);
            _this.SHOW_EMOTICONS = LOAD(chat_defaults_1.display.showEmoticons);
            _this.SHOW_MARKDOWN = LOAD(chat_defaults_1.display.showMarkdown);
            _this.EMBED_IMAGES = LOAD(chat_defaults_1.display.embedImages);
            _this.EMBED_VIDEOS = LOAD(chat_defaults_1.display.embedVideos);
            _this.JOIN_PARTS = LOAD(chat_defaults_1.display.joinParts);
            _this.TIMESTAMPS = LOAD(chat_defaults_1.display.timestamps);
            __1.events.fire('chat-options-update', _this);
        };
        this.refresh();
    }
    return ChatConfig;
}();
exports.ChatConfig = ChatConfig;
exports.chatConfig = new ChatConfig();
/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from 'react';
import { utils } from '@csegames/camelot-unchained';

import HUDNav from 'components/HUDNav/index';
import { LayoutMode } from 'components/HUDDrag';
import HUDZOrder from '../HUDZOrder';

const { Orientation } = utils;

const hideClientControlledUI = () => {
  game.trigger('navigate', 'lockui');
};

export default {
  position: {
    x: {
      anchor: 0,
      offset: 0,
    },
    y: {
      anchor: 0,
      offset: 0,
    },
    size: {
      width: 900,
      height: 200,
    },
    scale: 1,
    opacity: 1,
    visibility: true,
    zOrder: HUDZOrder.HUDNav,
    layoutMode: LayoutMode.GRID,
  },
  dragOptions: {
    lockHeight: true,
    lockWidth: true,
  },
  component: HUDNav,
  props: {
    orientation: Orientation.HORIZONTAL,
    items: [
      {
        name: 'console',
        tooltip: 'Console',
        iconClass: 'fa-terminal',
        icon: (
          <span>
            <i className='fa fa-terminal fa-stack-1x fa-inverse'></i>
          </span>
        ),
        hidden: false,
        onClick: () => {
          game.trigger('navigate', 'console');
        },
      },
      {
        name: 'gamemenu',
        tooltip: 'Game Menu',
        iconClass: 'fa-cog',
        icon: (
          <span>
            <i className='fa fa-cog fa-stack-1x fa-inverse'></i>
          </span>
        ),
        hidden: false,
        onClick: () => {
          game.trigger('navigate', 'gamemenu'),
          hideClientControlledUI();
        },
      },
      {
        name: 'building',
        tooltip: 'Toggle Building Mode',
        iconClass: 'fa-cube',
        icon: (
          <span>
            <i className='fa fa-cube fa-stack-1x fa-inverse'></i>
          </span>
        ),
        hidden: false,
        onClick: () => {
          game.trigger('navigate', 'building');
          game.triggerKeyAction(game.keyActions.UIToggleBuildingMode);
        },
      },
      {
        name: 'character',
        tooltip: 'Character',
        iconClass: 'fa-user',
        icon: (
          <span>
            <i className='fa fa-user fa-stack-1x fa-inverse'></i>
          </span>
        ),
        hidden: false,
        onClick: () => {
          game.trigger('navigate', 'character');
          hideClientControlledUI();
        },
      },
      {
        name: 'equippedgear',
        tooltip: 'Equipped Items',
        iconClass: 'fa-shield',
        icon: (
          <span>
            <i className='fa fa-shield fa-stack-1x'></i>
          </span>
        ),
        hidden: false,
        onClick: () => {
          game.trigger('navigate', 'equippedgear-left');
          game.trigger('navigate', 'inventory-right');
          hideClientControlledUI();
        },
      },
      {
        name: 'inventory',
        tooltip: 'Inventory',
        iconClass: 'fa-briefcase',
        icon: (
          <span>
            <i className='fa fa-briefcase fa-stack-1x fa-inverse'></i>
          </span>
        ),
        hidden: false,
        onClick: () => {
          game.trigger('navigate', 'equippedgear-left');
          game.trigger('navigate', 'inventory-right');
          hideClientControlledUI();
        },
      },
      // {
      //   name: 'spellbook',
      //   tooltip: 'Spellbook',
      //   iconClass: 'fa-book',
      //   icon: (
      //     <span>
      //       <i className='fa fa-book fa-stack-1x fa-inverse'></i>
      //     </span>
      //   ),
      //   hidden: false,
      //   onClick: () => {
      //     game.trigger('navigate', 'spellbook');
      //     client.PlaySoundEvent(soundEvents.PLAY_UI_SPELLBOOK_OPEN);
      //     client.ShowUI('spellbook');
      //   },
      // },
      // {
      //   name: 'skillbuilder',
      //   tooltip: 'Skill Builder',
      //   iconClass: 'fa-rotate-270 fa-sitemap',
      //   icon: (
      //     <span>
      //       <i className='fa fa-rotate-270 fa-sitemap fa-stack-1x fa-inverse'></i>
      //     </span>
      //   ),
      //   hidden: false,
      //   onClick: () => {
      //     game.trigger('navigate', 'skillbuilder');
      //     client.ShowUI('ability-builder');
      //   },
      // },
      {
        name: 'crafting',
        tooltip: 'Crafting',
        iconClass: 'fa-flask',
        icon: (
          <span>
            <i className='fa fa-flask fa-stack-1x fa-inverse'></i>
          </span>
        ),
        hidden: false,
        onClick: () => {
          game.trigger('navigate', 'crafting');
        },
      },
      {
        name: 'nearby-plot',
        tooltip: 'Nearby Plot',
        iconClass: 'fa-map-signs',
        icon: (
          <span>
            <i className='fa fa-map-signs fa-stack-1x fa-inverse'></i>
          </span>
        ),
        hidden: false,
        onClick: () => {
          game.sendSlashCommand('plot showui --nearby');
        },
      },
      {
        name: 'gameinfo',
        tooltip: 'Game Info',
        iconClass: 'fa-tasks',
        icon: (
          <span>
            <i className='fa fa-info fa-stack-1x'></i>
          </span>
        ),
        hidden: false,
        onClick: () => {
          game.trigger('navigate', 'gameinfo');
        },
      },
      {
        name: 'owned-plot',
        tooltip: 'Owned Plot',
        iconClass: 'fa-home',
        icon: (
          <span>
            <i className='fa fa-home fa-stack-1x fa-inverse'></i>
          </span>
        ),
        hidden: false,
        onClick: () => {
          game.sendSlashCommand('plot showui --owned');
        },
      },
      {
        name: 'map',
        tooltip: 'World Map',
        iconClass: 'fa-map',
        icon: (
          <span>
            <i className='fa fa-map fa-stack-1x fa-inverse'></i>
          </span>
        ),
        hidden: false,
        onClick: () => {
          game.trigger('navigate', 'map');
        },
      },
      // {
      //   name: 'social',
      //   tooltip: 'Social',
      //   iconClass: 'fa-users',
      //   icon: (
      //     <span>
      //       <i className='fa fa-users fa-stack-1x fa-inverse'></i>
      //     </span>
      //   ),
      //   hidden: false,
      //   onClick: () => {
      //     game.trigger('navigate', 'social');
      //     hideClientControlledUI();
      //   },
      // },
      // {
      //   name: 'plotcontrol',
      //   tooltip: 'Plot Controller',
      //   iconClass: 'fa-map-signs',
      //   icon: (
      //     <span>
      //       <i className='fa fa-map-signs fa-stack-1x fa-inverse'></i>
      //     </span>
      //   ),
      //   hidden: true,
      //   onClick: () => {
      //     game.trigger('navigate', 'plotcontrol');
      //   },
      // },
      {
        name: 'scenario',
        tooltip: 'Scenario Management',
        iconClass: 'fa-gamepad',
        icon: (
          <span>
            <i className='fa fa-gamepad fa-stack-1x fa-inverse'></i>
          </span>
        ),
        hidden: false,
        onClick: () => {
          game.sendSlashCommand('showscenarioui');
        },
      },
      {
        name: 'scenario-results',
        tooltip: 'Scenario Results',
        iconClass: 'fa-fort-awesome',
        icon: (
          <span>
            <i className='fa fa-fort-awesome fa-stack-1x fa-inverse'></i>
          </span>
        ),
        hidden: false,
        onClick: () => {
          game.trigger('navigate', 'scenario-results');
        },
      },
      {
        name: 'progression',
        tooltip: 'Progression',
        iconClass: 'fa-line-chart',
        icon: (
          <span>
            <i className='fa fa-line-chart fa-stack-1x fa-inverse'></i>
          </span>
        ),
        hidden: false,
        onClick: () => {
          game.trigger('navigate', 'progression');
        },
      },
      // {
      //   name: 'chat',
      //   tooltip: 'Show/Hide Chat',
      //   iconClass: 'fa-comment',
      //   icon: (
      //     <span>
      //       <i className='fa fa-comment fa-stack-1x fa-inverse'></i>
      //     </span>
      //   ),
      //   hidden: false,
      //   onClick: () => {
      //     game.trigger('navigate', 'chat');
      //   }
      // },
      {
        name: 'ui',
        tooltip: 'Toggle UI Edit Mode',
        iconClass: 'fa-lock',
        icon: (
          <span>
            <i className='fa fa-lock fa-stack-1x fa-inverse'></i>
          </span>
        ),
        hidden: false,
        onClick: () => {
          game.trigger('navigate', 'ui');
        },
      },
      // {
      //   name: 'reset',
      //   tooltip: 'Reset UI layout',
      //   iconClass: 'fa-clone',
      //   icon: (
      //     <span>
      //       <i className='fa fa-clone fa-stack-1x fa-inverse'></i>
      //     </span>
      //   ),
      //   hidden: false,
      //   onClick: () => {
      //     game.trigger('navigate', 'reset');
      //   },
      // },
      {
        name: 'reloadui',
        tooltip: 'Reload UI',
        iconClass: 'fa-refresh',
        icon: (
          <span>
            <i className='fa fa-refresh fa-stack-1x fa-inverse'></i>
          </span>
        ),
        hidden: false,
        onClick: () => {
          game.reloadUI();
        },
      },
    ],
  },
};

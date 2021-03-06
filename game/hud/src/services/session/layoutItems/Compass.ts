/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { LayoutMode, Edge } from 'components/HUDDrag';
import Compass from 'components/Compass';
import HUDZOrder from '../HUDZOrder';

export default {
  position: {
    x: {
      anchor: 5,
      offset: -300,
    },
    y: {
      anchor: Edge.TOP,
      offset: 50,
    },
    size: {
      width: 600,
      height: 38,
    },
    scale: 1,
    opacity: 1,
    visibility: true,
    zOrder: HUDZOrder.Compass,
    layoutMode: LayoutMode.GRID,
  },
  dragOptions: {
    lockHeight: true,
    lockWidth: false,
  },
  component: Compass,
  props: {},
};

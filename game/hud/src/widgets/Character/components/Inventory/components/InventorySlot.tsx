/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @Author: JB (jb@codecorsair.com)
 * @Date: 2017-07-10 18:06:20
 * @Last Modified by: Andrew Jackson (jacksonal300@gmail.com)
 * @Last Modified time: 2017-07-19 16:14:20
 */

import * as React from 'react';

import { ContextMenu, Tooltip, client, events } from 'camelot-unchained';
import { StyleDeclaration, StyleSheet, css } from 'aphrodite';
import TooltipContent, { defaultTooltipStyle } from '../../TooltipContent';

import ContextMenuContent from './ContextMenuContent';
import EmptyItem from '../../EmptyItem';
import ItemStack from '../../ItemStack';
import CraftingItem from './CraftingItem';
import { InventoryItemFragment } from '../../../../../gqlInterfaces';
import { getContainerHeaderInfo } from './InventoryBase';
import eventNames, { EquipItemCallback } from '../../../lib/eventNames';

export interface InventorySlotStyle extends StyleDeclaration {
  InventorySlot: React.CSSProperties;
  itemContainer: React.CSSProperties;
  itemIcon: React.CSSProperties;
}

export const slotDimensions = 60;

export const defaultInventorySlotStyle: InventorySlotStyle = {
  InventorySlot: {
    display: 'inline-block',
  },

  itemContainer: {
    width: `${slotDimensions}px`,
    height: `${slotDimensions}px`,
    margin: '2.5px',
    border: '1px solid rgba(200, 200, 200, 0.3)',
    background: 'rgba(200, 200, 200, 0.1)',
    display: 'inline-block',
  },

  itemIcon: {
    verticalAlign: 'baseline',
    backgroundSize: 'cover',
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
  },
};

export enum SlotType {
  Empty,
  // Standard - item slot for a general item
  Standard,
  // Stack - item slot with a stack of items
  Stack,
  // Container - a standard container
  Container,
  // CraftingContainer - item slot which accepts an array of crafting items
  // that will be implicitly containered together
  CraftingContainer,
  // CraftingItem - item slots in an item container
  CraftingItem,
}

export interface InventorySlotItemDef {
  itemID?: string;
  slotType: SlotType;
  groupStackHashID?: string;
  stackedItems?: InventoryItemFragment[];
  item?: InventoryItemFragment;
  icon: string;
}

export interface CraftingSlotItemDef {
  itemID?: string;
  slotType: SlotType;
  groupStackHashID?: string;
  icon: string;
  quality?: number;
  itemCount?: number;
}

export interface InventorySlotProps {
  styles?: Partial<InventorySlotStyle>;
  item: InventorySlotItemDef & CraftingSlotItemDef;
  itemIndex: number;
  onToggleContainer: (index: number, itemId: string) => void;
}

export interface InventorySlotState {
  showTooltip: boolean;
  contextMenuVisible: boolean;
}

export class InventorySlot extends React.Component<InventorySlotProps, InventorySlotState> {
  private mouseOver: boolean;
  
  constructor(props: InventorySlotProps) {
    super(props);
    this.state = {
      showTooltip: false,
      contextMenuVisible: false,
    };
  }

  public render() {
    const { item } = this.props;
    const ss = StyleSheet.create(defaultInventorySlotStyle);
    const custom = StyleSheet.create(this.props.styles || {});
    
    const usesContainer = item.slotType === SlotType.Container 
      || item.slotType === SlotType.CraftingContainer;

    let itemComponent: JSX.Element;
    const placeholderIcon = 'images/unknown-item.jpg';
    switch (item.slotType) {
      case SlotType.Standard: {
        itemComponent = <img src={item.icon || placeholderIcon} className={css(ss.itemIcon, custom.itemIcon)} />;
        break;
      }
      case SlotType.Stack: {
        itemComponent = <ItemStack count={item.stackedItems.length} icon={item.icon} />;
        break;
      }
      case SlotType.CraftingContainer: {
        itemComponent = <ItemStack count={getContainerHeaderInfo(item.stackedItems).totalUnitCount} icon={item.icon} />;
        break;
      }
      case SlotType.CraftingItem: {
        itemComponent =
          <CraftingItem
            count={item.itemCount}
            quality={item.quality}
            icon={item.icon}
          />;
      }
    }
    
    const id = item.stackedItems ? item.stackedItems[0].id : item.itemID;
    
    return id ? (
      <div
        className={css(ss.InventorySlot, custom.InventorySlot)}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}>
        <Tooltip
          show={this.state.showTooltip}
          styles={defaultTooltipStyle}
          content={() =>
            <TooltipContent
              itemId={id}
              shouldOnlyShowPrimaryInfo={item.slotType === SlotType.CraftingContainer}
              instructions={this.props.item.item && this.props.item.item.staticDefinition.gearSlotSets.length > 0 ?
                'Double click to equip or right click to open context menu' : ''}
            />
        }>
          <ContextMenu
            onContextMenuContentShow={this.onContextMenuContentShow}
            onContextMenuContentHide={this.onContextMenuContentHide}
            content={(props) => <ContextMenuContent itemId={id} contextMenuProps={props} />}
          >
            <div
              className={css(ss.itemContainer, custom.itemContainer)}
              onClick={usesContainer ? this.onToggleContainer : null}
              onDoubleClick={this.onEquipItem}>
                {itemComponent}
            </div>
          </ContextMenu>
        </Tooltip>
      </div>
    ) :
    <div className={css(ss.itemContainer, custom.itemContainer)}>
      <EmptyItem />
    </div>;
  }

  private onToggleContainer = () => {
    this.props.onToggleContainer(this.props.itemIndex, this.props.item.itemID);
  }

  private onContextMenuContentShow = () => {
    this.setState({ showTooltip: false, contextMenuVisible: true });
  }

  private onContextMenuContentHide = () => {
    if (this.mouseOver) {
      this.setState({ showTooltip: true, contextMenuVisible: false });
    } else {
      this.setState({ contextMenuVisible: false });
    }
  }

  private onMouseEnter = () => {
    this.mouseOver = true;
    if (!this.state.contextMenuVisible) {
      this.setState({ showTooltip: true });
    }
    if (this.props.item.item && this.props.item.item.staticDefinition.gearSlotSets.length > 0) {
      events.fire(eventNames.onHighlightSlots, this.props.item.item.staticDefinition.gearSlotSets[0].gearSlots);
    }
  }

  private onMouseLeave = () => {
    this.mouseOver = false;
    this.setState({ showTooltip: false });
    events.fire(eventNames.onDehighlightSlots);
  }

  private onEquipItem = () => {
    if (this.props.item.item && this.props.item.item.staticDefinition.gearSlotSets.length > 0) {
      const payload: EquipItemCallback = {
        inventoryItem: this.props.item.item as any,
        willEquipTo: this.props.item.item.staticDefinition.gearSlotSets[0].gearSlots,
      };
      client.EquipItem(this.props.item.itemID);
      events.fire(eventNames.onEquipItem, payload);
      events.fire(eventNames.onDehighlightSlots);
      this.setState({ showTooltip: false });
    }
  }
}

export default InventorySlot;
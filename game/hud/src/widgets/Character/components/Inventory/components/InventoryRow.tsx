/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @Author: JB (jb@codecorsair.com)
 * @Date: 2017-07-10 14:56:32
 * @Last Modified by: Andrew Jackson (jacksonal300@gmail.com)
 * @Last Modified time: 2017-07-19 16:14:20
 */

import * as React from 'react';

import { InventorySlot, InventorySlotItemDef } from './InventorySlot';
import { StyleDeclaration, StyleSheet, css } from 'aphrodite';

import { InventoryContainer } from './InventoryContainer';
import { colors } from '../../../lib/constants';

export interface InventoryRowStyle extends StyleDeclaration {
  InventoryRow: React.CSSProperties;
  openContainerItemSlot: React.CSSProperties;
  row: React.CSSProperties;
}

export const defaultInventoryRowStyle: InventoryRowStyle = {
  InventoryRow: {
    margin: 'auto',
  },

  openContainerItemSlot: {
    position: 'relative',
    top: '3px',
    boxShadow: `0px 0px 3px 2px ${colors.inventoryContainerBackgroundColor}`,
    border: `1px solid ${colors.inventoryContainerBackgroundColor}`,
  },

  row: {
    
  },
};

export interface InventoryRowProps {
  styles?: Partial<InventoryRowStyle>;
  items: InventorySlotItemDef[];
}

export interface InventoryRowState {
  // if true show the inventory container (default false)
  showContainer: boolean;
  // the index into the props items array of which item the container
  // is open for
  containerItemIndex: number;
}

export class InventoryRow extends React.Component<InventoryRowProps, InventoryRowState> {
  constructor(props: InventoryRowProps) {
    super(props);
    this.state = {
      showContainer: false,
      containerItemIndex: -1,
    };
  }

  public render() {
    const ss = StyleSheet.create(defaultInventoryRowStyle);
    const custom = StyleSheet.create(this.props.styles || {});

    return (
      <div className={css(ss.InventoryRow, custom.InventoryRow)}>
        <div className={css(ss.row, custom.row)}>
          {this.props.items.map((slotDef, index) => (
            <InventorySlot key={index}
                            styles={{
                              InventorySlot: index === this.state.containerItemIndex ?
                                defaultInventoryRowStyle.openContainerItemSlot : {},
                            }}
                            item={slotDef}
                            itemIndex={index}
                            onToggleContainer={this.toggleContainer} />
          ))}
        </div>
        <div className={css(ss.row, custom.row)}>
          {this.state.showContainer ? (
            <InventoryContainer item={this.props.items[this.state.containerItemIndex]}
                                searchValue={''}
                                activeFilters={null}
                                slotsPerRow={this.props.items.length}
                                onCloseClick={this.hideContainer} />
          ) : null}
        </div>
      </div>
    );
  }

  public componentWillReceiveProps(nextProps: InventoryRowProps, nextState: InventoryRowState) {
    if (this.state.showContainer && nextProps.items[this.state.containerItemIndex]
      && nextProps.items[this.state.containerItemIndex].stackedItems) return;

    if (this.state.showContainer) this.toggleContainer(this.state.containerItemIndex);
  }

  private toggleContainer = (index: number) => {
    // Hide
    if (this.state.showContainer && this.state.containerItemIndex === index) {
      this.hideContainer();
      return;
    }

    // Show
    this.showContainer(index);
  }

  private hideContainer = () => {
    this.setState({
      showContainer: false,
      containerItemIndex: -1,
    });
  }

  private showContainer = (index: number) => {
    this.setState({
      showContainer: true,
      containerItemIndex: index,
    });
  }
}

export default InventoryRow;
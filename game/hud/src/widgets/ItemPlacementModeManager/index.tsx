/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 */

import * as React from 'react';
import styled from 'react-emotion';
import { webAPI } from '@csegames/camelot-unchained';

declare const toastr: any;

const iconClass = {
  translate: 'translate fa fa-arrows',
  rotate: 'rotate fa fa-sync',
  scale: 'scale fa fa-expand-alt',
  commit: 'commit fa fa-check-circle',
  reset: 'reset fa fa-undo',
  cancel: 'cancel fa fa-ban',
};

const Container = styled('div')`
  background-color: #444;
  padding: 5px 10px;
`;

const ActionButton = styled('div')`
  pointer-events: all;
  cursor: pointer;
  &:hover {
    -webkit-filter: brightness(120%);
  }

  &.rotate,
  &.translate,
  &.scale {
    color: gray;
    &.selected {
      -webkit-filter: brightness(120%);
    }
  }
  &.commit {
    color: green;
  }
  &.reset {
    color: orange;
  }
  &.cancel {
    color: red;
  }
`;

const Divider = styled('div')`
  margin: 0 5px;
`;

export interface Props {

}

export interface State {
  visible: boolean;
  selectedTransformGizmoMode: ItemPlacementTransformMode;
}

class ItemPlacementModeManager extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      visible: false,
      selectedTransformGizmoMode: ItemPlacementTransformMode.Translate,
    };
  }
  public render() {
    const { selectedTransformGizmoMode } = this.state;
    return this.state.visible ? (
      <Container data-input-group='block'>
        <ActionButton
          className={`${iconClass.translate} ${selectedTransformGizmoMode ===
            ItemPlacementTransformMode.Translate ? 'selected' : ''}`}
          onClick={this.onTranslateClick}>
          Translate
        </ActionButton>
        <ActionButton
          className={`${iconClass.rotate} ${selectedTransformGizmoMode ===
            ItemPlacementTransformMode.Rotate ? 'selected' : ''}`}
          onClick={this.onRotateClick}>
          Rotate
        </ActionButton>
        <ActionButton
          className={`${iconClass.scale} ${selectedTransformGizmoMode ===
            ItemPlacementTransformMode.Scale ? 'selected' : ''}`}
          onClick={this.onScaleClick}>
          Scale
        </ActionButton>
        <Divider />
        <ActionButton className={iconClass.commit} onClick={this.onCommitClick}>Commit</ActionButton>
        <ActionButton className={iconClass.reset} onClick={this.onResetClick}>Reset</ActionButton>
        <ActionButton className={iconClass.cancel} onClick={this.onCancelClick}>Cancel</ActionButton>
      </Container>
    ) : null;
  }

  public componentDidMount() {
    game.on('navigate', this.handleNav);
    game.onBuildingModeChanged(this.handleBuildingModeChanged);
  }

  private handleBuildingModeChanged = (mode: BuildingMode) => {
    if (mode === BuildingMode.PlacingItem) {
      this.showPlacementMode();
    }
  }

  private handleNav = (uiName: string) => {
    if (uiName === 'placement-mode') {
      if (this.state.visible) {
        this.hidePlacementMode();
      } else {
        this.showPlacementMode();
      }
    }
  }

  private showPlacementMode = () => {
    this.setState({ visible: true });
  }

  private hidePlacementMode = () => {
    this.setState({ visible: false });
  }

  private onTranslateClick = () => {
    game.changeItemPlacementMode(ItemPlacementTransformMode.Translate);
  }

  private onRotateClick = () => {
    game.changeItemPlacementMode(ItemPlacementTransformMode.Rotate);
  }

  private onScaleClick = () => {
    game.changeItemPlacementMode(ItemPlacementTransformMode.Scale);
  }

  private onCommitClick = () => {
    const result = game.commitItemPlacement();
    if (result.success) {
      const { itemInstanceID, position, rotation } = result;
      this.handleCommitItemRequest(itemInstanceID, position, rotation, result.actionID ? result.actionID : null);
      this.hidePlacementMode();
    }
  }

  private onResetClick = () => {
    game.resetItemPlacement();
  }

  private onCancelClick = () => {
    const cancelled = game.cancelItemPlacement();
    if (cancelled) {
      this.hidePlacementMode();
    }
  }

  private handleCommitItemRequest = (itemId: string, position: Vec3F, rotation: Euler3f, actionId?: string) => {
    // Calls a moveItem request to a world position.
    if (!actionId) {
      this.makeMoveItemRequest(itemId, position, rotation);
    } else {
      this.makeItemActionRequest(itemId, actionId, position, rotation);
    }
  }

  private makeItemActionRequest = async (itemId: string, actionId: string, position: Vec3F, rotation: Euler3f) => {
    try {
      const res = await webAPI.ItemAPI.PerformItemAction(
        webAPI.defaultConfig,
        game.shardID,
        game.selfPlayerState.characterID,
        itemId,
        game.selfPlayerState.entityID,
        actionId,
        { WorldPosition: position, Rotation: rotation },
      );
      if (!res.ok) {
        const data = JSON.parse(res.data);
        if (data.FieldCodes && data.FieldCodes.length > 0) {
          toastr.error(data.FieldCodes[0].Message, 'Oh No!', { timeout: 3000 });
        } else {
          // This means api server failed perform item action request but did not provide a message about what happened
          toastr.error('An error occured', 'Oh No!', { timeout: 3000 });
        }
      }
    } catch (e) {
      toastr.error('There was an unhandled error!', 'Oh No!!', { timeout: 5000 });
    }
  }

  private makeMoveItemRequest = async (itemId: string, position: Vec3F, rotation: Euler3f) => {
    try {
      const res = await webAPI.ItemAPI.MoveItems(
        webAPI.defaultConfig,
        game.shardID,
        game.selfPlayerState.characterID,
        {
          moveItemID: itemId,
          stackHash: '00000000000000000000000000000000',
          unitCount: -1,
          to: {
            entityID: '0000000000000000000000',
            characterID: '0000000000000000000000',
            position: -1,
            worldPosition: position,
            rotation,
            containerID: '0000000000000000000000',
            gearSlotIDs: [] as any,
            location: 'Ground',
            voxSlot: 'Invalid',
          },
          from: {
            entityID: '0000000000000000000000',
            characterID: game.selfPlayerState.characterID,
            position: -1,
            containerID: '0000000000000000000000',
            gearSlotIDs: [] as any,
            location: 'Inventory',
            voxSlot: 'Invalid',
          },
        } as any,
      );
      if (!res.ok) {
        const data = JSON.parse(res.data);
        if (data.FieldCodes && data.FieldCodes.length > 0) {
          toastr.error(data.FieldCodes[0].Message, 'Oh No!', { timeout: 3000 });
        } else {
          // This means api server failed perform item action request but did not provide a message about what happened
          toastr.error('An error occured', 'Oh No!', { timeout: 3000 });
        }
      }
    } catch (e) {
      toastr.error('There was an unhandled error!', 'Oh No!!', { timeout: 5000 });
    }
  }
}

export default ItemPlacementModeManager;

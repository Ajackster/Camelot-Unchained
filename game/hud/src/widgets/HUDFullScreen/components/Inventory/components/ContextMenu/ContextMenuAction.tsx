/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 */

import gql from 'graphql-tag';
import * as React from 'react';
import * as _ from 'lodash';
import styled from 'react-emotion';
import { utils } from '@csegames/camelot-unchained';
import { GraphQL, GraphQLResult } from '@csegames/camelot-unchained/lib/graphql/react';
import { InventoryItem, ContextMenuActionGQL } from 'gql/interfaces';
import { hideTooltip } from 'actions/tooltips';

declare const toastr: any;

const query = gql`
  query ContextMenuActionGQL($id: String!, $shardID: Int!) {
    item(id: $id, shard: $shardID) {
      id
      actions {
        id
        lastTimePerformed
      }
    }
  }
`;

const Button = styled('div')`
  display: flex;
  justify-content: space-between;
  background-color: ${(props: any) => props.disabled ? '#434343' : 'gray' };
  color: white;
  pointer-events: all;
  border-bottom: 1px solid #222;
  max-width: 300px;
  padding: 5px;
  pointer-events: all;
  cursor: ${(props: any) => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${(props: any) => props.disabled ? 0.5 : 1};

  &:hover {
    background-color: #888;
  }

  &:active {
    ${(props: any) => props.disabled ? '' : 'box-shadow: inset 0 0 3px rgba(0,0,0,0.5)'};
  }
`;

const CooldownText = styled('div')`
  margin-left: 10px;
`;

export interface Props {
  itemId: string;
  name: string;
  onActionClick: (action?: InventoryItem.Actions) => void;
  syncWithServer: () => void;
  action?: InventoryItem.Actions;
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
}

export interface State {
  cooldownLeft: string;
  shouldQuery: boolean;
}

class ContextMenuAction extends React.Component<Props, State> {
  private cooldownTimeout: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      cooldownLeft: '',
      shouldQuery: true,
    };
  }

  public render() {
    const { cooldownLeft, shouldQuery } = this.state;
    const { name, action } = this.props;
    const variables: ContextMenuActionGQL.Variables = {
      id: this.props.itemId,
      shardID: game.shardID,
    };
    const isDisabled = shouldQuery || cooldownLeft !== '' || (action && !action.enabled);
    return (action && !action.enabled && !action.showWhenDisabled) ? null : (
      <Button data-input-group='block' disabled={isDisabled} onClick={this.onActionClick}>
        <div>{name}</div>
        {shouldQuery && <GraphQL query={{ query, variables }} onQueryResult={this.handleQueryResult} />}
        <CooldownText>{cooldownLeft !== '' ? `${cooldownLeft}` : null}</CooldownText>
      </Button>
    );
  }

  public componentWillUnmount() {
    this.clearCooldownTimeout();
  }

  private handleQueryResult = (result: GraphQLResult<ContextMenuActionGQL.Query>) => {
    const resultData: ContextMenuActionGQL.Query = typeof result.data === 'string' ? JSON.parse(result.data) : result.data;
    this.setState({ shouldQuery: false });
    if (resultData && resultData.item) {
      const myAction = _.find(resultData.item.actions, a => a.id === this.props.action.id);
      this.initTimer(myAction && myAction.lastTimePerformed);
    }

    return result;
  }

  private initTimer = (lastTimePerformed: string) => {
    if (this.props.action && lastTimePerformed && this.props.action.cooldownSeconds > 0) {
      const { cooldownSeconds } = this.props.action;
      const timeLeft = utils.prettyPrintTimeSpan(lastTimePerformed, cooldownSeconds.toString());
      if (timeLeft !== '') {
        this.startCooldown(lastTimePerformed);
      }
    }
  }

  private onActionClick = () => {
    const { action } = this.props;
    hideTooltip();
    if (action) {
      if (!action.enabled || this.state.cooldownLeft !== '') {
        // Handle disabled action button
        toastr.error('That action is currently disabled', 'Oh no!!', { timeout: 3000 });
      } else {
        if (action.cooldownSeconds) {
          this.startCooldown(new Date().toISOString());
        }
        this.props.onActionClick(action);
      }
    } else {
      this.props.onActionClick();
    }
  }

  private startCooldown = (lastTimePerformed: string) => {
    this.updateCooldownSeconds(lastTimePerformed);
  }

  private updateCooldownSeconds = (lastTimePerformed: string) => {
    const timeLeft = utils.prettyPrintTimeSpan(lastTimePerformed, this.props.action.cooldownSeconds.toString());

    if (timeLeft !== this.state.cooldownLeft || this.state.cooldownLeft === '') {
      this.setState({ cooldownLeft: timeLeft });
    }

    if (this.state.shouldQuery) {
      this.setState({ shouldQuery: false });
    }

    // Recursively run the update to cooldown seconds with cooldownLeft
    if (timeLeft !== '') {
      this.cooldownTimeout = setTimeout(() => this.updateCooldownSeconds(lastTimePerformed), 1000);
    } else {
      this.clearCooldownTimeout();
    }
  }

  private clearCooldownTimeout = () => {
    clearTimeout(this.cooldownTimeout);
    this.cooldownTimeout = null;
  }
}

export default ContextMenuAction;

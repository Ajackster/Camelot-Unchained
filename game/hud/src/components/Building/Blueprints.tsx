/*
* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import * as React from 'react';
import styled from 'react-emotion';
import { Tooltip } from 'components/UI/Tooltip';
import { ConfirmDialog } from '@csegames/camelot-unchained/lib/components/ConfirmDialog';

const Container = styled('div')`
  flex: 1 1 auto;
  margin-top: -10px;
  padding-top: 10px;
  background-image: url(images/settings/bag-bg-grey.png);
  background-repeat: no-repeat;
  background-position: top center;
  overflow: auto;
  box-sizing: border-box!important;
  pointer-events: auto;
  display: flex;
  flex-direction: column;
`;

const Content = styled('div')`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  overflow-y: auto;
  box-sizing: border-box!important;
  color: #ececec;
`;

const Controller = styled('div')`
  display: flex;
  flex: 0 0 auto;
  padding: 2px;
  border-bottom: 1px solid #444;
`;

const CreateBtn = styled('div')`
  padding: 5px 2px;
  font-size: 0.9em;
  background-color: orange;
  cursor: pointer;
  &:hover {
    background-color: darkorange;
  }
`;

const CreateBtnDisabled = styled(CreateBtn)`
  background-color: #888;
  cursor: default;
  &:hover {
    background-color: #888;
  }
`;

const Blueprint = styled('div')`
  position: relative;
  display: flex;
  margin: 2px;
  border: 1px solid #444;
  &:hover {
    border: 1px solid #fff;
  }
`;

const SelectedBlueprint = styled(Blueprint)`
  border: 1px solid gold;
`;

const Image = styled('img')`
  width: 128px;
  height: 128px;
`;

const Delete = styled('div')`
  color: red;
  cursor: pointer;
  background: #777;
`;

const TooltipContainer = styled('div')`
  padding: 5px;
  background: #222;
  color: #ececec;
  border: 1px solid #444;
  display: grid;
  max-width: 200px;
  grid-template:
    'icon name' auto
    'icon .' auto
    / auto auto;
`;

const TooltipIcon = styled('img')`
  grid-area: icon;
  width: 128px;
  height: 128px;
  align-self: center;
  justify-self: center;
`;

const TooltipName = styled('div')`
  grid-area: name;
  padding: 5px;
  align-self: center;
`;

export interface BlueprintsProps {
}

export interface BlueprintsState {
}

export class Blueprints extends React.Component<BlueprintsProps, BlueprintsState> {
  private blockChangeHandle: EventHandle = null;
  private modeChangeHandle: EventHandle = null;
  private reloadHandle: EventHandle = null;

  constructor(props: BlueprintsProps) {
    super(props);
    this.state = {
    };

    this.blockChangeHandle = game.onSelectedBlueprintChanged(() => this.forceUpdate());
    this.modeChangeHandle = game.onSelectedBlueprintChanged(() => this.forceUpdate());
    this.reloadHandle = game.on('_cse_dev_bp-reload', () => this.forceUpdate());
  }

  public render() {
    const blueprints = Object.values(game.building.blueprints);
    return (
      <Container className='cse-ui-scroller-thumbonly'>
        <Controller>
          {
            game.building.mode === BuildingMode.BlocksSelected ?
            <CreateBtn onClick={() => game.trigger(game.engineEvents.EE_OnWantCreateBlueprintFromSelection)}>
              Create Blueprint from selection.
            </CreateBtn> :
            <CreateBtnDisabled>
              Create Blueprint from selection.
            </CreateBtnDisabled>
          }
        </Controller>
        <Content>
        {blueprints.length === 0 ? 'No Blueprints Available.' : null}
        {blueprints.map((bp) => {
          const BP = bp.id === game.building.activeBlueprintID ? SelectedBlueprint : Blueprint;
          return (

              <BP
                key={bp.id}
                onClick={() => game.building.selectBlueprintAsync(bp.id)}
              >
              <Tooltip
                content={(
                  <TooltipContainer>
                    <TooltipIcon src={'data:image/png;base64,' + bp.icon} />
                    <TooltipName>{bp.name}</TooltipName>
                  </TooltipContainer>
                )}
                closeOnEvents={[game.engineEvents.EE_OnToggleBuildSelector]}
              >
                <Image src={'data:image/png;base64,' + bp.icon}/>
              </Tooltip>
                <ConfirmDialog
                  onConfirm={() => (
                    game.building.deleteBlueprintAsync(bp.id)
                    .then(() => setTimeout(() => this.forceUpdate()))
                    .catch(() => setTimeout(() => this.forceUpdate())))}
                  onCancel={() => {}}
                  content={() => (<div>Are you sure you wish to delete the blueprint ({bp.name})?</div>)}
                >
                  <Delete>delete</Delete>
                </ConfirmDialog>

              </BP>
          );
        })}
        </Content>
      </Container>
    );
  }

  public shouldComponentUpdate(nextProps: BlueprintsProps, nextState: BlueprintsState) {
    return false;
  }

  public componentWillUnmount() {
    if (this.blockChangeHandle) {
      this.blockChangeHandle.clear();
      this.blockChangeHandle = null;
    }
    if (this.modeChangeHandle) {
      this.modeChangeHandle.clear();
      this.modeChangeHandle = null;
    }
    if (this.reloadHandle) {
      this.reloadHandle.clear();
      this.reloadHandle = null;
    }
  }

}

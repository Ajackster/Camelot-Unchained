/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @Author: Mehuge (mehuge@sorcerer.co.uk)
 * @Date: 2017-05-20 20:36:49
 * @Last Modified by: Mehuge (mehuge@sorcerer.co.uk)
 * @Last Modified time: 2017-06-15 21:54:38
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { GlobalState } from '../../services/session/reducer';
import Select from '../Select';
import { Ingredient, InventoryItem } from '../../services/types';
import { StyleSheet, css, merge, possibleIngredients, PossibleIngredientsStyles } from '../../styles';
import Icon from '../Icon';

interface PossibleIngredientsReduxProps {
  dispatch?: (action: any) => void;
  possibleIngredients?: InventoryItem[];
  jobType?: string;
  style?: Partial<PossibleIngredientsStyles>;
}

const select = (state: GlobalState, props: PossibleIngredientsProps): PossibleIngredientsReduxProps => {
  const possibleIngredients: Ingredient[] = [];
  state.job.possibleIngredients.forEach((ingredient: Ingredient) => {
    if (ingredient.stats.unitCount > 0) {
      possibleIngredients.push(ingredient);
    }
  });
  return { possibleIngredients, jobType: state.job.type };
};

export interface PossibleIngredientsProps extends PossibleIngredientsReduxProps {
  selectedItem: InventoryItem;
  disabled?: boolean;
  onSelect: (item: InventoryItem) => void;
}

export interface PossibleIngredientsState {}

export class PossibleIngredients extends React.Component<PossibleIngredientsProps, PossibleIngredientsState> {
  public render() {
    const ss = StyleSheet.create(merge({}, possibleIngredients, this.props.style));
    const isRepair = this.props.jobType === 'repair';
    const render = (item: InventoryItem) => item && (
      <div className={css(ss.possibleIngredients)}>
        <Icon className={css(ss.span, ss.icon)} src={item.static.icon}/>
        <span className={css(ss.span, ss.name)}>{item.name}</span>
        { isRepair || <span className={css(ss.span, ss.quantity)}>x{item.stats.unitCount}</span> }
        { isRepair || <span className={css(ss.span, ss.quality)}>@ {(item.stats.quality * 100) | 0}%</span> }
        { isRepair || <span className={css(ss.span, ss.weight)}>{item.stats.weight}KG</span> }
        { isRepair && <span className={css(ss.span, ss.durability)}>{item.stats.durability.current} dur</span> }
        { isRepair && <span className={css(ss.span, ss.points)}>{item.stats.durability.currentPoints} pts</span> }
      </div>
    );
    return (
      <Select
        disabled={this.props.disabled}
        style={{select: possibleIngredients.select}}
        items={this.props.possibleIngredients}
        onSelectedItemChanged={this.props.onSelect}
        renderActiveItem={render}
        renderListItem={render}
        selectedItem={this.props.selectedItem}
        />
    );
  }
}

export default connect(select)(PossibleIngredients);

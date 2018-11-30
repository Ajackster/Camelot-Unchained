/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import * as React from 'react';
import { Room } from '../lib/CSEChat';
export interface JoinRoomListProps {
    rooms: Room[];
    filter: string;
    selectRoom: (room: Room) => void;
}
export interface JoinRoomListState {
}
declare class JoinRoomList extends React.Component<JoinRoomListProps, JoinRoomListState> {
    private hidden;
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private onmousedown;
}
export default JoinRoomList;

/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import * as React from 'react';
import RoomId from './RoomId';
export interface JoinRoomButtonState {
    showJoinRoomModal: boolean;
}
export interface JoinRoomButtonProps {
    key: string;
    join: (roomId: RoomId) => void;
    getRooms: () => void;
}
declare class JoinRoomButton extends React.Component<JoinRoomButtonProps, JoinRoomButtonState> {
    constructor(props: JoinRoomButtonProps);
    render(): JSX.Element;
    private promptRoom;
    private showModal;
    private closeModal;
    private joinRoom;
    private generateJoinRoomModal;
}
export default JoinRoomButton;

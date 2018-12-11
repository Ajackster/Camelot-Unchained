import * as React from 'react';
export declare class UserInfo {
    roomName: string;
    name: string;
    isCSE: string;
    constructor(roomName: string, name: string, isCSE: string);
}
export interface UserState {
}
export interface UserProps {
    info: UserInfo;
    key: number;
    selected?: boolean;
}
declare class User extends React.Component<UserProps, UserState> {
    render(): JSX.Element;
    private PM;
}
export default User;

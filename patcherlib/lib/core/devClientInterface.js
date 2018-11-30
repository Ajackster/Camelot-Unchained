"use strict";
/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var devClientInterface = {
    initialized: true,
    OnInitialized: function OnInitialized(c) {
        c();
        return -1;
    },
    /* Client Options */
    muteVolume: false,
    mainVolume: 1,
    /* Shared */
    patchResourceChannel: 4,
    loginToken: 'developer',
    accessToken: 'developer',
    ACCESS_TOKEN_PREFIX: 'Bearer',
    pktHash: '0000',
    webAPIHost: 'hatcheryd.camelotunchained.com',
    apiHost: 'https://api.camelotunchained.com',
    serverURL: '',
    serverTime: 1,
    vsync: 1,
    playerState: {
        id: 'TestPlayer',
        name: 'CSEaj',
        type: 'player',
        isAlive: true,
        race: 2,
        faction: 1,
        class: 9,
        gender: 1,
        health: [{ current: 500, max: 500, wounds: 0 }, { current: 500, max: 500, wounds: 0 }, { current: 500, max: 500, wounds: 0 }, { current: 500, max: 500, wounds: 0 }, { current: 500, max: 500, wounds: 0 }, { current: 500, max: 500, wounds: 0 }],
        stamina: { current: 500, max: 1000 },
        blood: { current: 500, max: 1000 }
    },
    FOV: function FOV(degrees) {},
    DropLight: function DropLight(intensity, radius, red, green, blue) {},
    ResetLights: function ResetLights() {},
    RemoveLight: function RemoveLight() {},
    OnServerConnected: function OnServerConnected(c) {
        c(false);
        return -1;
    },
    PlaySoundEvent: function PlaySoundEvent(id) {},
    ToggleCamera: function ToggleCamera() {},
    ReloadUI: function ReloadUI(name) {},
    ReloadAllUI: function ReloadAllUI() {},
    OpenUI: function OpenUI(name) {},
    CloseUI: function CloseUI(name) {},
    HideUI: function HideUI(name) {},
    ShowUI: function ShowUI(name) {},
    ToggleUIVisibility: function ToggleUIVisibility(name) {},
    RequestInputOwnership: function RequestInputOwnership() {},
    ReleaseInputOwnership: function ReleaseInputOwnership() {},
    Quit: function Quit() {},
    CrashTheGame: function CrashTheGame() {},
    OnOpenUI: function OnOpenUI(callback) {},
    OnCloseUI: function OnCloseUI(callback) {},
    OnShowUI: function OnShowUI(callback) {},
    OnHideUI: function OnHideUI(callback) {},
    /* Respawn */
    Respawn: function Respawn(id) {},
    /* Skills */
    OnSkillStateChanged: function OnSkillStateChanged(callback) {},
    OnSkillBarChanged: function OnSkillBarChanged(callback) {},
    /* Abilities */
    Attack: function Attack(abilityID) {},
    OnAbilityError: function OnAbilityError(c) {},
    /* HUD */
    OnToggleHUDItem: function OnToggleHUDItem(c) {},
    /* Equipped Gear */
    SubscribeGear: function SubscribeGear(subscribe) {},
    OnGearAdded: function OnGearAdded(callback) {},
    OnGearRemoved: function OnGearRemoved(callback) {},
    UnequipItem: function UnequipItem(itemID) {},
    /* Inventory */
    SubscribeInventory: function SubscribeInventory(subscribe) {},
    OnInventoryAdded: function OnInventoryAdded(callback) {},
    OnInventoryRemoved: function OnInventoryRemoved(callback) {},
    EquipItem: function EquipItem(itemID) {},
    DropItem: function DropItem(itemID) {},
    /* Config */
    OnReceiveConfigVars: function OnReceiveConfigVars(c) {},
    OnReceiveConfigVar: function OnReceiveConfigVar(c) {},
    OnConfigVarChanged: function OnConfigVarChanged(c) {},
    SaveConfigChanges: function SaveConfigChanges() {},
    OnSavedConfigChanges: function OnSavedConfigChanges(c) {},
    RestoreConfigDefaults: function RestoreConfigDefaults(tag) {},
    ChangeConfigVar: function ChangeConfigVar(variable, value) {},
    CancelChangeConfig: function CancelChangeConfig(variable) {},
    CancelAllConfigChanges: function CancelAllConfigChanges(tag) {},
    GetConfigVars: function GetConfigVars(tag) {},
    GetConfigVar: function GetConfigVar(variable) {},
    RequestDisplayModes: function RequestDisplayModes() {},
    OnDisplayModesChanged: function OnDisplayModesChanged(c) {},
    SetDisplayMode: function SetDisplayMode(wantFullScreen, width, height) {},
    /* Building | CUBE */
    OnBuildingModeChanged: function OnBuildingModeChanged(c) {},
    // responds with all blocks -- triggered by a call to 'RequestBlocks'
    OnReceiveBlocks: function OnReceiveBlocks(c) {},
    // responds with all substance ids -- triggered by a call to 'RequestSubstances'
    OnReceiveSubstances: function OnReceiveSubstances(c) {},
    // responds with block ids for a specific substance last passed into 'BlockIDsforSubstanceID'
    OnReceiveBlockIDs: function OnReceiveBlockIDs(c) {},
    OnReceiveBlockTags: function OnReceiveBlockTags(c) {},
    OnReceiveScreenShot: function OnReceiveScreenShot(c) {},
    OnCopyBlueprint: function OnCopyBlueprint(c) {},
    OnNewBlueprint: function OnNewBlueprint(c) {},
    OnDownloadBlueprints: function OnDownloadBlueprints(c) {},
    OnUploadBlueprint: function OnUploadBlueprint(c) {},
    OnBlueprintSelected: function OnBlueprintSelected(c) {},
    OnBlockSelected: function OnBlockSelected(c) {},
    ToggleBuildingMode: function ToggleBuildingMode() {},
    SetBuildingMode: function SetBuildingMode(newMode) {},
    UndoCube: function UndoCube() {},
    RedoCube: function RedoCube() {},
    CommitBlock: function CommitBlock() {},
    CancelBlockPlacement: function CancelBlockPlacement() {},
    BlockRotateX: function BlockRotateX() {},
    BlockRotateY: function BlockRotateY() {},
    BlockRotateZ: function BlockRotateZ() {},
    BlockFlipX: function BlockFlipX() {},
    BlockFlipY: function BlockFlipY() {},
    BlockFlipZ: function BlockFlipZ() {},
    CopyBlueprint: function CopyBlueprint() {},
    PasteBlueprint: function PasteBlueprint() {},
    RemoveIslands: function RemoveIslands() {},
    ApplyStability: function ApplyStability() {},
    TestStability: function TestStability() {},
    SaveBuilding: function SaveBuilding() {},
    ToggleStabilityLoop: function ToggleStabilityLoop() {},
    RequestBlocks: function RequestBlocks() {},
    RequestSubstances: function RequestSubstances() {},
    BlockIDsforSubstanceID: function BlockIDsforSubstanceID(substanceID) {},
    RequestBlockTags: function RequestBlockTags(blockID) {},
    ChangeBlockType: function ChangeBlockType(newType) {},
    OpenScreenshotShare: function OpenScreenshotShare() {},
    TakeScreenshot: function TakeScreenshot() {},
    CountBlocks: function CountBlocks() {},
    ReplaceSubstance: function ReplaceSubstance(block1, block2) {},
    ReplaceSelectedSubstance: function ReplaceSelectedSubstance(block1, block2) {},
    ReplaceShapes: function ReplaceShapes(shape1, shape2) {},
    ReplaceSelectedShapes: function ReplaceSelectedShapes(shape1, shape2) {},
    RotateX: function RotateX() {},
    RotateY: function RotateY() {},
    RotateZ: function RotateZ() {},
    SnapMode: function SnapMode() {},
    BlockTypes: function BlockTypes() {},
    LoopAbility: function LoopAbility(hotbarIndex, interval) {},
    EndLoopAbility: function EndLoopAbility() {},
    placedBlockCount: 0,
    blockTypes: 0,
    SelectBlueprint: function SelectBlueprint(index) {},
    RequestBlueprints: function RequestBlueprints() {},
    SaveBlueprint: function SaveBlueprint(name) {},
    DownloadBlueprints: function DownloadBlueprints() {},
    ReceiveBlueprintFromServer: function ReceiveBlueprintFromServer(name, cellData, id) {},
    DeleteLocalBlueprint: function DeleteLocalBlueprint(name) {},
    /* Announcement */
    OnAnnouncement: function OnAnnouncement(c) {},
    /* Plot */
    OnPlotStatus: function OnPlotStatus(c) {},
    /* Character State Changes */
    OnPlayerStateChanged: function OnPlayerStateChanged(c) {},
    OnEnemyTargetStateChanged: function OnEnemyTargetStateChanged(c) {},
    OnFriendlyTargetStateChanged: function OnFriendlyTargetStateChanged(c) {},
    /* Character */
    OnCharacterZoneChanged: function OnCharacterZoneChanged(c) {},
    OnCharacterCanReleaseControlChanged: function OnCharacterCanReleaseControlChanged(c) {},
    /* EMOTE */
    Emote: function Emote(emote) {},
    /* Chat */
    OnBeginChat: function OnBeginChat(c) {},
    OnChat: function OnChat(c) {},
    SendChat: function SendChat(type, to, body) {},
    Stuck: function Stuck() {},
    ChangeZone: function ChangeZone(zoneID) {},
    /* Ability Crafting */
    AbilityCreated: function AbilityCreated(abilityID, primaryBaseComponentID, secondaryBaseComponentID, ability) {},
    OnAbilityCreated: function OnAbilityCreated(callback) {},
    AbilityDeleted: function AbilityDeleted(abilityID) {},
    OnAbilityDeleted: function OnAbilityDeleted(callback) {},
    RegisterAbility: function RegisterAbility(abilityID, primaryBaseComponentID, secondaryBaseComponentID) {},
    OnAbilityRegistered: function OnAbilityRegistered(callback) {},
    /* Stats */
    fps: 0,
    frameTime: 0,
    netstats_udpPackets: 0,
    netstats_udpBytes: 0,
    netstats_tcpMessages: 0,
    netstats_tcpBytes: 0,
    netstats_players_updateBits: 0,
    netstats_players_updateCount: 0,
    netstats_players_newCount: 0,
    netstats_players_newBits: 0,
    netstats_lag: 0,
    netstats_delay: 0,
    netstats_selfUpdatesPerSec: 0,
    netstats_syncsPerSec: 0,
    particlesRenderedCount: 0,
    characters: 0,
    terrain: 0,
    perfHUD: '',
    /* Physics Debugging */
    locationX: 0,
    locationY: 0,
    locationZ: 0,
    serverLocationX: 0,
    serverLocationY: 0,
    serverLocationZ: 0,
    facing: 0,
    velocityX: 0,
    velocityY: 0,
    velocityZ: 0,
    speed: 0,
    horizontalSpeed: 0,
    velFacing: 0,
    downCollisionAngle: 0,
    terrainCollisionAngle: 0,
    /* Console */
    OnConsoleText: function OnConsoleText(c) {},
    ConsoleCommand: function ConsoleCommand(body) {},
    SendSlashCommand: function SendSlashCommand(command) {},
    /* Logging */
    OnLogMessage: function OnLogMessage(c) {},
    /* Combat Logs */
    OnCombatLogEvent: function OnCombatLogEvent(c) {},
    /* Dev UI */
    OnUpdateDevUI: function OnUpdateDevUI(c) {},
    /* Scenarios */
    ScenarioRoundEnded: function ScenarioRoundEnded(c) {},
    /* Deployable Items */
    StartPlacingItemByID: function StartPlacingItemByID(numericItemDefID, itemInstanceID, extraParameters) {},
    ResetItemPlacement: function ResetItemPlacement() {},
    CommitItemPlacement: function CommitItemPlacement() {},
    CancelItemPlacement: function CancelItemPlacement() {},
    SendCommitItemRequest: function SendCommitItemRequest(callback) {},
    /* Target */
    RequestFriendlyTargetEntityID: function RequestFriendlyTargetEntityID(entityID) {},
    RequestEnemyTargetEntityID: function RequestEnemyTargetEntityID(entityID) {},
    /* Keybind API */
    OnKeybindRecorded: function OnKeybindRecorded(callback) {},
    OnAllKeybindsRequested: function OnAllKeybindsRequested(callback) {},
    RequestAllKeybinds: function RequestAllKeybinds() {},
    StartRecordingKeybind: function StartRecordingKeybind(button, alias) {},
    SetKeybind: function SetKeybind(button, alias, boundKeyValue) {},
    CancelRecordingKeybind: function CancelRecordingKeybind() {},
    ClearKeybind: function ClearKeybind(button, alias) {},
    apiVersion: 1,
    characterID: 'AABBCCDDEEFFGG',
    debug: false,
    signalRHost: 'https://api.camelotunchained.com/signalr',
    shardID: 1
};
exports.default = devClientInterface;
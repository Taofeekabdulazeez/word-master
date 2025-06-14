export enum GameRoomEvent {
    PLAYER_JOINED = 'player/joined',
    PLAYER_LEFT = 'player/left',
    PLAYERS_UPDATE = 'players/update',
    PLAYERS_MESSAGE = 'players/message',
}

export enum GameSubscriptionEvent {
    PLAYERS_MESSAGE = 'players/message',
    PLAYERS_UPDATE = 'players/update',
}
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const players_service_1 = require("./players.service");
let RoomGateway = class RoomGateway {
    constructor(playersService) {
        this.playersService = playersService;
    }
    broadCastRoundStarted() {
        this.server.emit('round/started', 'round has started');
        console.log('round has started');
    }
    broadCastRoundEnded() {
        this.server.emit('round/ended', 'round has ended');
        console.log('round has ended');
    }
    notifyNextRound() {
        this.server.emit('round/pending', 'The next round will begin in 30 seconds');
        console.log('The next round will begin in 30 seconds');
    }
    broadCastTimer(time) {
        this.server.emit('round/timer', `You have ${time} secs left`);
    }
    handleMessage(client, message) {
        const player = client.handshake.query?.['player'] ||
            `player${client.id.substring(0, 5)}`;
        const msg = `${player}: ${message.text}`;
        console.log(msg);
        client.broadcast.emit('player/message', message);
    }
    handleConnection(client) {
        const player = client.handshake.query?.['player'];
        const message = `${player} has joined the room`;
        console.log(message);
        this.server.emit('player/joined', message);
        this.playersService.addPlayer(player);
        const players = this.playersService.getPlayers();
        this.server.emit('players/update', players);
    }
    handleDisconnect(client) {
        const player = client.handshake.query?.['player'];
        const message = `${player} has left the room`;
        console.log(message);
        this.server.emit('player/left', message);
        this.playersService.deletePlayer(player);
        const players = this.playersService.getPlayers();
        this.server.emit('players/update', players);
    }
};
exports.RoomGateway = RoomGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", Function)
], RoomGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('player/message'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Object]),
    __metadata("design:returntype", void 0)
], RoomGateway.prototype, "handleMessage", null);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", void 0)
], RoomGateway.prototype, "handleConnection", null);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", void 0)
], RoomGateway.prototype, "handleDisconnect", null);
exports.RoomGateway = RoomGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ namespace: 'room', cors: { origin: '*' } }),
    __metadata("design:paramtypes", [players_service_1.PlayersService])
], RoomGateway);
//# sourceMappingURL=room.gateway.js.map
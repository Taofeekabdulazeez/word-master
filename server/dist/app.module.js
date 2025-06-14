"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const tasks_service_1 = require("./jobs/tasks.service");
const room_gateway_1 = require("./gateways/room.gateway");
const players_service_1 = require("./services/players.service");
const game_rooms_service_1 = require("./services/game-rooms.service");
const game_rooms_gateway_1 = require("./gateways/game-rooms.gateway");
const game_rooms_controller_1 = require("./controllers/game-rooms.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
        ],
        controllers: [game_rooms_controller_1.GameRoomsController],
        providers: [tasks_service_1.TasksService, room_gateway_1.RoomGateway, players_service_1.PlayersService, game_rooms_service_1.GameRoomsService, game_rooms_gateway_1.GameRoomsGateway],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
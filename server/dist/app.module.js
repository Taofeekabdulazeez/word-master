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
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const schedule_1 = require("@nestjs/schedule");
const tasks_service_1 = require("./tasks.service");
const room_gateway_1 = require("./room.gateway");
const players_service_1 = require("./players.service");
const bullmq_1 = require("@nestjs/bullmq");
const app_worker_1 = require("./app.worker");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            bullmq_1.BullModule.forRoot({
                connection: {
                    host: 'localhost',
                    port: 6379,
                },
            }),
            bullmq_1.BullModule.registerQueue({ name: 'new-round' }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, tasks_service_1.TasksService, room_gateway_1.RoomGateway, players_service_1.PlayersService, app_worker_1.AppWorker],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
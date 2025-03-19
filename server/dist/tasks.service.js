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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const room_gateway_1 = require("./room.gateway");
let TasksService = class TasksService {
    constructor(roomGateway, schedulerRegistry) {
        this.roomGateway = roomGateway;
        this.schedulerRegistry = schedulerRegistry;
        this.timer = 20;
    }
    startTask() {
        if (this.timer === 0) {
            this.timer = 10;
            this.roomGateway.broadCastRoundStarted();
        }
        else {
            this.timer--;
        }
    }
};
exports.TasksService = TasksService;
__decorate([
    (0, schedule_1.Cron)('*/1 * * * * *', { name: 'startGame' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TasksService.prototype, "startTask", null);
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [room_gateway_1.RoomGateway,
        schedule_1.SchedulerRegistry])
], TasksService);
//# sourceMappingURL=tasks.service.js.map
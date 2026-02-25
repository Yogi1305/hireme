"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const common_1 = require("@nestjs/common");
let Service = class Service {
    test() {
        return `Hello World service ${process.env.DB_HOST}`;
    }
    update(id, data) {
        return `Update not implemented for id ${id}`;
    }
    delete(id) {
        return `Delete not implemented for id ${id}`;
    }
};
exports.Service = Service;
exports.Service = Service = __decorate([
    (0, common_1.Injectable)()
], Service);
//# sourceMappingURL=service.service.js.map
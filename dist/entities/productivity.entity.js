var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Languages } from "./language.entity.js";
let Productivity = class Productivity {
    id;
    year;
    month;
    day;
    hour;
    minute;
    seconds;
    totalProductivityInSeconds;
    totalTimeInVim;
    totalTimeSpentThinkingOrSearching;
    projectPath;
    commitMsg;
    languages;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Productivity.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Productivity.prototype, "year", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Productivity.prototype, "month", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Productivity.prototype, "day", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Productivity.prototype, "hour", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Productivity.prototype, "minute", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Productivity.prototype, "seconds", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Productivity.prototype, "totalProductivityInSeconds", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Productivity.prototype, "totalTimeInVim", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Productivity.prototype, "totalTimeSpentThinkingOrSearching", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Productivity.prototype, "projectPath", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Productivity.prototype, "commitMsg", void 0);
__decorate([
    OneToMany(() => Languages, (languages) => languages.productivity),
    __metadata("design:type", Object)
], Productivity.prototype, "languages", void 0);
Productivity = __decorate([
    Entity()
], Productivity);
export { Productivity };

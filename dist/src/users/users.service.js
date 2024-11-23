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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createUser(CreateUserDTO) {
        const { name, email, apellidos, password, isDeleted } = CreateUserDTO;
        return this.prisma.user.create({
            data: {
                name,
                email,
                apellidos,
                password,
                isDeleted
            }
        });
    }
    async getAllUsers(page, limit) {
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber <= 0 || limitNumber <= 0) {
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.BAD_REQUEST, message: 'Page y limit deben ser números positivos.' }, common_1.HttpStatus.BAD_REQUEST);
        }
        const skip = (page - 1) * limit;
        const total = await this.prisma.user.count({
            where: {
                isDeleted: false,
            },
        });
        if (skip >= total) {
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.BAD_REQUEST, message: 'Page fuera de rango.' }, common_1.HttpStatus.BAD_REQUEST);
        }
        const users = await this.prisma.user.findMany({
            skip,
            take: limitNumber,
            where: {
                isDeleted: false,
            },
            orderBy: { apellidos: 'asc' },
        });
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Usuarios obtenidos con éxito. Ordenados alfabeticamente',
            user: users,
            total,
            page: pageNumber,
            limit: limitNumber,
            totalPages: Math.ceil(total / limitNumber),
        };
    }
    async getUserById(id) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id },
            });
            if (!user) {
                throw new common_1.HttpException({ statusCode: common_1.HttpStatus.NOT_FOUND, message: 'Usuario no encontrado' }, common_1.HttpStatus.NOT_FOUND);
            }
            return user;
        }
        catch (error) {
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR, message: 'Error interno del servidor' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateUser(id, data) {
        return this.prisma.user.update({ where: { id }, data });
    }
    async deleteUser(id) {
        return this.prisma.user.delete({ where: { id } });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const prisma_service_1 = require("./prisma.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
let AppController = class AppController {
    appService;
    prisma;
    jwtService;
    constructor(appService, prisma, jwtService) {
        this.appService = appService;
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    getHello() {
        return this.appService.getHello();
    }
    async login(body) {
        const user = await this.prisma.sanctuaryUser.findFirst({
            where: {
                dob: body.dob,
                passcode: body.passcode,
            },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Access Denied. Check DOB or Passcode.');
        }
        return { success: true, message: 'Welcome to the sanctuary' };
    }
    async adminLogin(body) {
        const admin = await this.prisma.admin.findUnique({
            where: { email: body.email },
        });
        console.log(admin);
        if (!admin) {
            throw new common_1.UnauthorizedException('Access Denied. Check credentials.');
        }
        const isMatch = await bcrypt.compare(body.password, admin.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Access Denied. Check credentials.');
        }
        const token = this.jwtService.sign({ email: admin.email, sub: admin.id });
        return { token };
    }
    async getUsers(authHeader) {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new common_1.UnauthorizedException('No authorization token provided.');
        }
        const token = authHeader.split(' ')[1];
        try {
            this.jwtService.verify(token);
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Invalid or expired token.');
        }
        const users = await this.prisma.sanctuaryUser.findMany({
            orderBy: { createdAt: 'asc' },
        });
        return users;
    }
    async getContent(key) {
        const record = await this.prisma.websiteContent.findUnique({
            where: { key },
        });
        if (!record) {
            return null;
        }
        try {
            return JSON.parse(record.value);
        }
        catch (e) {
            return record.value;
        }
    }
    async updateContent(key, body, authHeader) {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new common_1.UnauthorizedException('No authorization token provided.');
        }
        const token = authHeader.split(' ')[1];
        try {
            this.jwtService.verify(token);
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Invalid or expired token.');
        }
        const valueStr = typeof body.value === 'string' ? body.value : JSON.stringify(body.value);
        const record = await this.prisma.websiteContent.upsert({
            where: { key },
            update: { value: valueStr },
            create: { key, value: valueStr },
        });
        return { success: true, key: record.key };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Post)('auth/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('auth/admin/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "adminLogin", null);
__decorate([
    (0, common_1.Get)('admin/users'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)('content/:key'),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getContent", null);
__decorate([
    (0, common_1.Put)('admin/content/:key'),
    __param(0, (0, common_1.Param)('key')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateContent", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AppController);
//# sourceMappingURL=app.controller.js.map
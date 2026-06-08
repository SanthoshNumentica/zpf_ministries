import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AppController {
    private readonly appService;
    private readonly prisma;
    private readonly jwtService;
    constructor(appService: AppService, prisma: PrismaService, jwtService: JwtService);
    getHello(): string;
    login(body: {
        dob: string;
        passcode: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    adminLogin(body: {
        email: string;
        password: string;
    }): Promise<{
        token: string;
    }>;
    getUsers(authHeader: string): Promise<{
        id: number;
        dob: string;
        passcode: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}

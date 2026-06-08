import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
export declare class UsersController {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    private validateToken;
    findAll(authHeader: string): Promise<{
        id: number;
        dob: string;
        passcode: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string, authHeader: string): Promise<{
        id: number;
        dob: string;
        passcode: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    create(body: {
        dob: string;
        passcode: string;
    }, authHeader: string): Promise<{
        id: number;
        dob: string;
        passcode: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, body: {
        dob?: string;
        passcode?: string;
    }, authHeader: string): Promise<{
        id: number;
        dob: string;
        passcode: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string, authHeader: string): Promise<{
        id: number;
        dob: string;
        passcode: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}

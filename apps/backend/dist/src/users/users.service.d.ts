import { PrismaService } from '../prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: number;
        name: string;
        dob: string;
        passcode: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        dob: string;
        passcode: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    create(dob: string, passcode: string, name: string): Promise<{
        id: number;
        name: string;
        dob: string;
        passcode: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, dob?: string, passcode?: string, name?: string): Promise<{
        id: number;
        name: string;
        dob: string;
        passcode: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        dob: string;
        passcode: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}

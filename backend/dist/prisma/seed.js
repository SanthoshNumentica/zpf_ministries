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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
const bcrypt = __importStar(require("bcrypt"));
const pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    const adminEmail = 'admin@gmail.com';
    const adminPassword = 'Admin@123';
    const existingAdmin = await prisma.admin.findUnique({
        where: { email: adminEmail },
    });
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    if (!existingAdmin) {
        await prisma.admin.create({
            data: {
                email: adminEmail,
                password: hashedPassword,
            },
        });
        console.log('Seeded default admin user successfully.');
    }
    else {
        await prisma.admin.update({
            where: { email: adminEmail },
            data: { password: hashedPassword },
        });
        console.log('Admin user password updated successfully.');
    }
    const defaultDob = '1995-08-15';
    const defaultPasscode = '7777';
    const existingUser = await prisma.sanctuaryUser.findFirst({
        where: { dob: defaultDob, passcode: defaultPasscode },
    });
    if (!existingUser) {
        await prisma.sanctuaryUser.create({
            data: {
                dob: defaultDob,
                passcode: defaultPasscode,
            },
        });
        console.log('Seeded default sanctuary user successfully.');
    }
    else {
        console.log('Default sanctuary user already exists.');
    }
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map
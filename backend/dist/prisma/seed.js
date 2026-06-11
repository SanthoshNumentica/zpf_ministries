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
    const users = [
        { name: 'Philip Bro', dob: '2018-06-26' },
        { name: 'Gilbert Bro', dob: '2021-06-11' },
        { name: 'Sujith Bro', dob: '1726-11-14' },
        { name: 'Simon Bro', dob: '2006-04-26' },
        { name: 'Prabu Bro', dob: '2004-12-26' },
        { name: 'Rajamohan Bro', dob: '1967-10-07' },
        { name: 'Anusha Arun', dob: '2023-11-22' },
        { name: 'Joncy Sis', dob: '1997-05-03' },
        { name: 'Sowmiya Sis', dob: '2023-08-21' },
        { name: 'Vinu Bro', dob: '2010-08-15' },
        { name: 'Asir Bro', dob: '2000-12-21' },
        { name: 'Vigil Bro', dob: '1978-12-34' },
        { name: 'James Bro', dob: '2015-11-20' },
        { name: 'Sundar Bro', dob: '1952-08-48' },
        { name: 'Francis Bro', dob: '2022-03-15' },
        { name: 'Immanuel Bro', dob: '2092-12-25' },
        { name: 'John Peter Bro', dob: '2013-07-20' },
        { name: 'Satish Bro', dob: '1992-10-10' },
        { name: 'Joshua bro', dob: '2019-06-20' },
        { name: 'Jeroslin bro', dob: '1993-06-20' },
        { name: 'Moses bro', dob: '2005-12-07' },
        { name: 'Jermy', dob: '1980-09-18' },
        { name: 'Jermiah', dob: '1931-04-06' },
        { name: 'Mani', dob: '2015-11-15' },
        { name: 'Palani', dob: '1935-05-27' },
        { name: 'Sathish', dob: '1975-02-19' },
        { name: 'Rajesh', dob: '2026-11-15' },
        { name: 'Alwyn', dob: '1967-10-22' },
        { name: 'Sam', dob: '1987-03-03' },
        { name: 'Pon', dob: '1975-07-07' },
        { name: 'Muhil', dob: '2017-11-28' },
    ];
    const passcode = '2026';
    for (const user of users) {
        const existingUser = await prisma.sanctuaryUser.findFirst({
            where: { dob: user.dob },
        });
        if (!existingUser) {
            await prisma.sanctuaryUser.create({
                data: {
                    dob: user.dob,
                    passcode: passcode,
                },
            });
            console.log(`Seeded ${user.name} successfully.`);
        }
        else {
            await prisma.sanctuaryUser.update({
                where: { id: existingUser.id },
                data: { passcode: passcode },
            });
            console.log(`Updated ${user.name} passcode successfully.`);
        }
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
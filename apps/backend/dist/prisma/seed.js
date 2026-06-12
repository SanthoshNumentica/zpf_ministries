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
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
dotenv.config({ path: path.join(__dirname, '../.env') });
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
    await prisma.sanctuaryUser.deleteMany({});
    await prisma.$executeRawUnsafe(`ALTER SEQUENCE "SanctuaryUser_id_seq" RESTART WITH 1;`);
    console.log('Cleared existing sanctuary users and reset ID sequence to 1.');
    const users = [
        { name: 'Philip', dob: '26-06-2018' },
        { name: 'Gilbert', dob: '11-06-2021' },
        { name: 'Sujith', dob: '14-11-1726' },
        { name: 'Simon', dob: '26-04-2006' },
        { name: 'Prabu', dob: '26-12-2004' },
        { name: 'Rajamohan', dob: '07-10-1967' },
        { name: 'Anusha Arun', dob: '22-11-2023' },
        { name: 'Joncy Sis', dob: '03-05-1997' },
        { name: 'Sowmiya Sis', dob: '21-08-2023' },
        { name: 'Vinu ', dob: '15-08-2010' },
        { name: 'Asir ', dob: '21-12-2000' },
        { name: 'Vigil ', dob: '34-12-1978' },
        { name: 'James ', dob: '20-11-2015' },
        { name: 'Sundar ', dob: '48-08-1952' },
        { name: 'Francis ', dob: '15-03-2022' },
        { name: 'Immanuel ', dob: '25-12-2092' },
        { name: 'John Peter ', dob: '20-07-2013' },
        { name: 'Satish ', dob: '10-10-1992' },
        { name: 'Joshua ', dob: '20-06-2019' },
        { name: 'Jeroslin ', dob: '20-06-1993' },
        { name: 'Moses ', dob: '07-12-2005' },
        { name: 'Jermy', dob: '18-09-1980' },
        { name: 'Jermiah', dob: '06-04-1931' },
        { name: 'Mani', dob: '15-11-2015' },
        { name: 'Palani', dob: '27-05-1935' },
        { name: 'Sathish', dob: '19-02-1975' },
        { name: 'Rajesh', dob: '15-11-2026' },
        { name: 'Alwyn', dob: '22-10-1967' },
        { name: 'Sam', dob: '03-03-1987' },
        { name: 'Pon', dob: '07-07-1975' },
        { name: 'Muhil', dob: '28-11-2017' },
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
                    name: user.name,
                    passcode: passcode,
                },
            });
            console.log(`Seeded ${user.name} successfully.`);
        }
        else {
            await prisma.sanctuaryUser.update({
                where: { id: existingUser.id },
                data: { passcode: passcode, name: user.name },
            });
            console.log(`Updated ${user.name} passcode successfully.`);
        }
    }
    const defaultSongs = [
        { id: 'ahIVNoJZR2k', title: 'Gospel Song on John 3:16' },
        { id: 'Oi7MXSJbhi4', title: 'HE is my everything ' },
        { id: 'LmegPb_8LY8', title: 'Way Maker - Miracle Worker' },
        { id: 'gjWVYjgsbvo', title: 'Siluvaiandai Vaa Maganae (Communion/Good Friday)' },
        { id: 'G8HSX2oNkOk', title: 'Gethsemanae Poongavinil (Good Friday)' },
        { id: '1rXDQYK7eyk', title: 'Dayavulla Devan' },
        { id: '7j3ZrHhGMgk', title: 'Samuvel Pol' }
    ];
    const defaultServices = [
        {
            title: 'Promise Word Service',
            schedule: 'First Day of Every month',
            timing: '5:00 AM - 6:00 AM',
            locationType: 'Offline & Online',
            category: 'services',
            icon: 'bi-calendar-heart',
            color: 'blue'
        },
        {
            title: 'Promise Word & Communion Service',
            schedule: 'Every First Friday',
            timing: '10:00 AM - 1:00 PM',
            locationType: 'Offline & Online',
            category: 'services',
            icon: 'bi-droplet-fill',
            color: 'blue',
            note: 'Communion blessing service'
        },
        {
            title: 'Regular Tamil Service',
            schedule: 'Every Friday',
            timing: '10:00 AM - 1:00 PM',
            locationType: 'Offline & Online',
            category: 'services',
            icon: 'bi-bookmark-star',
            color: 'blue'
        },
        {
            title: 'Regular English Service',
            schedule: 'Every Friday',
            timing: '8:00 PM – 9:30 PM',
            locationType: 'Offline & Online',
            category: 'services',
            icon: 'bi-translate',
            color: 'blue',
            note: 'Note: Every First Friday is Communion Service'
        },
        {
            title: 'Bible Study & Intercessory Prayer',
            schedule: 'Every Sunday',
            timing: '8:00 PM – 9:30 PM',
            locationType: 'Online / In-Person',
            category: 'prayer',
            icon: 'bi-journal-text',
            color: 'orange'
        },
        {
            title: 'Open Gate & Revival Prayer',
            schedule: 'Every Tuesday',
            timing: '5:00 AM - 6:00 AM',
            locationType: 'Online Only',
            category: 'prayer',
            icon: 'bi-unlock-fill',
            color: 'orange'
        },
        {
            title: 'Preparatory Prayer',
            schedule: 'Every Thursday (except Last Thursday)',
            timing: '8:00 PM - 9:00 PM',
            locationType: 'Offline & Online',
            category: 'prayer',
            icon: 'bi-shield-plus',
            color: 'orange',
            note: 'Every Last Thursday is Missionary Prayer'
        },
        {
            title: 'Fasting Prayer',
            schedule: 'Last Saturday of Every month',
            timing: '10:00 AM - 1:00 PM',
            locationType: 'Offline & Online',
            category: 'prayer',
            icon: 'bi-hourglass-split',
            color: 'orange'
        },
        {
            title: "Women's Fellowship",
            schedule: 'Every First Wednesday',
            timing: '8:00 PM – 9:30 PM',
            locationType: 'Offline & Online',
            category: 'fellowship',
            icon: 'bi-gender-female',
            color: 'purple'
        },
        {
            title: "Men's Fellowship",
            schedule: 'Third Wednesday',
            timing: '8:00 PM – 9:30 PM',
            locationType: 'Offline & Online',
            category: 'fellowship',
            icon: 'bi-gender-male',
            color: 'purple'
        },
        {
            title: 'Youth Fellowship',
            schedule: 'Every Second Saturday',
            timing: '8:00 PM – 9:30 PM',
            locationType: 'Offline & Online',
            category: 'fellowship',
            icon: 'bi-people',
            color: 'purple'
        },
        {
            title: 'Quarterly 3 Days Fasting Prayer',
            schedule: 'Every Third Month – Last Three Days',
            timing: '4:00 AM – 6:00 AM',
            locationType: 'Offline & Online',
            category: 'seasonal',
            icon: 'bi-sun',
            color: 'green'
        },
        {
            title: '7 Days Year-End Preparatory Fasting Prayer',
            schedule: '25 Dec – 31 Dec',
            timing: '4:00 AM – 6:00 AM',
            locationType: 'Offline & Online',
            category: 'seasonal',
            icon: 'bi-calendar-range',
            color: 'green'
        }
    ];
    const defaultCovers = [
        { id: 'TGjOdhv1Nhw', title: 'Take My Life' },
        { id: 'Mre7sMP4x8s', title: 'Naan Vaalvathu' },
        { id: 'nj8tjql_4_Y', title: 'Bless the LORD oh my Soul' },
        { id: '1E7fi6_eqp8', title: 'Chinna Manusanukkulla' },
        { id: 't1ve4SPQxU4', title: 'He is my Everything' },
        { id: 's1vUKbApxdw', title: 'Unga Naamam Uyaranum' },
        { id: 'TiPelJY81eQ', title: 'Unga Kirubai' },
        { id: 'Jvk8HFrBrQU', title: 'Aadaram Neerthanaiyya' },
        { id: 'PLDeUIFs_FU', title: 'Saranadaivaen' },
        { id: '-BbX46j22V8', title: 'Alangara Vasalalae' },
        { id: '3wkXygdy7CQ', title: 'Vaanathilum Intha Boomiyilum' },
        { id: 'WcQ9zZ-9irI', title: 'Um Vasanam En Kangalai' },
        { id: 'OY1kHI-RNac', title: 'Aathumamae En Ullamae' },
        { id: 'QqFkV7mOw9I', title: 'Ennai Alithavarae' },
        { id: 'MYghky75U_Q', title: 'Yehovayeerae' },
        { id: 'fVvbm4wDAQM', title: 'Unga Naamam Uyaranum (Alt)' },
        { id: 'C5RPPkk3-Ns', title: 'Maatrumae Ennai Maatrumae' }
    ];
    const contentsToSeed = [
        { key: 'zion_songs', value: JSON.stringify(defaultSongs) },
        { key: 'casual_covers', value: JSON.stringify(defaultCovers) },
        { key: 'service_hours', value: JSON.stringify(defaultServices) }
    ];
    for (const item of contentsToSeed) {
        const existingContent = await prisma.websiteContent.findUnique({
            where: { key: item.key }
        });
        if (!existingContent) {
            await prisma.websiteContent.create({
                data: {
                    key: item.key,
                    value: item.value
                }
            });
            console.log(`Seeded default website content for key '${item.key}' successfully.`);
        }
        else {
            console.log(`Website content for key '${item.key}' already exists. Skipping.`);
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
    await pool.end();
});
//# sourceMappingURL=seed.js.map
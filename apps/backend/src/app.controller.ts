import { Controller, Get, Post, Put, Body, Headers, Param, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('auth/login')
  async login(@Body() body: { dob: string; passcode: string }) {
    const user = await this.prisma.sanctuaryUser.findFirst({
      where: {
        dob: body.dob,
        passcode: body.passcode,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Access Denied. Check DOB or Passcode.');
    }

    return { success: true, message: 'Welcome to the sanctuary' };
  }

  @Post('auth/admin/login')
  async adminLogin(@Body() body: { email: string; password: string }) {
    const admin = await this.prisma.admin.findUnique({
      where: { email: body.email },
    });
console.log(admin);
    if (!admin) {
      throw new UnauthorizedException('Access Denied. Check credentials.');
    }

    const isMatch = await bcrypt.compare(body.password, admin.password);
    if (!isMatch) {
      throw new UnauthorizedException('Access Denied. Check credentials.');
    }

    const token = this.jwtService.sign({ email: admin.email, sub: admin.id });
    return { token };
  }

  @Get('admin/users')
  async getUsers(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No authorization token provided.');
    }

    const token = authHeader.split(' ')[1];
    try {
      this.jwtService.verify(token);
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token.');
    }

    const users = await this.prisma.sanctuaryUser.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return users;
  }

  @Get('content/:key')
  async getContent(@Param('key') key: string) {
    const record = await this.prisma.websiteContent.findUnique({
      where: { key },
    });
    if (!record) {
      return null;
    }
    try {
      return JSON.parse(record.value);
    } catch (e) {
      return record.value;
    }
  }

  @Put('admin/content/:key')
  async updateContent(
    @Param('key') key: string,
    @Body() body: { value: any },
    @Headers('authorization') authHeader: string,
  ) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No authorization token provided.');
    }

    const token = authHeader.split(' ')[1];
    try {
      this.jwtService.verify(token);
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token.');
    }

    const valueStr = typeof body.value === 'string' ? body.value : JSON.stringify(body.value);

    const record = await this.prisma.websiteContent.upsert({
      where: { key },
      update: { value: valueStr },
      create: { key, value: valueStr },
    });

    return { success: true, key: record.key };
  }
}

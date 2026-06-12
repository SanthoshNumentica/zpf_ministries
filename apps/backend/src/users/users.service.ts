import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.sanctuaryUser.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.sanctuaryUser.findUnique({
      where: { id },
    });
  }

  async create(dob: string, passcode: string) {
    return this.prisma.sanctuaryUser.create({
      data: { dob, passcode },
    });
  }

  async update(id: number, dob?: string, passcode?: string) {
    return this.prisma.sanctuaryUser.update({
      where: { id },
      data: { dob, passcode },
    });
  }

  async remove(id: number) {
    return this.prisma.sanctuaryUser.delete({
      where: { id },
    });
  }
}

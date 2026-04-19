import prisma from '@/core/infra/prisma/client';

import { User } from '@/core/domain/user';
import UserRepository from '@/core/application/interfaces/user-repository';

export default class PrismaUserRepository implements UserRepository {
    public async findUserByEmail (email: string) {
        return await prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    public async saveUser (user: User) {
        await prisma.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
            },
        });
    }
}

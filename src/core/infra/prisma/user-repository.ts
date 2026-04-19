import prisma from '@/core/infra/prisma/client';

import UserRepository from '@/core/application/interfaces/user-repository';

export default class PrismaUserRepository implements UserRepository {
    public async findUserByEmail (email: string) {
        return await prisma.user.findUnique({
            where: {
                email,
            },
        });
    }
}

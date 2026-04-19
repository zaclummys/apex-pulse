import prisma from '@/core/infra/prisma/client';

import { Session } from '@/core/domain/session';
import SessionRepository from '@/core/application/interfaces/session-repository';

export default class PrismaSessionRepository implements SessionRepository {
    public async findSessionByToken (token: string) {
        return await prisma.session.findUnique({
            where: {
                token,
            },
        });
    }

    public async saveSession (session: Session) {
        await prisma.session.create({
            data: {
                id: session.id,
                token: session.token,
                userId: session.userId,
                expiresAt: session.expiresAt,
            },
        });
    }

    public async deleteSessionByToken (token: string) {
        await prisma.session.delete({
            where: {
                token,
            },
        });
    }
}

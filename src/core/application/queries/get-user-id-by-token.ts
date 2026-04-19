import SessionRepository from '@/core/application/interfaces/session-repository';

export class GetUserIdByTokenService {
    private sessionRepository: SessionRepository;

    constructor (sessionRepository: SessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    public async execute (token: string): Promise<string> {
        const session = await this.sessionRepository.findSessionByToken(token);

        if (!session) {
            throw new Error('Invalid session');
        }

        if (session.expiresAt < new Date()) {
            throw new Error('Session expired');
        }

        return session.userId;
    }
}

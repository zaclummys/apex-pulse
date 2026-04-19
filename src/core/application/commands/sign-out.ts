import SessionRepository from '@/core/application/interfaces/session-repository';

export type SignOutInput = {
    token: string;
};

export class SignOutService {
    private sessionRepository: SessionRepository;

    constructor (sessionRepository: SessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    public async execute ({ token }: SignOutInput) {
        const session = await this.sessionRepository.findSessionByToken(token);

        if (session) {
            await this.sessionRepository.deleteSessionByToken(token);
        }

    }
}

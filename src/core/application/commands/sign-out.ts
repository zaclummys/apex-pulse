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
        await this.sessionRepository.deleteSessionByToken(token);
    }
}

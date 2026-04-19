import crypto from 'crypto';

import UserRepository from '@/core/application/interfaces/user-repository';
import SessionRepository from '@/core/application/interfaces/session-repository';
import { Session } from '@/core/domain/session';

export type SignInInput = {
    email: string;
    password: string;
};

export type SignInOutput = {
    userId: string;
};

export class SignInService {
    private userRepository: UserRepository;
    private sessionRepository: SessionRepository;

    constructor ({
        userRepository,
        sessionRepository,
    }: {
        userRepository: UserRepository;
        sessionRepository: SessionRepository;
    }) {
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository;
    }

    public async execute ({
        email,
        password,
    }: SignInInput) {
        const user = await this.userRepository.findUserByEmail(email);

        if (!user) {
            throw new Error('Invalid email or password');
        }

        if (user.password !== password) {
            throw new Error('Invalid email or password');
        }

        const session: Session = {
            token: crypto.randomBytes(32).toString('hex'),
            userId: user.id,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        };

        await this.sessionRepository.saveSession(session);

        return {
            token: session.token,
        };
    }
}

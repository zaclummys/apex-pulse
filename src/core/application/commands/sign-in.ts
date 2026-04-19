import crypto from 'crypto';

import UserRepository from '@/core/application/interfaces/user-repository';
import SessionRepository from '@/core/application/interfaces/session-repository';

export type SignInInput = {
    email: string;
    password: string;
};

export type SignInOutput = {
    sessionToken: string;
    sessionDurationInMilliseconds: number;
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
            return {
                error: {
                    message: 'Invalid email or password',
                }
            }
        }

        if (user.password !== password) {
            return {
                error: {
                    message: 'Invalid email or password',
                }
            }
        }

        const sessionDurationInMilliseconds = 1000 * 60 * 60 * 24 * 7;

        const session = this.generateSessionFor({
            userId: user.id,
            durationInMilliseconds: sessionDurationInMilliseconds,
        });

        await this.sessionRepository.saveSession(session);

        return {
            success: {
                sessionToken: session.token,
                sessionDurationInMilliseconds: sessionDurationInMilliseconds,
            },
        };
    }

    private generateSessionFor ({
        userId,
        durationInMilliseconds,
    }: {
        userId: string;
        durationInMilliseconds: number;
    }) {
        return {
            userId: userId,
            token: crypto.randomBytes(32).toString('hex'),
            expiresAt: new Date(Date.now() + durationInMilliseconds),
        };
    }
}

import UserRepository from '@/core/application/interfaces/user-repository';
import { User } from '@/core/domain/user';

export type SignUpInput = {
    name: string;
    email: string;
    password: string;
};

export class SignUpService {
    private userRepository: UserRepository;

    constructor (userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async execute ({
        name,
        email,
        password,
    }: SignUpInput) {
        const existingUser = await this.userRepository.findUserByEmail(email);

        if (existingUser) {
            throw new Error('Email already in use');
        }

        const user: User = {
            name,
            email,
            password,
        };

        await this.userRepository.saveUser(user);
    }
}

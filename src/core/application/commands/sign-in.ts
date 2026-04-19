import UserRepository from '@/core/application/interfaces/user-repository';

export type SignInInput = {
    email: string;
    password: string;
};

export type SignInOutput = {
    userId: string;
};

export class SignInService {
    private userRepository: UserRepository;

    constructor (userRepository: UserRepository) {
        this.userRepository = userRepository;
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
    }
}

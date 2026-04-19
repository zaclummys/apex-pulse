import { User } from '@/core/domain/user';

type SavedUser = User & {
    id: string;
};

export default interface UserRepository {
    findUserByEmail (email: string): Promise<SavedUser | null>;
    saveUser (user: User): Promise<void>;
}

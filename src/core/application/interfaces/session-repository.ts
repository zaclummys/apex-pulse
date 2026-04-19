import { Session } from '@/core/domain/session';

type SavedSession = Session & {
    id: string;
};

export default interface SessionRepository {
    findSessionByToken (token: string): Promise<SavedSession | null>;
    saveSession (session: Session): Promise<void>;
    deleteSessionByToken (token: string): Promise<void>;
}

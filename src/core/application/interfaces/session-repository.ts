import { Session } from '@/core/domain/session';

export default interface SessionRepository {
    saveSession (session: Session): Promise<void>;
}

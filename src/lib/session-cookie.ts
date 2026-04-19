import { cookies } from 'next/headers';

const sessionCookieName = 'session_token';
const sessionDurationInSeconds = 60 * 60 * 24 * 7;

export function createSessionExpirationDate () {
    return new Date(Date.now() + sessionDurationInSeconds * 1000);
}

export async function getSessionToken () {
    const cookieStore = await cookies();

    return cookieStore.get(sessionCookieName)?.value;
}

export async function setSessionToken (token: string) {
    const cookieStore = await cookies();

    cookieStore.set(sessionCookieName, token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: sessionDurationInSeconds,
    });
}

export async function deleteSessionToken () {
    const cookieStore = await cookies();

    cookieStore.delete(sessionCookieName);
}

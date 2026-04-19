import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'session_token';
const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export async function getSessionToken () {
    const cookieStore = await cookies();

    return cookieStore.get(SESSION_COOKIE_NAME)?.value;
}

export async function setSessionToken (token: string) {
    const cookieStore = await cookies();

    cookieStore.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: SESSION_COOKIE_MAX_AGE,
    });
}

export async function deleteSessionToken () {
    const cookieStore = await cookies();

    cookieStore.delete(SESSION_COOKIE_NAME);
}

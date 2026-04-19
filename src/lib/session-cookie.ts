import { cookies } from 'next/headers';

const sessionCookieName = 'session_token';

export async function getSessionToken () {
    const cookieStore = await cookies();

    return cookieStore.get(sessionCookieName)?.value;
}

export async function setSessionToken ({
    token,
    maxAgeInSeconds,
}: {
    token: string;
    maxAgeInSeconds: number;
}) {
    const cookieStore = await cookies();

    cookieStore.set(sessionCookieName, token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: maxAgeInSeconds,
    });
}

export async function deleteSessionToken () {
    const cookieStore = await cookies();

    cookieStore.delete(sessionCookieName);
}

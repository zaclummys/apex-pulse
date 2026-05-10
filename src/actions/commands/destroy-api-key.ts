'use server';

import { revalidatePath } from 'next/cache';

import { destroyApiKey } from '@/core';

export default async function destroyApiKeyAction (apiKeyId: string, organizationId: string): Promise<void> {
    await destroyApiKey({ id: apiKeyId });

    revalidatePath(`/dashboard/organizations/${organizationId}`);
}

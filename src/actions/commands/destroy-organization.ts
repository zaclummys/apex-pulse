'use server';

import { destroyOrganization } from '@/core';
import { redirect } from 'next/navigation';

export default async function destroyOrganizationAction (organizationId: string): Promise<void> {
    await destroyOrganization({ id: organizationId });

    redirect('/dashboard');
}

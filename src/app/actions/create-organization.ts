'use server';

import { createOrganization } from '@/core';
import { redirect } from 'next/navigation';

export default async function createOrganizationAction (state: any, formData: FormData) {
    const organizationName = formData.get("organizationName") as string;
    const organizationId = formData.get("organizationId") as string;

    await createOrganization({
        id: organizationId,
        name: organizationName,
    });

    redirect("/dashboard/organizations");
}

function delay (ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
'use server';

import { createOrganization } from '@/core';
import { redirect } from 'next/navigation';

import getCurrentUserId from '@/app/actions/get-current-user-id';

type CreateOrganizationState = {
    fields: {
        organizationName: string;
        organizationSalesforceId: string;
    };
    errors?: {
        message: string;
    };
}

export default async function createOrganizationAction (state: CreateOrganizationState, formData: FormData): Promise<CreateOrganizationState> {
    const currentUserId = await getCurrentUserId();

    const organizationName = formData.get("organizationName") as string;
    const organizationSalesforceId = formData.get("organizationSalesforceId") as string;

    await createOrganization({
        name: organizationName,
        salesforceId: organizationSalesforceId,
        userId: currentUserId,
    });

    redirect("/dashboard/organizations");

    return {
        fields: {
            organizationName,
            organizationSalesforceId,
        },
    }
}
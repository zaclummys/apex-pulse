'use server';

import { createOrganization } from '@/core';
import { redirect } from 'next/navigation';

import getCurrentUserId from '@/actions/queries/get-current-user-id';

type CreateOrganizationState = {
    fields: {
        organizationName: string;
    };
    errors?: {
        message: string;
    };
}

export default async function createOrganizationAction (state: CreateOrganizationState, formData: FormData): Promise<CreateOrganizationState> {
    const currentUserId = await getCurrentUserId();

    const organizationName = formData.get("organizationName") as string;

    try {
        await createOrganization({
            name: organizationName,
            userId: currentUserId,
        });
    } catch (error) {
        console.error('An error occurred while creating the organization:', error);

        return {
            fields: {
                organizationName,
            },
            errors: {
                message: 'An unexpected error occurred. Please try again later.',
            },
        };
    }

    redirect("/dashboard/organizations");
}
'use server';

import { createApiKey } from '@/core';

type CreateApiKeyState = {
    fields: {
        name: string;
    };
    createdKey?: string;
    errors?: {
        message: string;
    };
};

export default async function createApiKeyAction (state: CreateApiKeyState, formData: FormData): Promise<CreateApiKeyState> {
    const name = formData.get('name') as string;
    const organizationId = formData.get('organizationId') as string;

    try {
        const result = await createApiKey({ name, organizationId });

        return {
            fields: { name },
            createdKey: result.key,
        };
    } catch (error) {
        console.error('An error occurred while creating the API key:', error);

        return {
            fields: { name },
            errors: {
                message: 'An unexpected error occurred. Please try again later.',
            },
        };
    }
}

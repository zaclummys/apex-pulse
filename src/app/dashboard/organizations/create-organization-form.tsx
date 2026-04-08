'use client';

import { useActionState } from 'react'
import createOrganizationAction from '@/app/actions/create-organization';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function CreateOrganizationForm () {
    const [state, action, pending] = useActionState<any, FormData>(createOrganizationAction, {
        fields: {
            organizationId: "",
            organizationName: "",
        },
    });

    return (
        <form
            action={action}
            className="flex flex-col items-start gap-4">
            <Input
                type="text"
                name="organizationName"
                placeholder="Organization Name"
                defaultValue={state.fields.organizationName}
                required
            />

            <Input
                type="text"
                name="organizationId"
                placeholder="Organization ID"
                defaultValue={state.fields.organizationId}
                required
            />

            {state.errors && (
                <div className="text-red-500">
                    {state.errors.message}
                </div>
            )}

            <Button type="submit" disabled={pending}>
                {pending ? "Creating organization..." : "Create Organization"}
            </Button>
        </form>
    );
}
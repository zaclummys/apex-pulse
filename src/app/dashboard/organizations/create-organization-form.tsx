'use client';

import { useActionState } from 'react'
import createOrganizationAction from '@/app/actions/commands/create-organization';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function CreateOrganizationForm () {
    const [state, action, pending] = useActionState(createOrganizationAction, {
        fields: {
            organizationName: ""
        },
    });

    return (
        <form
            action={action}
            className="flex flex-row items-start gap-4">
            <Input
                type="text"
                name="organizationName"
                placeholder="Organization Name"
                defaultValue={state.fields.organizationName}
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
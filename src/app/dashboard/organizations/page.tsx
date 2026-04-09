import getOrganizations from '@/app/actions/queries/get-organizations';

import CreateOrganizationForm from "./create-organization-form";

export default async function Organizations () {
    const organizations = await getOrganizations();

    return (
        <div>
            Organizations

            <ul>
                {organizations.map(organization => (
                    <li key={organization.id}>{organization.name}</li>
                ))}
            </ul>
            
            <CreateOrganizationForm />
        </div>
    )
}


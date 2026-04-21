import Link from 'next/link';

import getOrganizations from '@/actions/queries/get-organizations';

import CreateOrganizationForm from "./create-organization-form";

export default async function Organizations () {
    const organizations = await getOrganizations();

    return (
        <div>
            Organizations

            <CreateOrganizationForm />
            
            <ul>
                {organizations.map(organization => (
                    <li key={organization.id}>
                        <Link href={`/dashboard/organizations/${organization.id}`}>
                            {organization.name}
                        </Link>
                    </li>
                ))}
            </ul>
            
        </div>
    )
}


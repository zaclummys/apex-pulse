import { getOrganizationsByUserId } from '@/core';
import getCurrentUserId from '@/app/actions/queries/get-current-user-id';

export default async function getOrganizationsAction () {
    const currentUserId = await getCurrentUserId();

    return getOrganizationsByUserId(currentUserId);
}
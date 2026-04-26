import { getOrganizationsByUserId } from '@/core';
import getCurrentUserId from '@/actions/queries/get-current-user-id';

export default async function getAllOrganizationsAction () {
    const currentUserId = await getCurrentUserId();

    return getOrganizationsByUserId(currentUserId);
}
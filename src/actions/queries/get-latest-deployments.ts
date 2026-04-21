import { getLatestDeployments } from '@/core';
import getCurrentUserId from '@/actions/queries/get-current-user-id';

export default async function getLatestDeploymentsAction () {
    const currentUserId = await getCurrentUserId();

    return getLatestDeployments(currentUserId);
}

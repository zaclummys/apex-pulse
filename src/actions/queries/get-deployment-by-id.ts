import { getDeploymentById } from '@/core';

export default async function getDeploymentByIdAction (id: string) {
    return getDeploymentById(id);
}

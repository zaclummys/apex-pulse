import PrismaDeploymentRepository from '@/core/infra/prisma/deployment-repository';
import PrismaOrganizationRepository from '@/core/infra/prisma/organization-repository';

import {
    GetOrganizationService,
    GetOrganizationParams,
} from '@/core/application/queries/get-organization';

import {
    GetDeploymentService,
    GetDeploymentParams,
} from '@/core/application/queries/get-deployment';

import {
    CreateOrganizationService,
    CreateOrganizationParams,
} from '@/core/application/commands/create-organization';

import {
    CreateDeploymentService,
    CreateDeploymentParams,
 } from '@/core/application/commands/create-deployment';

import {
    GetDeploymentsByOrganizationIdService,
    GetDeploymentsByOrganizationIdParams,
} from '@/core/application/queries/get-deployments-by-organization-id';

const prismaDeploymentRepository = new PrismaDeploymentRepository();
const prismaOrganizationRepository = new PrismaOrganizationRepository();

export function getOrganization (getOrganizationParams: GetOrganizationParams) {
    const getOrganizationService = new GetOrganizationService(prismaOrganizationRepository);

    return getOrganizationService.execute(getOrganizationParams);
}

export function getDeployment (getDeploymentParams: GetDeploymentParams) {
    const getDeploymentService = new GetDeploymentService(prismaDeploymentRepository);

    return getDeploymentService.execute(getDeploymentParams);
}

export function getDeploymentsByOrganizationId (getDeploymentsByOrganizationIdParams: GetDeploymentsByOrganizationIdParams) {
    const getDeploymentsService = new GetDeploymentsByOrganizationIdService(prismaDeploymentRepository);

    return getDeploymentsService.execute(getDeploymentsByOrganizationIdParams);
}

export function createOrganization (createOrganizationParams: CreateOrganizationParams) {
    const createOrganizationService = new CreateOrganizationService(prismaOrganizationRepository);

    return createOrganizationService.execute(createOrganizationParams);
}

export function createDeployment (createDeploymentParams: CreateDeploymentParams) {
    const createDeploymentService = new CreateDeploymentService(prismaDeploymentRepository);

    return createDeploymentService.execute(createDeploymentParams);
}
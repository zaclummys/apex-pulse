import PrismaDeploymentRepository from '@/core/infra/prisma/deployment-repository';
import PrismaOrganizationRepository from '@/core/infra/prisma/organization-repository';
import PrismaApiKeyRepository from '@/core/infra/prisma/api-key-repository';

import {
    GetOrganizationService,
    GetOrganizationParams,
} from '@/core/application/queries/get-organization';

import {
    GetDeploymentService,
    GetDeploymentParams,
} from '@/core/application/queries/get-deployment';

import {
    GetDeploymentsByOrganizationIdService,
    GetDeploymentsByOrganizationIdParams,
} from '@/core/application/queries/get-deployments-by-organization-id';

import {
    CreateOrganizationService,
    CreateOrganizationParams,
} from '@/core/application/commands/create-organization';

import {
    CreateDeploymentService,
    CreateDeploymentParams,
} from '@/core/application/commands/create-deployment';

import {
    CreateApiKeyService,
    CreateApiKeyInput,
} from '@/core/application/commands/create-api-key';

const deploymentRepository = new PrismaDeploymentRepository();
const organizationRepository = new PrismaOrganizationRepository();
const apiKeyRepository = new PrismaApiKeyRepository();

export function getOrganization (getOrganizationParams: GetOrganizationParams) {
    const getOrganizationService = new GetOrganizationService(organizationRepository);

    return getOrganizationService.execute(getOrganizationParams);
}

export function getDeployment (getDeploymentParams: GetDeploymentParams) {
    const getDeploymentService = new GetDeploymentService(deploymentRepository);

    return getDeploymentService.execute(getDeploymentParams);
}

export function getDeploymentsByOrganizationId (getDeploymentsByOrganizationIdParams: GetDeploymentsByOrganizationIdParams) {
    const getDeploymentsService = new GetDeploymentsByOrganizationIdService(deploymentRepository);

    return getDeploymentsService.execute(getDeploymentsByOrganizationIdParams);
}

export function createOrganization (createOrganizationParams: CreateOrganizationParams) {
    const createOrganizationService = new CreateOrganizationService(organizationRepository);

    return createOrganizationService.execute(createOrganizationParams);
}

export function createDeployment (createDeploymentParams: CreateDeploymentParams) {
    const createDeploymentService = new CreateDeploymentService({
        deploymentRepository,
        organizationRepository,
    });

    return createDeploymentService.execute(createDeploymentParams);
}

export function createApiKey (createApiKeyInput: CreateApiKeyInput) {
    const createApiKeyService = new CreateApiKeyService({
        organizationRepository,
        apiKeyRepository,
    });

    return createApiKeyService.execute(createApiKeyInput);
}
import PrismaDeploymentRepository from '@/core/infra/prisma/deployment-repository';
import PrismaOrganizationRepository from '@/core/infra/prisma/organization-repository';
import PrismaApiKeyRepository from '@/core/infra/prisma/api-key-repository';

import { GetOrganizationByIdService } from '@/core/application/queries/get-organization-by-id';

import { GetDeploymentByIdService } from '@/core/application/queries/get-deployment-by-id';

import { GetDeploymentsByOrganizationIdService } from '@/core/application/queries/get-deployments-by-organization-id';

import {
    CreateOrganizationService,
    CreateOrganizationInput,
} from '@/core/application/commands/create-organization';

import {
    CreateDeploymentService,
    CreateDeploymentInput,
} from '@/core/application/commands/create-deployment';

import {
    CreateApiKeyService,
    CreateApiKeyInput,
} from '@/core/application/commands/create-api-key';

const deploymentRepository = new PrismaDeploymentRepository();
const organizationRepository = new PrismaOrganizationRepository();
const apiKeyRepository = new PrismaApiKeyRepository();

export function getOrganizationById (id: string) {
    const getOrganizationByIdService = new GetOrganizationByIdService(organizationRepository);

    return getOrganizationByIdService.execute(id);
}

export function getDeploymentById (id: string) {
    const getDeploymentByIdService = new GetDeploymentByIdService(deploymentRepository);

    return getDeploymentByIdService.execute(id);
}

export function getDeploymentsByOrganizationId (organizationId: string) {
    const getDeploymentsByOrganizationIdService = new GetDeploymentsByOrganizationIdService(deploymentRepository);

    return getDeploymentsByOrganizationIdService.execute(organizationId);
}

export function createOrganization (createOrganizationInput: CreateOrganizationInput) {
    const createOrganizationService = new CreateOrganizationService(organizationRepository);

    return createOrganizationService.execute(createOrganizationInput);
}

export function createDeployment (createDeploymentInput: CreateDeploymentInput) {
    const createDeploymentService = new CreateDeploymentService({
        deploymentRepository,
        organizationRepository,
    });

    return createDeploymentService.execute(createDeploymentInput);
}

export function createApiKey (createApiKeyInput: CreateApiKeyInput) {
    const createApiKeyService = new CreateApiKeyService({
        organizationRepository,
        apiKeyRepository,
    });

    return createApiKeyService.execute(createApiKeyInput);
}
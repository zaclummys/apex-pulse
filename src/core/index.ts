import PrismaDeploymentRepository from '@/core/infra/prisma/deployment-repository';
import PrismaOrganizationRepository from '@/core/infra/prisma/organization-repository';

import {
    GetOrganizationService,
    GetOrganizationParams,
} from '@/core/application/get-organization';

import {
    GetDeploymentService,
    GetDeploymentParams,
} from '@/core/application/get-deployment';

import {
    CreateOrganizationService,
    CreateOrganizationParams,
} from '@/core/application/create-organization';

import {
    CreateDeploymentService,
    CreateDeploymentParams,
 } from '@/core/application/create-deployment';

import {
    GetDeploymentsByOrganizationIdService,
    GetDeploymentsByOrganizationIdParams,
} from '@/core/application/get-deployments-by-organization-id';

export function getOrganization (getOrganizationParams: GetOrganizationParams) {
    const getOrganizationService = new GetOrganizationService(
        new PrismaOrganizationRepository()
    );

    return getOrganizationService.execute(getOrganizationParams);
}

export function getDeployment (getDeploymentParams: GetDeploymentParams) {
    const getDeploymentService = new GetDeploymentService(
        new PrismaDeploymentRepository()
    );

    return getDeploymentService.execute(getDeploymentParams);
}

export function getDeploymentsByOrganizationId (getDeploymentsByOrganizationIdParams: GetDeploymentsByOrganizationIdParams) {
    const getDeploymentsService = new GetDeploymentsByOrganizationIdService(
        new PrismaDeploymentRepository()
    );

    return getDeploymentsService.execute(getDeploymentsByOrganizationIdParams);
}

export function createOrganization (createOrganizationParams: CreateOrganizationParams) {
    const createOrganizationService = new CreateOrganizationService(
        new PrismaOrganizationRepository()
    );

    return createOrganizationService.execute(createOrganizationParams);
}

export function createDeployment (createDeploymentParams: CreateDeploymentParams) {
    const createDeploymentService = new CreateDeploymentService(
        new PrismaDeploymentRepository()
    );

    return createDeploymentService.execute(createDeploymentParams);
}
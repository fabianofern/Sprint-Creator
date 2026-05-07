import { Router } from 'express';
import projectRoutes from './project.routes.ts';
import teamMemberRoutes from './teamMember.routes.ts';
import sprintRoutes from './sprint.routes.ts';
import backlogRoutes from './backlogItem.routes.ts';
import forecastRoutes from './forecast.routes.ts';
import companyRoutes from './company.routes.ts';
import metricsRoutes from './metrics.routes.ts';
import scenarioRoutes from './scenario.routes.ts';
import userProfileRoutes from './userProfile.routes.ts';

// Controllers para endpoints rápidos de agregação
import * as teamMemberController from '../controllers/teamMember.controller.js';

const router = Router();

// Root routes
router.use('/projects', projectRoutes);
router.use('/companies', companyRoutes);
router.use('/my-profile', userProfileRoutes);

// Nested routes (Project scope)
router.use('/projects/:projectId/members', teamMemberRoutes);
router.use('/projects/:projectId/sprints', sprintRoutes);
router.use('/projects/:projectId/backlog', backlogRoutes);
router.use('/projects/:projectId/forecast', forecastRoutes);
router.use('/projects/:projectId/metrics', metricsRoutes);

// Direct member routes (for convenience)
router.get('/members/:id', teamMemberController.getMemberById);

export default router;

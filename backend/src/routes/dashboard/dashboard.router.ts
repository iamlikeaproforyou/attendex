import express from 'express'
import { httpUpdateLayoutFromDashboard , httpUpdateDaysNotToInclude } from './dashboard.controller';

const dashboardRouter = express.Router();

dashboardRouter.post('/dashboard' , httpUpdateLayoutFromDashboard)
dashboardRouter.post('/dashboard/day', httpUpdateDaysNotToInclude)

export default dashboardRouter
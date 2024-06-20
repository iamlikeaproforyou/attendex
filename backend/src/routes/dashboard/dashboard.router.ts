import express from 'express'
import { httpGetDashboard } from './dashboard.controller';

const dashboardRouter = express.Router();

dashboardRouter.get('/dashboard' , httpGetDashboard)

export default dashboardRouter
import express from 'express'
import { httpGetAnalysis } from './analysis.controller'

const analysisRouter = express.Router()

analysisRouter.get('/analysis' , httpGetAnalysis)

export default analysisRouter
import express from 'express'
import { httpGetLayout } from './layout.controller'

const layoutRouter = express.Router()

layoutRouter.get('/layout',httpGetLayout)

export default layoutRouter
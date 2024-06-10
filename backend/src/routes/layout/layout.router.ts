import express from 'express'
import { httpGetLayout , httpCreateNewLayout, httpUpdateLayout } from './layout.controller'

const layoutRouter = express.Router()

layoutRouter.get('/layout',httpGetLayout)
layoutRouter.post('/layout' , httpCreateNewLayout)
layoutRouter.post('/layout' , httpUpdateLayout)

export default layoutRouter
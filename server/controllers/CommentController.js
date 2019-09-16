import express from 'express'
import { Authorize } from '../middleware/authorize'
import CommentService from '../services/CommentService'

let _cs = new CommentService().repository

export default class CommentController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .get('', this.getAll)
      .get('/:id', this.getByCommentId)
      .post('', this.create)
      // .put('/:id', this.edit)
      .delete('/:id', this.delete)
      .use(this.defaultRoute)
  }
  //NOTE may need to populate 
  async getAll(req, res, next) {
    try {
      let data = await _cs.find({})
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async getByCommentId(req, res, next) {
    try {
      let data = await _cs.findById(req.params.id)
      if (!data) {
        throw new Error('invalidi id')
      }
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      req.body.user = req.session.uid
      let data = await _cs.create(req.body)
      res.send(data)
    } catch (error) {
      next(error)

    }
  }
  // edit(req, res, next) {
  //   throw new Error("Method not implemented.");
  // }
  async delete(req, res, next) {
    try {
      let data = await _cs.findOneAndRemove({ _id: req.params.id, user: req.session.uid })
      if (!data) {
        throw new Error('invalidi id')
      }
    } catch (error) {
      next(error)

    }
  }
  defaultRoute(defaultRoute) {
    throw new Error("Method not implemented.");
  }
}
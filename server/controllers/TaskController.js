import express from 'express'
import { Authorize } from '../middleware/authorize'
import TaskService from '../services/TaskService'
import CommentService from '../services/CommentService'

let _ts = new TaskService().repository
let _cs = new CommentService().repository

//NOTE these should be working

export default class TaskController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .get('', this.getAll)
      .get('/:id', this.getByTaskId)
      .get('/:id/comments', this.getComments)
      .post('', this.create)
      // .put('/:id', this.edit)
      .delete('/:id', this.delete)
      .use(this.defaultRoute)
  }
  //NOTE may need to populate 
  async getAll(req, res, next) {
    try {
      let data = await _ts.find({})
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async getByTaskId(req, res, next) {
    try {
      let data = await _ts.findById(req.params.id)
      if (!data) {
        throw new Error('invalidi id')
      }
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async getComments(req, res, next) {
    try {
      let data = await _cs.find({ taskId: req.params.id })
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let data = await _ts.create(req.body)
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
      let data = await _ts.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
      if (!data) {
        throw new Error('invalidi id')
      }
      res.send('Deleted Value')
    } catch (error) {
      next(error)

    }
  }
  defaultRoute(defaultRoute) {
    throw new Error("Method not implemented.");
  }
}
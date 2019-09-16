import express from 'express'
import { Authorize } from '../middleware/authorize.js'
import TaskService from '../services/TaskService'
import ListService from '../services/ListService'

let _ts = new TaskService().repository
let _ls = new ListService().repository

//NOTE these routes should be working

export default class ListController {

  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .get('', this.getAllLists)
      .get('/:id', this.getByListId)
      .get('/:id/tasks', this.getTasks)
      .post('', this.create)
      // .put('/:id', this.edit)
      .delete('/:id', this.delete)
      .use(this.defaultRoute)
  }

  //NOTE check later for .populate

  async getAllLists(req, res, next) {
    try {
      let data = await _ls.find({})
      return res.send(data)
    } catch (error) { next(error) }
  }
  async getByListId(req, res, next) {
    try {
      let data = await _ls.findById(req.params.id)
      if (!data) {
        throw new Error('Invalid ID')
      }
      return res.send(data)
    } catch (error) { next(error) }
  }
  async getTasks(req, res, next) {
    try {
      let data = await _ts.find({ listId: req.params.id })
      //NOTE might need to populate "Task"
      return res.send(data)
    } catch (error) { next(error) }
  }
  async create(req, res, next) {
    try {
      req.body.authorId = req.session.uid
      let data = await _ls.create(req.body)
      res.send(data)
    } catch (error) { next(error) }
  }
  // async edit(req, res, next) {
  //   try {

  //   } catch (error) { next(error) }
  // }
  async delete(req, res, next) {
    try {
      let data = await _ls.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
      if (!data) {
        throw new Error('Invalid ID')
      }
      res.send('Deleted Value')
    } catch (error) { next(error) }
  }
  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No Such Route' })
  }
}
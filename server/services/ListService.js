import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
import TaskService from '../services/TaskService'
import CommentService from "./CommentService"

let _taskService = new TaskService().repository
let _commentService = new CommentService().repository

let _schema = new Schema({
  title: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true }
}, { timestamps: true })


//CASCADE ON DELETE
_schema.pre('findOneAndRemove', function (next) {
  //lets find all the lists and remove them
  Promise.all([
    _taskService.deleteMany({ listId: this._conditions._id }),
    _commentService.deleteMany({ listId: this._conditions._id })
  ])
    .then(() => next())
    .catch(err => next(err))
})

export default class ListService {
  get repository() {
    return mongoose.model('List', _schema)
  }
}


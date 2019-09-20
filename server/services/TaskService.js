import mongoose from 'mongoose'
import CommentService from './CommentService'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

let _commentService = new CommentService().repository

const _model = new Schema({
  description: { type: String, required: true },
  listId: { type: ObjectId, ref: 'List', required: true },
  authorId: { type: ObjectId, ref: 'List', required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true }
})


//CASCADE ON DELETE
_model.pre('findOneAndRemove', function (next) {
  //lets find all the lists and remove them
  Promise.all([
    _commentService.deleteMany({ taskId: this._conditions._id })
  ])
    .then(() => next())
    .catch(err => next(err))
})

export default class TaskService {
  get repository() {
    return mongoose.model('Task', _model)
  }
}
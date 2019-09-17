import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const _model = new Schema({
  content: { type: String },
  taskId: { type: ObjectId, ref: 'Task', required: true },
  authorId: { type: ObjectId, ref: 'User', required: true },
  boardId: { type: ObjectId, ref: "Board", required: true }
})

export default class CommentService {
  get repository() {
    return mongoose.model('Comment', _model)
  }
}
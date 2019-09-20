import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const _model = new Schema({
  content: { type: String, required: true },
  taskId: { type: ObjectId, ref: 'Task', required: true },
  authorId: { type: ObjectId, ref: 'User', required: true },
  boardId: { type: ObjectId, ref: "Board", required: true },
  listId: { type: ObjectId, ref: "List", required: true }
})

export default class CommentService {
  get repository() {
    return mongoose.model('Comment', _model)
  }
}
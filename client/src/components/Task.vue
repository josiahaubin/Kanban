<template>
  <div class="task border rounded">
    <div class="cp" @click="showInput = !showInput">
      <p>{{taskProp.description}}</p>
    </div>
    <ul>
      <comment v-for="comment in comments" :commentProp="comment" :key="comment._id" />
    </ul>

    <div v-if="showInput" class="input-group mb-3">
      <input type="text" class="form-control" placeholder="New Comment" v-model="query" />
      <div class="input-group-append">
        <button class="btn btn-success mb-1" @click="addComment()">
          Add Comment
          <i class="fas fa-check"></i>
        </button>
      </div>
    </div>
    <button v-if="showInput" class="btn btn-danger mb-2" @click="deleteTask()">
      Delete Task
      <i class="fas fa-trash"></i>
    </button>
  </div>
</template>


<script>
import comment from "../components/Comment";
export default {
  name: "task",
  props: ["taskProp"],
  data() {
    return {
      showInput: false,
      query: ""
    };
  },
  mounted() {
    this.getComments();
  },
  computed: {
    comments() {
      return this.$store.state.comments[this.taskProp._id] || [];
    }
  },
  methods: {
    getComments() {
      this.$store.dispatch("getComments", this.taskProp._id);
    },
    addComment() {
      this.$store.dispatch("addComment", {
        content: this.query,
        taskId: this.taskProp._id,
        boardId: this.taskProp.boardId,
        listId: this.taskProp.listId
      });
      this.query = "";
    },
    deleteTask() {
      this.$store.dispatch("deleteTask", {
        taskId: this.taskProp._id,
        listId: this.taskProp.listId
      });
    }
  },
  components: { comment }
};
</script>


<style scoped>
.cp {
  cursor: pointer;
}
</style>
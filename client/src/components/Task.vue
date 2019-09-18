<template>
  <drag
    :transferData="{taskId: this.taskProp._id,
        listId: this.selected,
        boardId: this.taskProp.boardId,
        oldListId: this.taskProp.listId }"
  >
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
        <button v-if="showInput" class="btn btn-danger mb-2" @click="deleteTask()">
          Delete Task
          <i class="fas fa-trash"></i>
        </button>
      </div>
      <hr v-if="showInput" />
      <button v-if="showInput" class="btn btn-danger mb-2" @click="deleteTask()">
        Delete Task
        <i class="fas fa-trash"></i>
      </button>
      <hr v-if="showInput" />
      <p v-if="showInput">Move To:</p>
      <select v-if="showInput" v-model="selected">
        <option disabled>Select a List</option>
        <option v-for="list in lists" :key="list._id" :value="list._id">{{list.title}}</option>
      </select>
      <button v-if="showInput" class="btn btn-warning ml-2 mb-1" @click="changeList()">
        Move Task
        <i class="fas fa-location-arrow"></i>
      </button>
    </div>
  </drag>
</template>


<script>
import { Drag, Drop } from "vue-drag-drop";
import comment from "../components/Comment";
export default {
  name: "task",
  props: ["taskProp"],
  data() {
    return {
      showInput: false,
      query: "",
      selected: ""
    };
  },
  mounted() {
    this.getComments();
  },
  computed: {
    comments() {
      return this.$store.state.comments[this.taskProp._id] || [];
    },
    lists() {
      return this.$store.state.lists;
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
  components: { comment, Drag, Drop }
};
</script>


<style scoped>
.cp {
  cursor: pointer;
}
</style>
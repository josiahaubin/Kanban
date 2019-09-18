<template>
  <drop @drop="changeList" class="list col-4 mt-2 border rounded">
    <div>
      <h2>
        {{listProp.title}}
        <button class="btn btn-danger float-right mt-1" @click="deleteList()">
          <i class="fas fa-trash"></i>
        </button>
      </h2>
      <Task v-for="task in tasks" :key="task._id" :taskProp="task" />
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="New Task Description" v-model="query" />
        <div class="input-group-append">
          <button class="btn btn-success mb-1" @click="addTask()">
            Add Task
            <i class="fas fa-check"></i>
          </button>
        </div>
      </div>
    </div>
  </drop>
</template>


<script>
import { Drag, Drop } from "vue-drag-drop";
import Task from "../components/Task";
export default {
  name: "list",
  props: ["listProp"],
  data() {
    return {
      query: ""
    };
  },
  mounted() {
    this.getTasks();
  },
  computed: {
    tasks() {
      return this.$store.state.tasks[this.listProp._id] || [];
    }
  },
  methods: {
    getTasks() {
      this.$store.dispatch("getTasks", this.listProp._id);
    },
    deleteList() {
      this.$store.dispatch("deleteList", {
        listId: this.listProp._id,
        boardId: this.listProp.boardId
      });
    },
    addTask() {
      this.$store.dispatch("addTask", {
        description: this.query,
        listId: this.listProp._id,
        boardId: this.listProp.boardId
      });
      this.query = "";
    },
    changeList(obj) {
      this.$store.dispatch("changeList", {
        taskId: obj.taskId,
        listId: this.listProp._id,
        boardId: obj.boardId,
        oldListId: obj.oldListId
      });
    }
  },
  components: { Task, Drag, Drop }
};
</script>


<style scoped>
</style>

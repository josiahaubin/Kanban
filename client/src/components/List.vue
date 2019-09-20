<template>
  <drop @drop="changeList" class="col-12-sm col-4-lg mt-2 shadow rounded card mx-auto">
    <div>
      <h2 class="mt-2 cen">
        {{listProp.title}}
        <button class="btn btn-danger float-right mr-2" @click="deleteList()">
          <i class="fas fa-trash"></i>
        </button>
      </h2>
      <Task v-for="task in tasks" :key="task._id" :taskProp="task" />
      <div class="input-group mb-3 mt-2">
        <input
          type="text"
          class="form-control"
          :id="'taskTitle'+listProp._id"
          placeholder="New Task Description*"
          v-model="query"
          required
        />
        <div class="input-group-append">
          <button class="btn btn-success" @click="addTask()">
            Add Task
            <i class="fas fa-check"></i>
          </button>
        </div>
      </div>
    </div>
  </drop>
</template>


<script>
import NotificationService from "../NotificationService";
import { Drag, Drop } from "vue-drag-drop";
import Task from "../components/Task";
export default {
  name: "list",
  props: ["listProp"],
  data() {
    return {
      query: "",
      taskTitleValid: true
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
    async deleteList() {
      if (await NotificationService.confirmDelete()) {
        this.$store.dispatch("deleteList", {
          listId: this.listProp._id,
          boardId: this.listProp.boardId
        });
      }
    },
    addTask() {
      if (
        !document
          .getElementById("taskTitle" + this.listProp._id)
          .checkValidity()
      ) {
        this.taskTitleValid = false;
        NotificationService.toastError("");
        return;
      }
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
.card {
  background-color: rgba(255, 255, 255, 0.8);
}
.cen {
  margin-left: 45px;
}
input {
  box-shadow: inset 0px 0px 1px 1px white;
}
</style>

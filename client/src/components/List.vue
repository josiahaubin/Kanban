<template>
  <div class="list col-4 mt-2 border rounded">
    <h2>
      {{listProp.title}}
      <button class="btn btn-danger float-right mt-1" @click="deleteList()">
        <i class="fas fa-trash"></i>
      </button>
    </h2>
    <Task v-for="task in tasks" :key="task._id" :taskProp="task" />
    <button class="btn btn-success mb-1">
      Add Task
      <i class="fas fa-check"></i>
    </button>
  </div>
</template>


<script>
import Task from "../components/Task";
export default {
  name: "list",
  props: ["listProp"],
  data() {
    return {};
  },
  mounted() {
    this.getTasks();
  },
  computed: {
    tasks() {
      return this.$store.state.tasks[this.listProp._id];
    }
  },
  methods: {
    getTasks() {
      this.$store.dispatch("getTasks", this.listProp._id);
    },
    deleteList() {
      this.$store.dispatch("deleteList", this.listProp._id);
    }
  },
  components: { Task }
};
</script>


<style scoped>
</style>

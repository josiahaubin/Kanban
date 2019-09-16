<template>
  <div class="list col-4 mt-2 border rounded">
    <h2>{{listProp.title}}</h2>
    <Task v-for="task in tasks" :key="task._id" :taskProp="task" />
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
    }
  },
  components: { Task }
};
</script>


<style scoped>
</style>

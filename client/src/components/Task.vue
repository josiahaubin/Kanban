<template>
  <div class="task border rounded">
    <p>{{taskProp.description}}</p>
    <ul>
      <comment v-for="comment in comments" :commentProp="comment" :key="comment._id" />
    </ul>
  </div>
</template>


<script>
import comment from "../components/Comment";
export default {
  name: "task",
  props: ["taskProp"],
  data() {
    return {};
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
    }
  },
  components: { comment }
};
</script>


<style scoped>
</style>
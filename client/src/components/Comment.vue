<template>
  <div class="comment">
    <span>
      <li>
        {{commentProp.content}}
        <span class="red" @click="deleteComment">X</span>
      </li>
    </span>
  </div>
</template>


<script>
export default {
  name: "comment",
  props: ["commentProp"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    deleteComment() {
      this.$store.dispatch("deleteComment", {
        taskId: this.commentProp.taskId,
        commentId: this.commentProp._id
      });
    }
  },
  components: {}
};
</script>


<style scoped>
li {
  text-align: left;
}
.red {
  color: red;
  cursor: pointer;
}
</style>
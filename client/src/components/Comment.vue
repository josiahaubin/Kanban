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
import NotificationService from "../NotificationService";
export default {
  name: "comment",
  props: ["commentProp"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    async deleteComment() {
      if (await NotificationService.confirmDelete()) {
        this.$store.dispatch("deleteComment", {
          taskId: this.commentProp.taskId,
          commentId: this.commentProp._id
        });
      }
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
.comment {
  font-family: "Chilanka", cursive;
}
</style>
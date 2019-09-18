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
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this comment!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          this.$store.dispatch("deleteComment", {
            taskId: this.commentProp.taskId,
            commentId: this.commentProp._id
          });
          swal("Poof! Your comment has been deleted!", {
            icon: "success"
          });
        } else {
          swal("Your comment has not been deleted!");
        }
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
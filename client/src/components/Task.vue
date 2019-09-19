<template>
  <drag
    :transferData="{taskId: this.taskProp._id,
        listId: this.selected,
        boardId: this.taskProp.boardId,
        oldListId: this.taskProp.listId }"
  >
    <div class="task border rounded mt-2 bg-white">
      <div class="cp" @click="showInput = !showInput">
        <p class="description">{{taskProp.description}}</p>
      </div>
      <ul>
        <comment v-for="comment in comments" :commentProp="comment" :key="comment._id" />
      </ul>

      <div v-if="showInput" class="input-group mb-3">
        <input type="text" class="form-control ml-3" placeholder="New Comment" v-model="query" />
        <div class="input-group-append mr-3">
          <button class="btn btn-success mb-1" @click="addComment()">
            Add Comment
            <i class="fas fa-check"></i>
          </button>
        </div>
      </div>
      <hr v-if="showInput" />
      <button v-if="showInput" class="btn btn-danger mb-3" @click="deleteTask()">
        Delete Task
        <i class="fas fa-trash"></i>
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
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this task!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          this.$store.dispatch("deleteTask", {
            taskId: this.taskProp._id,
            listId: this.taskProp.listId
          });
          swal("Poof! Your Task has been deleted!", {
            icon: "success"
          });
        } else {
          swal("Your task has not been deleted!");
        }
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
.description:hover {
  color: green;
  text-shadow: 1px 1px green;
  letter-spacing: 3px;
}
</style>
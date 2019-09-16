<template>
  <div class="board container-fluid">
    <h1>{{board.title}}</h1>
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="New List Title" v-model="query" />
      <div class="input-group-append">
        <button class="btn btn-primary" @click="addList()">Add List</button>
      </div>
    </div>

    <div class="row">
      <List v-for="list in lists" :key="list._id" :listProp="list" />
    </div>
  </div>
</template>

<script>
import List from "../components/List";
export default {
  name: "board",
  data() {
    return {
      query: ""
    };
  },
  mounted() {
    this.getLists();
  },
  computed: {
    board() {
      return (
        //FIXME This does not work on page reload because the boards array is empty in the store
        this.$store.state.boards.find(b => b._id == this.boardId) || {
          title: "Loading..."
        }
      );
    },
    lists() {
      return this.$store.state.lists;
    }
  },
  methods: {
    getLists() {
      this.$store.dispatch("getLists", this.boardId);
    },
    addList() {
      this.$store.dispatch("addList", {
        title: this.query,
        boardId: this.boardId
      });
    }
  },
  props: ["boardId"],
  components: {
    List
  }
};
</script>

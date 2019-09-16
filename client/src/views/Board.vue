<template>
  <div class="board container-fluid">
    <h1>{{board.title}}</h1>
    <button class="btn-primary">Add List</button>
    <div class="row">
      <List v-for="list in lists" :key="list._id" :listProp="list" />
    </div>
  </div>
</template>

<script>
import List from "../components/List";
export default {
  name: "board",
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
    }
  },
  props: ["boardId"],
  components: {
    List
  }
};
</script>

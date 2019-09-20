<template>
  <div class="board container-fluid" :style="{backgroundImage: `url(${backgroundImg})`}">
    <div class="row">
      <button class="btn title" @click="returnHome()">
        <i class="fas fa-arrow-left fa-2x"></i>
      </button>
      <div class="col-12 justify-content-center">
        <h1 class="title mx-auto mt-2">{{board.title}}</h1>
        <div class="input-group mb-3 mt-2 justify-content-center">
          <input type="text" class="listBar rounded" placeholder="New List Title" v-model="query" />
          <div class="input-group-append">
            <button class="btn btn-primary" @click="addList()">
              Add List
              <i class="fas fa-check"></i>
            </button>
          </div>
        </div>
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
    this.$store.dispatch("getBoards");
    this.$store.dispatch("getBackgroundImg");
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
    },
    backgroundImg() {
      return this.$store.state.img;
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
      this.query = "";
    },
    returnHome() {
      this.$router.push({ name: "boards" });
    }
  },
  props: ["boardId"],
  components: {
    List
  }
};
</script>

<style scoped>
.board {
  min-height: 100vh;
  background-size: cover;
}
.listBar {
  width: 40vw;
}
.title {
  background-color: rgba(255, 255, 255, 0.8);
  width: fit-content;
}
input {
  box-shadow: inset 0px 0px 1px 1px white;
}
</style>

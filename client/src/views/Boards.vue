<template>
  <div class="boards" :style="{backgroundImage: `url(${backgroundPicture})`}">
    <h3>WELCOME TO THE BOARDS!!!</h3>
    <button class="btn btn-danger float-right logoutButton" @click="logout()">
      <i class="fas fa-power-off"></i>
    </button>
    <form @submit.prevent="addBoard">
      <input type="text" placeholder="title" v-model="newBoard.title" required />
      <input type="text" placeholder="description" v-model="newBoard.description" />
      <button class="btn btn-success" type="submit">Create Board</button>
    </form>
    <div v-for="board in boards" :key="board._id">
      <router-link :to="{name: 'board', params: {boardId: board._id}}">{{board.title}}</router-link>
      <i class="fas fa-times ml-2 red" @click="deleteBoard(board._id)"></i>
      <p>{{board.description}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "boards",
  mounted() {
    this.$store.dispatch("getBoards");
    this.$store.dispatch("getBackgroundImg");
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: ""
      }
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    },
    backgroundPicture() {
      return this.$store.state.img;
    }
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    },
    deleteBoard(data) {
      this.$store.dispatch("deleteBoard", data);
    },
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style scoped>
.red {
  color: red;
  cursor: pointer;
}
.logoutButton {
  margin-top: -40px;
  margin-right: 10px;
}
.boards {
  background-size: cover;
  min-height: 100vh;
}
</style>
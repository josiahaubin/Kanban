<template>
  <div class="boards" :style="{backgroundImage: `url(${backgroundPicture})`}">
    <h1 class="title mx-auto">{{user.name}}, Welcome To Your Boards!</h1>
    <button class="btn btn-danger float-right logoutButton" @click="logout()">
      <i class="fas fa-power-off"></i>
    </button>
    <form @submit.prevent="addBoard">
      <input type="text" class="mr-3" placeholder="Board title" v-model="newBoard.title" required />
      <input
        type="text"
        class="mr-3"
        placeholder="Board description"
        v-model="newBoard.description"
      />
      <button class="btn btn-success" type="submit">Create Board</button>
    </form>
    <div class="card mx-auto mt-2" v-for="board in boards" :key="board._id">
      <router-link :to="{name: 'board', params: {boardId: board._id}}">{{board.title}}</router-link>
      <p>Description: {{board.description}}</p>
      <button class="btn btn-danger deleteButton" @click="deleteBoard(board._id)">
        <i class="fas fa-times"></i>
      </button>
    </div>
  </div>
</template>

<script>
import NotificationService from "../NotificationService";

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
    },
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    },
    async deleteBoard(data) {
      if (await NotificationService.confirmDelete()) {
        this.$store.dispatch("deleteBoard", data);
      }
    },

    async logout() {
      if (await NotificationService.confirmLogout()) {
        this.$store.dispatch("logout");
      }
    }
  }
};
</script>

<style scoped>
.deleteButton {
  margin: auto;
}
.logoutButton {
  margin-top: -53px;
  margin-right: 10px;
}
.boards {
  background-size: cover;
  min-height: 100vh;
}
.title {
  background-color: rgba(255, 255, 255, 0.8);
  width: fit-content;
}
.card {
  background-color: rgba(255, 255, 255, 0.8);
  width: 50%;
  padding: 15px;
  font-size: 25px;
}
input {
  box-shadow: inset 0px 0px 1px 1px white;
}
</style>
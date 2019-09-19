<template>
  <div class="boards" :style="{backgroundImage: `url(${backgroundPicture})`}">
    <h1 class="title mx-auto">WELCOME TO THE BOARDS!!!</h1>
    <button class="btn btn-danger float-right logoutButton" @click="logout()">
      <i class="fas fa-power-off"></i>
    </button>
    <form @submit.prevent="addBoard">
      <input type="text" placeholder="title" v-model="newBoard.title" required />
      <input type="text" placeholder="description" v-model="newBoard.description" />
      <button class="btn btn-success" type="submit">Create Board</button>
    </form>
    <div class="card mx-auto mt-2" v-for="board in boards" :key="board._id">
      <i class="fas fa-times float-right red" @click="deleteBoard(board._id)"></i>
      <router-link :to="{name: 'board', params: {boardId: board._id}}">{{board.title}}</router-link>

      <!-- <p>{{board.description}}</p> -->
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
.title {
  background-color: rgba(255, 255, 255, 0.8);
  width: fit-content;
}
.card {
  background-color: rgba(255, 255, 255, 0.8);
  width: 50%;
  padding: 15px;
}
</style>
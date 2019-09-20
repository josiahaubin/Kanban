<template>
  <div class="login" :style="{backgroundImage: `url(${img})`}">
    <div class="bg">
      <h1>Welcome to the Kanban</h1>
      <h6>Login or Register to continue</h6>
      <br />
      <form v-if="loginForm" @submit.prevent="loginUser">
        <input type="email" class="mr-3" v-model="creds.email" placeholder="email" />
        <input type="password" class="mr-3" v-model="creds.password" placeholder="password" />
        <button class="btn btn-success" type="submit">Login</button>
      </form>
      <form v-else @submit.prevent="register">
        <input type="text" class="mr-3" v-model="newUser.name" placeholder="name" />
        <input type="email" class="mr-3" v-model="newUser.email" placeholder="email" />
        <input type="password" class="mr-3" v-model="newUser.password" placeholder="password" />
        <button class="btn btn-warning" type="submit">Create Account</button>
      </form>
      <div class="action" @click="loginForm = !loginForm">
        <p v-if="loginForm">No account? Click here to Register</p>
        <p v-else>Already have an account? Click here to Login</p>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router.js";
export default {
  name: "login",
  mounted() {
    this.$store.dispatch("getBackgroundImg");
  },
  data() {
    return {
      loginForm: true,
      creds: {
        email: "",
        password: ""
      },
      newUser: {
        email: "",
        password: "",
        name: ""
      }
    };
  },
  beforeCreate() {
    if (this.$store.state.user._id) {
      this.$router.push({ name: "boards" });
    }
  },
  methods: {
    register() {
      this.$store.dispatch("register", this.newUser);
    },
    loginUser() {
      this.$store.dispatch("login", this.creds);
    }
  },
  computed: {
    img() {
      return this.$store.state.img;
    }
  }
};
</script>

<style>
.action {
  cursor: pointer;
}
.action:hover {
  color: blue;
  text-decoration: underline;
}
.login {
  min-height: 100vh;
  background-size: cover;
}
.bg {
  background-color: rgba(255, 255, 255, 0.6);
  width: fit-content;
  margin: auto;
  padding: 10px;
}
input {
  box-shadow: inset 0px 0px 1px 1px white;
}
</style>
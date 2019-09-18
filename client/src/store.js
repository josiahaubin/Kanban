import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'
import AuthService from './AuthService'

Vue.use(Vuex)

//Allows axios to work locally or live
let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/'

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
})

let imgApi = Axios.create({
  baseURL: "https://api.unsplash.com/photos/random?client_id=f22f7bc55730453256d06fa7040f428c967949c51709546e252443beaca6a914&query=outdoors"
  // baseURL: "https://api.unsplash.com/photos/random?client_id=f22f7bc55730453256d06fa7040f428c967949c51709546e252443beaca6a914&query=spacex"
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: [],
    tasks: {},
    comments: {},
    img: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    resetState(state, user) {
      state.user = {}
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setLists(state, payload) {
      state.lists = payload
    },
    setTasks(state, payload) {
      Vue.set(state.tasks, payload.listId, payload.data)
    },
    setComments(state, payload) {
      Vue.set(state.comments, payload.taskId, payload.data)
    },
    setBackgroundImg(state, payload) {
      state.img = payload
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    async register({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Register(creds)
        commit('setUser', user)
        router.push({ name: "boards" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    async login({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Login(creds)
        commit('setUser', user)
        router.push({ name: "boards" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    async logout({ commit, dispatch }) {
      try {
        let success = await AuthService.Logout()
        if (!success) { }
        commit('resetState')
        router.push({ name: "login" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    //#endregion


    //#region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    async deleteBoard({ commit, dispatch }, payload) {
      let res = await api.delete('boards/' + payload)
      dispatch('getBoards')
    },
    //#endregion


    //#region -- LISTS --
    async getLists({ commit, dispatch }, payload) {
      try {
        let res = await api.get('boards/' + payload + '/lists')
        commit('setLists', res.data)
      } catch (error) {

      }
    },
    async getTasks({ commit, dispatch }, payload) {
      try {
        let res = await api.get('lists/' + payload + '/tasks')
        commit('setTasks', { listId: payload, data: res.data })
      } catch (error) {

      }
    },
    async addList({ commit, dispatch }, payload) {
      try {
        let res = await api.post('lists', payload)
        dispatch('getLists', payload.boardId)
      } catch (error) {

      }
    },
    async deleteList({ commit, dispatch }, payload) {
      try {
        let res = await api.delete('/lists/' + payload.listId)
        dispatch('getLists', payload.boardId)
      } catch (error) {

      }
    },
    async addTask({ commit, dispatch }, payload) {
      try {
        let res = await api.post('tasks', payload)
        dispatch('getTasks', payload.listId)
      } catch (error) {

      }
    },
    async getComments({ commit, dispatch }, payload) {
      try {
        let res = await api.get('tasks/' + payload + '/comments')
        commit('setComments', { taskId: payload, data: res.data })
      } catch (error) {

      }
    },
    async addComment({ commit, dispatch }, payload) {
      try {
        let res = await api.post('comments', payload)
        dispatch('getComments', payload.taskId)
      } catch (error) {

      }
    },
    async deleteTask({ commit, dispatch }, payload) {
      try {
        let res = await api.delete("tasks/" + payload.taskId)
        dispatch('getTasks', payload.listId)
      } catch (error) {

      }
    },
    async deleteComment({ commit, dispatch }, payload) {
      try {
        let res = await api.delete('comments/' + payload.commentId)
        dispatch('getComments', payload.taskId)
      } catch (error) {

      }
    },
    async changeList({ commit, dispatch }, payload) {
      try {
        let res = await api.put('tasks/' + payload.taskId, payload)
        dispatch('getTasks', payload.listId)
        dispatch('getTasks', payload.oldListId)
      } catch (error) {

      }
    },


    //#endregion

    //#region -- TASKS --

    //#endregion

    //#region -- COMMENTS --

    //#endregion

    //#region -- BACKGROUND IMG --
    async getBackgroundImg({ commit, dispatch }) {
      let res = await imgApi.get('')
      commit("setBackgroundImg", res.data.urls.full)
    }
    //#endregion
  }
})

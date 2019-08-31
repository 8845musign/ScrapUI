<template>
  <main>
    <div v-if="false">
      {{ user.email }}
      <button @click="logout">ログアウト</button>
    </div>
    <div v-else>
      <form @submit.prevent="login">
        <input type="text" placeholder="email" v-model="email">
        <input type="text" placeholder="password" v-model="password">

        <button>ログイン</button>
      </form>
    </div>
  </main>
</template>
<script>
import firebase from '~/plugins/firebase.ts'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters('auth', ['isAuthenticated'])
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      this.setUser(user)
    })
  },
  methods: {
    ...mapActions('auth', ['setUser']),
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(usre => {

        }).catch(err => {
          console.error(err)
        })
    },
    logout() {
      firebase.auth().signOut()
        .then(() => {
          this.setUser(null)
        }).catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style>

</style>
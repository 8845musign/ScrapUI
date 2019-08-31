<template>
  <main>
    <div v-if="false">
      {{ user.email }}
      <button @click="logout">ログアウト</button>
    </div>
    <div v-else>
      <form @submit.prevent="login">
        <input v-model="email" type="text" placeholder="email" />
        <input v-model="password" type="text" placeholder="password" />

        <button>ログイン</button>
      </form>
    </div>
  </main>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import firebase from '~/plugins/firebase.ts'

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
    firebase.auth().onAuthStateChanged((user) => {
      this.setUser(user)
    })
  },
  methods: {
    ...mapActions('auth', ['setUser']),
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((usre) => {})
        .catch((err) => {
          console.error(err)
        })
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.setUser(null)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }
}
</script>

<style></style>

<template>
  <div>
    <header>
      <button v-if="!isAuthenticated" @click="signInGoogle">
        Google SignIn
      </button>
      <button v-if="isAuthenticated" @click="signOutGoogle">
        Google SignOut
      </button>
    </header>
    <main>
      <h1>画像アップロード</h1>

      <form>
        <input
          type="file"
          @change="selectImageChanged($event.target.files[0])"
        />
        <button type="sumit">アップロード</button>
      </form>
    </main>
  </div>
</template>
<script lang="ts">
import { mapActions, mapState, mapGetters } from 'vuex'
import firebase from '~/plugins/firebase.ts'

export default {
  data() {
    return {
      file: File
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters('auth', ['isAuthenticated'])
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user)

      if (user) {
        this.setUser(user)
      } else {
        this.setUser(null)
      }
    })
    // firebase.auth().onAuthStateChanged((user) => {
    //   this.setUser(user)
    // })
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
    signOutGoogle() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.setUser(null)
        })
        .catch((err) => {
          console.error(err)
        })
    },
    signInGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },
    selectImageChanged(file: File) {
      if (file.name && file.name !== '') {
        this.file = file
        console.log(file)
      }
    }
  }
}
</script>

<style></style>

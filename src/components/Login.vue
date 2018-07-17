<template>
  <div id="app">
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Авторизация</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field name="login" label="Логин" v-model="login" type="text"></v-text-field>
                    <v-text-field
                      name="password"
                      label="Пароль"
                      v-model="password"
                      id="password"
                      @keyup.enter="signIn"
                      type="password">
                    </v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="primary"
                      v-on:click="signIn">
                      Войти
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
        <v-snackbar
          v-model="snackbar"
          color="error"
          multi-line="multi-line"
        >
          {{ error }}
          <v-btn
            dark
            flat
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </v-snackbar>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Auth from '@/services/Auth'

export default {
  name: 'Login',
  data () {
    return {
      login: '',
      password: '',
      error: null,
      snackbar: false
    }
  },
  methods: {
    async signIn () {
      try {
        var res = await Auth.login({
          login: this.login,
          password: this.password
        })
        if (res.data.error) {
          this.error = 'Логин или пароль введены неверно!'
          this.snackbar = true
        } else {
          this.$router.push('/')
        }
      } catch (error) {
        this.error = 'Что-то пошло не так :('
        this.snackbar = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

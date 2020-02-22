<template>
  <v-app>
    <v-stepper class="contetn" v-model="e1">
      <v-stepper-header v-show="showHeader">
        <v-stepper-step :complete="e1 > 1" step="1">Шаг 1</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 2" step="2">Шаг 2</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 3" step="3">Шаг 3</v-stepper-step>
      </v-stepper-header>
      <v-stepper-content step="1">
        <v-container
          id="grid"
          fluid
          grid-list-sm
          tag="section">
          <v-layout align-center justify-center fill-height>
            <v-flex>
              <div class="headline qwtitle">Оцените компетентность сотрудников офиса продаж :</div>
              <v-btn large round color="mybtn success" @click="firstQ(1)">Хорошо</v-btn>
              <v-btn large round color="mybtn warning" @click="firstQ(0)">Удовлетворительно</v-btn>
              <v-btn large round color="mybtn error" @click="firstQ(-1)">Плохо</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-container
          id="grid"
          fluid
          grid-list-sm
          tag="section">
          <v-layout align-center justify-center fill-height>
            <v-flex>
              <div class="headline qwtitle">Был ли решён ваш вопрос с первого раза?</div>
              <v-btn large round color="mybtn success" @click="secondQ(1)">Да</v-btn>
              <v-btn large round color="mybtn warning" @click="secondQ(0)">Нет</v-btn>
              <v-btn large round color="mybtn error" @click="secondQ(-1)">Пришлось обращаться снова</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-stepper-content>
      <v-stepper-content step="3">
        <v-container
          id="grid"
          fluid
          grid-list-sm
          tag="section">
          <v-layout align-center justify-center fill-height>
            <v-flex>
              <div class="headline qwtitle">Рекомендовали бы Вы услуги Миранда-медиа своим друзьям, коллегам по работе?</div>
              <v-layout row>
               <v-flex class="pr-3">
                 <v-slider
                   v-model="slider"
                   :max="max"
                   :min="min"
                   persistent-hint
                   thumb-label="always"
                   hint="Оцените от 0 до 10, где 0 – точно не порекомендую, а 10 – точно порекомендую."
                 ></v-slider>
               </v-flex>
             </v-layout>
             <v-btn large round color="mybtn success" @click="thirdQ()">Сохранить</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-stepper-content>
      <v-stepper-content step="4">
        <v-container
          fluid
          grid-list-sm
          tag="section">
          <v-layout align-center justify-center fill-height>
            <v-flex>
              <div class="headline qwtitle text-xs-center">Спасибо за Ваш отзыв!</div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-stepper-content>
    </v-stepper>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ msg }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-textarea
                   v-model="reason"
                   name="input-7-1"
                   label="Напечатайте тут"
                   auto-grow
                   :value="reason"
                 ></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*можно пропустить</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="skipText()">Пропустить</v-btn>
            <v-btn color="blue darken-1" flat @click.native="saveText()">Сохранить</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
    </v-layout>

    <v-footer class="my-foot pa-3">
     <div class="profile">{{ feedback.author }}</div>
     <!-- <div class="profile">Сергей Петров Васиьлев</div> -->
     <v-spacer></v-spacer>
     <a @click="logout">Выйти</a>
     <!-- <div>ООО "Миранда-медиа" &copy; {{ new Date().getFullYear() }}</div> -->
   </v-footer>
  </v-app>
</template>

<script>
import Feedback from '@/services/Feedback'

export default {
  name: 'Main',
  data () {
    return {
      e1: 0,
      slider: 10,
      dialog: null,
      showHeader: true,
      max: 10,
      min: 0,
      msg: '',
      reason: '',
      feedback: {
        author: this.$cookies.get('user_name'),
        department: this.$cookies.get('user_department'),
        q1: '',
        q2: '',
        q3: '',
        text1: '',
        text2: '',
        text3: ''
      },
      error: '',
      snackbar: false
    }
  },
  created: function () {
    const isLogIn = this.$cookies.isKey('user_name')
    const isDepartmentOk = this.$cookies.isKey('user_department')

    if (!isLogIn || !isDepartmentOk) this.$router.push('/login')
  },
  methods: {
    logout: function () {
      this.$cookies.remove('user_name')
      this.$router.push('/login')
    },
    firstQ: function (v) {
      this.feedback.q1 = v
      if (v === -1) {
        this.reason = ''
        this.msg = 'Пожалуйста, расскажите что Вас не устроило?'
        this.dialog = true
      } else this.e1++
    },
    secondQ: function (v) {
      this.feedback.q2 = v
      if (v === -1) {
        this.reason = ''
        this.msg = 'Пожалуйста, расскажите подробнее!'
        this.dialog = true
      } else this.e1++
    },
    thirdQ: function () {
      this.feedback.q3 = this.slider
      var v = this.slider
      if (v !== 10) {
        this.reason = ''
        this.msg = 'Какие основные недочеты? Другие Ваши пожелания по сервису от Миранда-медиа?'
        this.dialog = true
      } else {
        this.e1++
        this.showHeader = false
        this.sendFeedback()
      }
    },
    saveText: function () {
      this.reason = this.reason.trim()

      if (this.reason.length > 0) {
        this.feedback['text' + (this.e1 - 1)] = this.reason
      }
      this.dialog = false
      this.e1++
      if (this.e1 > 3) {
        this.showHeader = false
        this.sendFeedback()
      }
    },
    skipText: function () {
      this.dialog = false
      this.e1++
      if (this.e1 > 3) {
        this.showHeader = false
        this.sendFeedback()
      }
    },
    sendFeedback: function () {
      Feedback
        .create(this.feedback)
        .then(() => { window.location = '/' })
        .catch(error => {
          this.error = 'Что-то пошло не так :('
          this.snackbar = true

          throw error
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.profile
{
  margin-right: 1em;
  font-size: 12pt;
  line-height: 14pt;
}
.contetn
{
  height: 100%;
}
.qwtitle
{
  margin-bottom: 1em;
}
.mybtn
{
  width: 100%;
  height: 65px;
  margin-left: 0;
}
</style>

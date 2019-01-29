<template>
  <div id="app">
    <v-app v-model="loading">
      <v-container>
        <v-layout row wrap>
          <h1>Статистика отзывов</h1>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm6 md5>
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="dateStart"
              persistent
              lazy
              full-width
              width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="dateStart"
                label="Начиная с"
                prepend-icon="event"
                readonly
                clearable
              ></v-text-field>
              <v-date-picker first-day-of-week="1" no-title v-model="dateStart" scrollable locale="ru-RU" color="green lighten-1">
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modal = false">Отмена</v-btn>
                <v-btn flat color="primary" @click="$refs.dialog.save(dateStart)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs12 sm6 md5>
            <v-dialog
              ref="dialog1"
              v-model="modal1"
              :return-value.sync="dateEnd"
              persistent
              lazy
              full-width
              width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="dateEnd"
                label="Заканчивая"
                prepend-icon="event"
                readonly
                clearable
              ></v-text-field>
              <v-date-picker first-day-of-week="1" no-title v-model="dateEnd" scrollable locale="ru-RU" color="green lighten-1">
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modal1 = false">Отмена</v-btn>
                <v-btn flat color="primary" @click="$refs.dialog1.save(dateEnd)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-flex>
          <v-btn color="primary"
            style="margin-top: 13px;"
            target="_blank"
            :href="href"
            >
            Выгрузить</v-btn>
        </v-layout>
        <v-layout v-show="loading" align-center justify-center>
          <div class="load">Загрузка статистики...</div>
          <v-progress-circular
            indeterminate
            color="purple"
          ></v-progress-circular>
        </v-layout>
        <v-layout v-show="!loading" align-center justify-center>
          <v-flex>
            <v-data-table
              :headers="headers"
              :items="filteredItems"
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.author }}</td>
                <td>{{ props.item.department }}</td>
                <td>{{ (props.item.q1 == 1)?'Хорошо':(props.item.q1 == -1)?'Плохо':'Удовлетворительно' }}</td>
                <td>{{ (props.item.q1 == 1)?'Да':(props.item.q1 == -1)?'Пришлось обращаться снова':'Нет'  }}</td>
                <td>{{ props.item.q3 }}</td>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import Feedback from '@/services/Feedback'

export default {
  name: 'Stat',
  data () {
    return {
      headers: [
        {
          text: 'Ф.И.О.',
          align: 'left',
          value: 'author'
        },
        {
          text: 'Отдел',
          align: 'left',
          value: 'department'
        },
        { text: 'Первый вопрос', value: 'q1' },
        { text: 'Второй вопрос', value: 'q2' },
        { text: 'Третий вопрос', value: 'q3' }
      ],
      loading: true,
      feedbacks: [],
      dateEnd: null,
      dateStart: null,
      modal: false,
      modal1: false,
      picker: false,
      href: 'http://10.240.240.40:3030/excel'
    }
  },

  watch: {
    dateStart: function (val) {
      const url = 'http://10.240.240.40:3030/excel'

      if (this.dateEnd) {
        this.href = `${url}?dateStart=${val}&dateEnd=${this.dateEnd}`
      } else {
        this.href = `${url}?dateStart=${val}`
      }
    },

    dateEnd: function (val) {
      const url = 'http://10.240.240.40:3030/excel'

      if (this.dateStart) {
        this.href = `${url}?dateStart=${this.dateStart}&dateEnd=${val}`
      } else {
        this.href = `${url}?dateEnd=${val}`
      }
    }
  },

  created: function () {
    Feedback.getStat().then(res => {
      this.loading = false
      this.feedbacks = res.data.data.feedback
    })
  },

  computed: {
    filteredItems () {
      const dateS = new Date(this.dateStart)
      const dateE = new Date(this.dateEnd || '2025-12-10')

      return this.feedbacks.filter((i) => {
        const d = new Date(i.date)

        return (dateS < d) && (dateE > d)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.load
{
  font-size: 12pt;
  margin-right: 10px;
}
</style>

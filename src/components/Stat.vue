<template>
  <div id="app">
    <v-app v-model="loading">
      <v-layout v-show="loading" align-center justify-center>
        <div class="load">Загрузка статистики...</div>
        <v-progress-circular
           indeterminate
           color="purple"
        ></v-progress-circular>
      </v-layout>
      <a style="font-family: sans-serif; position: absolute; top: 20px; margin-left: 20px; font-size: 18px;" href="http://10.240.240.40:3030/excel" target="__blank">Выгрузить в Excel</a>
      <v-layout v-show="!loading" align-center justify-center>
        <v-data-table
            :headers="headers"
            :items="feedbacks"
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
        </v-layout>
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
          text: 'Кому поставили отзыв',
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
      feedbacks: []
    }
  },
  created: function () {
    Feedback.getStat().then(res => {
      this.loading = false
      console.log(res.data.feedback)
      this.feedbacks = res.data.data.feedback
    })
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

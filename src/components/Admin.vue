<template>
  <v-app>
    <div>
      <v-toolbar flat color="white">
        <v-toolbar-title>Пользователи</v-toolbar-title>
        <v-divider
          class="mx-2"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <v-btn slot="activator" color="primary" @click.native="newUser()" dark class="mb-2">Добавить пользователя</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">Новый пользователь</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md12 v-model="newUs">
                    <v-text-field :rules="[rules.required]" :disabled="!newUs" v-model="editedItem.login" label="Логин"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md12>
                    <v-text-field :rules="[rules.required]" v-model="editedItem.name" label="Ф.И.О."></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md12>
                    <v-text-field :rules="[rules.required]" v-model="editedItem.password" type="password" label="Пароль"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md12>
                    <v-text-field :rules="[rules.required, rules.match]" v-model="editedItem.repeat" type="password" label="Повторите пароль"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="dialog = false">Отменить</v-btn>
              <v-btn color="blue darken-1" flat @click.native="saveOrCreate(editedItem)">Сохранить</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="users"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.login }}</td>
          <td class="justify-center">{{ props.item.name }}</td>
          <td class="justify-center layout px-0">
            <v-icon
              small
              class="mr-2"
              @click="editUser(props.item)"
            >
              edit
            </v-icon>
            <v-icon
              small
              @click="deleteItem(props.item)"
            >
              delete
            </v-icon>
          </td>
        </template>
        <template slot="no-data">
        </template>
      </v-data-table>
    </div>
    <v-footer class="my-foot pa-3">
     <a href="/logout">Выйти</a>
     <v-spacer></v-spacer>
     <div>ООО "Миранда-медиа" &copy; {{ new Date().getFullYear() }}</div>
   </v-footer>
  </v-app>
</template>

<script>
import Users from '@/services/Users'

export default {
  name: 'Main',
  data () {
    return {
      dialog: false,
      headers: [
        {
          text: 'Логин',
          align: 'left',
          value: 'login'
        },
        { text: 'Ф.И.О.', value: 'name' },
        { text: 'Действия', value: 'name', align: 'center', sortable: false }
      ],
      users: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        login: '',
        password: '',
        repeat: ''
      },
      defaultItem: {
        name: '',
        login: '',
        password: '',
        repeat: ''
      },
      newUs: false,
      rules: {
        required: value => !!value || 'Обязательно к заполнению!',
        match: v => this.editedItem.password === this.editedItem.repeat || 'Пароли должны совпдать'
      }
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    async initialize () {
      var response = await Users.getAll()
      this.users = response.data.data
    },
    async saveOrCreate () {
      if (this.newUs) {
        var res = await Users.create(this.editedItem)
        console.log(res)
        this.users.push(this.editedItem)
        this.dialog = false
      }
    },
    newUser: function () {
      this.editedItem = {}
      this.newUs = true
      this.dialog = true
    },
    editUser: function (user) {
      this.newUs = false
      this.editedItem = {
        login: user.login,
        name: user.name
      }
      this.dialog = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.my-foot
{
  position: absolute;
  width: 100%;
  bottom: 0;
}
</style>

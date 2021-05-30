<template>
  <div>
    <v-row>
      <v-col cols="12" sm="3" md="3">
        <router-link to="/">Список користувачів</router-link>
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <router-link to="/create-user">Створити користувача</router-link>
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <router-link to="/results-month">Підсумки місяця</router-link>
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <v-flex xs12 lg6>
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                label="Дата"
                persistent-hint
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              @input="menu1 = false"
              locale="uk"
            ></v-date-picker>
          </v-menu>
        </v-flex>
      </v-col>
    </v-row>
    <list-user-component :user-type="1" :date="date" />
    <hr style="margin: 10px" />
    <list-user-component :user-type="2" :date="date" />
  </div>
</template>

<script>
import ListUserComponent from "./ListUserComponent";

export default {
  name: "ListUsers",

  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    isShowDatePicker: false,
    menu1: false
  }),

  components: {
    ListUserComponent
  },

  methods: {
    async fetchUser() {
      await this.$store.dispatch("user/listUsers");
    }
  },

  async mounted() {
    await this.fetchUser();
  }
};
</script>

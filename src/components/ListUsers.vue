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
    <div class="result">Літрів за вибраний день: {{ litersForDate }} л.</div>
    <div>
      <draggable v-model="users">
        <item-user
          v-for="(item, index) in users"
          :key="item.id"
          :index="index"
          :item="item"
          :date="date"
        ></item-user>
      </draggable>
    </div>
  </div>
</template>

<script>
import ItemUser from "./ItemUser";
import draggable from "vuedraggable";

export default {
  name: "ListUsers",

  components: {
    ItemUser,
    draggable
  },

  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    isShowDatePicker: false,
    menu1: false
  }),

  computed: {
    users: {
      get() {
        return this.$store.state.user.users;
      },
      async set(value) {
        const users = value.map((item, index) => {
          item.order = index + 1;
          return item;
        });
        await this.$store.dispatch("user/sort", {
          users
        });
      }
    },

    litersForDate() {
      return this.$store.getters["user/litersForDate"](this.date);
    }
  },

  methods: {
    async fetchUser() {
      await this.$store.dispatch("user/listUsers");
    },

    sortEnd(e) {
      console.log(e);
    }
  },

  async mounted() {
    await this.fetchUser();
  }
};
</script>

<style scoped>
.result {
  background-color: #0002ff;
  color: white;
  padding: 10px;
  border-radius: 7px;
}
</style>

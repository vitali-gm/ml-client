<template>
  <div>
    <v-row>
      <v-col cols="12" sm="2" md="2">
        <router-link to="/">Список користувачів</router-link>
      </v-col>
      <v-col cols="12" sm="2" md="2">
        <router-link to="/create-user">Створити користувача</router-link>
      </v-col>
      <v-col cols="12" sm="2" md="2">
        <router-link to="/results-month">Підсумки місяця</router-link>
      </v-col>
      <v-col cols="12" sm="2" md="2">
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
                label="Місяць"
                persistent-hint
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              type="month"
              no-title
              @input="menu1 = false"
              locale="uk"
            ></v-date-picker>
          </v-menu>
        </v-flex>
      </v-col>
      <v-col cols="12" sm="1" md="1">
        <v-text-field
          label="Плата"
          name="mastit"
          :value="price.mastit"
          @blur="onChange"
          outlined
          hide-details
          dense
        />
      </v-col>
      <v-col cols="12" sm="1" md="1">
        <v-text-field
          label="За літр 1/2"
          name="firstPeriod"
          :value="price.firstPeriod"
          @blur="onChange"
          outlined
          hide-details
          dense
        />
      </v-col>
      <v-col cols="12" sm="1" md="1">
        <v-text-field
          label="За літр 2/2"
          name="lastPeriod"
          :value="price.lastPeriod"
          @blur="onChange"
          outlined
          hide-details
          dense
        />
      </v-col>
    </v-row>
    <v-row class="result">
      <v-col cols="12" sm="4" md="4">
        <strong>Загальна кількість літрів: {{ allLiters }} л.</strong>
      </v-col>
      <v-col cols="12" sm="4" md="4">
        <strong>Вирахувана кількість літрів: {{ allNewLiters }} л.</strong>
      </v-col>
      <v-col cols="12" sm="4" md="4">
        <strong>Загальна сума: {{ total }} грн.</strong>
      </v-col>
    </v-row>
    <div>
      <th-item-user-res/>
      <item-user
        v-for="item in users"
        :key="item._id"
        :item="item"
        :date="date"
        @update="updateData"
      ></item-user>
    </div>
  </div>
</template>

<script>
import ItemUser from "./ItemUserRes";
import ThItemUserRes from "./ThItemUserRes";

export default {
  name: "ResultsOfMonth",

  components: {
    ThItemUserRes,
    ItemUser
  },

  data: () => ({
    date: new Date().toISOString().substr(0, 7),
    menu1: false
  }),

  computed: {
    users() {
      return this.$store.state.user.users;
    },
    allLiters() {
      return this.$store.getters["user/allLitersForMonth"](this.date);
    },
    allNewLiters() {
      return this.$store.getters["user/allNewLitersForMonth"](this.date);
    },

    price() {
      return this.$store.getters["setting/priceForMonth"](this.date);
    },

    isSetPriceForMonth() {
      return this.$store.getters["setting/isSetPriceForMonth"](this.date);
    },

    litersForPeriod() {
      return this.$store.getters["user/allNewLitersForMonthPeriod"](this.date);
    },

    total() {
      return (
        this.litersForPeriod.firstPeriod * this.price.firstPeriod +
        this.litersForPeriod.lastPeriod * this.price.lastPeriod
      ).toFixed(2);
    }
  },

  methods: {
    async fetchUser() {
      await this.$store.dispatch("user/listUsers");
    },
    async fetchSetting() {
      await this.$store.dispatch("setting/get");
    },
    async updateData() {
      await this.fetchUser();
    },
    async onChange(e) {
      let price = {};

      switch (e.target.name) {
        case "mastit":
          price = {
            firstPeriod: this.price.firstPeriod,
            lastPeriod: this.price.lastPeriod,
            mastit: e.target.value
          };
          break;
        case "firstPeriod":
          price = {
            firstPeriod: e.target.value,
            lastPeriod: this.price.lastPeriod,
            mastit: this.price.mastit
          };
          break;
        case "lastPeriod":
          price = {
            firstPeriod: this.price.firstPeriod,
            lastPeriod: e.target.value,
            mastit: this.price.mastit
          };
          break;
      }

      const dispatchPath = this.isSetPriceForMonth
        ? "setting/update"
        : "setting/create";
      await this.$store.dispatch(dispatchPath, {
        data: {
          price,
          date: this.date
        }
      });
    }
  },

  async mounted() {
    await this.fetchUser();
    await this.fetchSetting();
  }
};
</script>

<style scoped>
.result {
  background-color: #0002ff;
  color: white;
}
</style>

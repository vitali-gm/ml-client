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
    <results-of-month-component :user-type="1" :date="date" :price="price" />
    <results-of-month-component :user-type="2" :date="date" :price="price" />
  </div>
</template>

<script>
import ResultsOfMonthComponent from "./ResultsOfMonthComponent";

export default {
  name: "ResultsOfMonth",

  components: {
    ResultsOfMonthComponent
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
    },

    setting() {
      return this.$store.getters["setting/setting"](this.date);
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
      let price = this.price;

      switch (e.target.name) {
        case "mastit":
          price = {
            firstPeriod: this.price.firstPeriod,
            lastPeriod: this.price.lastPeriod,
            mastit: parseFloat(e.target.value)
          };
          break;
        case "firstPeriod":
          price = {
            firstPeriod: parseFloat(e.target.value),
            lastPeriod: this.price.lastPeriod,
            mastit: this.price.mastit
          };
          break;
        case "lastPeriod":
          price = {
            firstPeriod: this.price.firstPeriod,
            lastPeriod: parseFloat(e.target.value),
            mastit: this.price.mastit
          };
          break;
      }

      let setting = {};
      let dispatchPath = "setting/create";

      if (this.setting !== undefined) {
        setting = this.setting;
        dispatchPath = "setting/update";
      }

      setting.price = price;
      setting.date = this.date;

      await this.$store.dispatch(dispatchPath, {
        setting
      });
    }
  },

  async mounted() {
    await this.fetchUser();
    await this.fetchSetting();
  }
};
</script>

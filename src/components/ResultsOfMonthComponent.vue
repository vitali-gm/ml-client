<template>
  <div>
    <v-row>
      <h3 class="title">{{ title }}</h3>
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
      <th-item-user-res />
      <item-user
        v-for="item in users"
        :key="item.id"
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

  props: {
    userType: {
      type: Number,
      default: 1
    },
    date: {
      type: String,
      default: new Date().toISOString().substr(0, 7)
    },
    price: {
      type: Object,
      require: true
    }
  },

  components: {
    ThItemUserRes,
    ItemUser
  },

  computed: {
    users() {
      if (this.userType === 1) {
        return this.$store.state.user.usersDecorated;
      } else {
        return this.$store.state.user.usersUnDecorated;
      }
    },
    allLiters() {
      return this.$store.getters["user/allLitersForMonth"](
        this.date,
        this.userType
      );
    },
    allNewLiters() {
      return this.$store.getters["user/allNewLitersForMonth"](
        this.date,
        this.userType
      );
    },

    litersForPeriod() {
      return this.$store.getters["user/allNewLitersForMonthPeriod"](
        this.date,
        this.userType
      );
    },

    total() {
      return (
        this.litersForPeriod.firstPeriod * this.price.firstPeriod +
        this.litersForPeriod.lastPeriod * this.price.lastPeriod
      ).toFixed(2);
    },

    setting() {
      return this.$store.getters["setting/setting"](this.date);
    },
    title() {
      return this.userType === 1
        ? "Оформлені користувачі"
        : "Не оформлені користувачі";
    }
  },

  methods: {
    async updateData() {
      await this.$store.dispatch("user/listUsers");
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
  }
};
</script>

<style scoped>
.result {
  background-color: #0002ff;
  color: white;
}
.title {
  margin-left: 20px;
  margin-bottom: 20px;
}
</style>

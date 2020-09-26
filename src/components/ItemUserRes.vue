<template>
  <div class="row-user">
    <v-row>
      <v-col cols="12" sm="3" md="3">
        {{ item.name }}
      </v-col>
      <v-col cols="12" sm="1" md="1">
        <strong>{{ itemTotalLiters }} л.</strong>
      </v-col>
      <v-col cols="12" sm="1" md="1">
        <v-text-field
          label="Жирність"
          :value="itemGreasiness"
          @blur="onChange"
          outlined
          hide-details
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="1" md="1">
        <v-text-field
          label="К-сть корів"
          :value="itemCountCows"
          @blur="onChangeCountCows"
          outlined
          hide-details
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="1" md="1">
        <strong>{{ itemNewLiters }} л.</strong>
      </v-col>
      <v-col cols="12" sm="2" md="2">
        <strong>{{ itemResult }} грн.</strong>
      </v-col>
      <v-col cols="12" sm="2" md="2">
        <strong>{{ itemCommissionCows.toFixed(2) }} грн.</strong>
      </v-col>
      <v-col cols="12" sm="1" md="1">
        <strong>{{ itemTotal.toFixed(2) }} грн.</strong>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "ItemUserRes",

  props: {
    item: {
      type: Object,
      default: () => {}
    },
    date: {
      type: String,
      default: new Date().toISOString().substr(0, 7)
    }
  },

  data: () => ({
    greasiness: 0
  }),

  computed: {
    price() {
      return this.$store.getters["setting/priceForMonth"](this.date);
    },

    itemLiters() {
      if (this.item.records) {
        return this.item.records.reduce(
          (accumulator, currentValue) => {
            const date = new Date(currentValue.date).toISOString().substr(0, 7);
            if (date === this.date) {
              const day = new Date(currentValue.date)
                .toISOString()
                .substr(8, 2);
              if (day <= 15) {
                accumulator.firstPeriod += parseFloat(currentValue.liters);
              } else {
                accumulator.lastPeriod += parseFloat(currentValue.liters);
              }
            }
            return accumulator;
          },
          {
            firstPeriod: 0,
            lastPeriod: 0
          }
        );
      }
      return {
        firstPeriod: 0,
        lastPeriod: 0
      };
    },

    itemTotalLiters() {
      return this.itemLiters.firstPeriod + this.itemLiters.lastPeriod;
    },

    itemGreasiness() {
      if (this.item.greasiness) {
        const index = this.item.greasiness.findIndex(item => {
          return this.date === item.date;
        });
        if (index !== -1) {
          return parseFloat(this.item.greasiness[index].value);
        }
      }
      return 0;
    },

    itemNewLiters() {
      const res = (this.itemTotalLiters * this.itemGreasiness) / 3.4;
      return res.toFixed(0);
    },

    itemObjNewLiters() {
      return {
        firstPeriod: (
          (this.itemLiters.firstPeriod * this.itemGreasiness) /
          3.4
        ).toFixed(0),
        lastPeriod: (
          (this.itemLiters.lastPeriod * this.itemGreasiness) /
          3.4
        ).toFixed(0)
      };
    },

    itemResult() {
      return (
        this.itemObjNewLiters.firstPeriod * this.price.firstPeriod +
        this.itemObjNewLiters.lastPeriod * this.price.lastPeriod
      ).toFixed(2);
    },

    itemCountCows() {
      const date = new Date(this.date);
      const newDate =
        date.getFullYear() + "-" + ("0" + date.getMonth()).slice(-2);

      if (this.item.countCows) {
        const index = this.item.countCows.findIndex(item => {
          return this.date === item.date || newDate === item.date;
        });
        if (index !== -1) {
          return parseInt(this.item.countCows[index].value);
        }
      }

      return 1;
    },

    itemCommissionCows() {
      return this.itemCountCows * this.price.mastit;
    },

    itemTotal() {
      return parseInt(this.itemResult) !== 0
        ? this.itemResult - this.itemCommissionCows
        : 0;
    }
  },

  methods: {
    async onChange(e) {
      const value = e.target.value;
      this.greasiness = value;
      if (value !== 0) {
        let greasiness = this.item.greasiness ? this.item.greasiness : [];

        const indexRecord = greasiness.findIndex(item => {
          return this.date === item.date;
        });
        if (indexRecord !== -1) {
          greasiness[indexRecord].value = value;
        } else {
          greasiness.push({
            value: value,
            date: this.date
          });
        }

        this.item.greasiness = greasiness;

        await this.$store.dispatch("user/update", {
          id: this.item.id,
          user: this.item
        });
      }
      this.$emit("update");
    },

    async onChangeCountCows(e) {
      const value = e.target.value;
      let countCows = this.item.countCows ? this.item.countCows : [];

      if (value !== 0) {
        const indexRecord = countCows.findIndex(
          item => this.date === item.date
        );

        if (indexRecord !== -1) {
          countCows[indexRecord].value = value;
        } else {
          countCows.push({
            value,
            date: this.date
          });
        }

        this.item.countCows = countCows;

        await this.$store.dispatch("user/update", {
          id: this.item.id,
          user: this.item
        });
      }
      this.$emit("update");
    }
  },

  mounted() {
    this.greasiness = this.itemGreasiness;
  }
};
</script>

<style scoped>
.row-user {
  border: 1px solid #ccc;
  margin: 5px;
  padding: 5px;
  border-radius: 10px;
}
</style>

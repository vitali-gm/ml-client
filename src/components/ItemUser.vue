<template>
  <div class="row-user">
    <v-row>
      <v-col cols="12" sm="1" md="1">
        {{ index + 1 }}
      </v-col>
      <v-col cols="12" sm="2" md="2">
        {{ item.name }}
      </v-col>
      <v-col cols="12" sm="2" md="2" offset="1">
        <v-text-field
          label="Літрів"
          :value="itemLiters"
          @blur="onChange"
          outlined
          hide-details
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2" md="2" offset="2">
        <v-btn small color="success" @click="onUpdate" tabindex="-1"
          >Редагувати</v-btn
        >
      </v-col>
      <v-col cols="12" sm="2" md="2">
        <v-btn small color="error" @click="onDelete" tabindex="-1"
          >Видалити</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "ItemUser",

  data: () => ({
    liters: 0
  }),

  props: {
    item: {
      type: Object,
      default: () => {}
    },
    date: {
      type: String,
      default: new Date().toISOString().substr(0, 10)
    },
    index: {
      type: Number,
      default: 0
    }
  },

  computed: {
    itemLiters() {
      if (this.item.records) {
        const index = this.item.records.findIndex(
          item => item.date === this.date
        );
        if (index !== -1) {
          return this.item.records[index].liters;
        }
      }
      return 0;
    }
  },

  methods: {
    async onChange(e) {
      const liters = e.target.value;
      if (liters !== 0) {
        let records = this.item.records ? this.item.records : [];

        const indexRecord = records.findIndex(item => item.date === this.date);
        if (indexRecord !== -1) {
          records[indexRecord].liters = liters;
        } else {
          records.push({
            liters: liters,
            date: this.date
          });
        }
        this.item.records = records;

        await this.$store.dispatch("user/update", {
          id: this.item.id,
          data: this.item
        });
      }
    },

    onUpdate() {
      this.$router.push(`/update-user/${this.item.id}`);
    },

    async onDelete() {
      await this.$store.dispatch("user/delete", {
        id: this.item.id
      });
    }
  },

  mounted() {
    if (this.item.records) {
      const index = this.item.records.findIndex(
        item => item.date === this.date
      );
      if (index !== -1) {
        this.liters = this.item.records[index].liters;
      }
    }
  }
};
</script>

<style scoped>
.row-user {
  border: 1px solid #ccc;
  margin: 5px;
  padding: 5px;
  border-radius: 10px;
  width: 100%;
}
</style>

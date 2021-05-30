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
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="6" offset="3">
        <div class="border-form">
          <v-text-field label="ПІБ" v-model="name"></v-text-field>
          <v-select
            v-model="type"
            :items="types"
            item-text="name"
            item-value="value"
          />
          <v-btn color="primary" @click="onSave()">Редагувати</v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "UpdateUser",

  data: () => ({
    name: "",
    type: 1
  }),

  computed: {
    users() {
      return this.$store.state.user.users;
    },
    types() {
      return [
        { name: "Оформлений", value: 1 },
        { name: "Не оформлений", value: 2 }
      ];
    }
  },

  methods: {
    async onSave() {
      await this.$store.dispatch("user/update", {
        id: this.$route.params.id,
        data: {
          name: this.name,
          type: this.type
        }
      });
      window.location.href = "/";
    }
  },

  mounted() {
    const index = this.users.findIndex(
      item => item.id.toString() === this.$route.params.id
    );

    if (index !== -1) {
      const user = this.users[index];
      this.name = user.name;
      this.type = user.type;
    }
  }
};
</script>

<style scoped></style>

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
    name: ""
  }),

  computed: {
    users() {
      return this.$store.state.user.users;
    }
  },

  methods: {
    async onSave() {
      await this.$store.dispatch("user/update", {
        id: this.$route.params.id,
        data: {
          name: this.name
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
    }
  }
};
</script>

<style scoped></style>

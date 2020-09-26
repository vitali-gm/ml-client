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
          <v-btn color="primary" @click="onSave()">Зберегти</v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "CreateUser",
  data() {
    return {
      name: ""
    };
  },
  methods: {
    async onSave() {
      if (this.name !== "") {
        await this.$store.dispatch("user/create", {
          data: {
            name: this.name
          }
        });
      }
    }
  }
};
</script>

<style>
.border-form {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
}
</style>

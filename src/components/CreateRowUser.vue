<template>
  <div>
    <v-row>
      <v-col cols="12" sm="12" md="12">
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

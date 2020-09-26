<template>
  <div class="row-user">
    <v-row>
      <v-col cols="12" sm="3" md="3">ПІБ</v-col>
      <v-col cols="12" sm="1" md="1">К-сть л.</v-col>
      <v-col cols="12" sm="1" md="1">Жирність</v-col>
      <v-col cols="12" sm="1" md="1">К-сть корів</v-col>
      <v-col cols="12" sm="1" md="1">New к-сть л</v-col>
      <v-col cols="12" sm="2" md="2">Сума</v-col>
      <v-col cols="12" sm="2" md="2">Комісія</v-col>
      <v-col cols="12" sm="1" md="1">Результат</v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "ThItemUserRes"
};
</script>

<style scoped>
.row-user {
  border-bottom: 3px solid #ccc;
  margin: 5px;
  padding: 5px;
}
</style>

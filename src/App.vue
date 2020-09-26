<template>
  <v-app class="border">
<!--    <v-app-bar color="primary"> </v-app-bar>-->
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  })
};
</script>

<style>
.border {
  margin: 20px;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
}
</style>

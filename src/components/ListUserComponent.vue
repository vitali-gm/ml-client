<template>
  <div>
    <v-row>
      <h3 class="title">{{ title }}</h3>
    </v-row>
    <div class="result">Літрів за вибраний день: {{ litersForDate }} л.</div>
    <div>
      <draggable v-model="users">
        <item-user
          v-for="(item, index) in users"
          :key="item.id"
          :index="index"
          :item="item"
          :date="date"
        ></item-user>
      </draggable>
    </div>
  </div>
</template>

<script>
import ItemUser from "./ItemUser";
import draggable from "vuedraggable";

export default {
  name: "ListUserComponent",

  props: {
    userType: {
      type: Number,
      default: 1
    },
    date: {
      type: String,
      default: new Date().toISOString().substr(0, 10)
    }
  },

  components: {
    ItemUser,
    draggable
  },

  computed: {
    users: {
      get() {
        if (this.userType === 1) {
          return this.$store.state.user.usersDecorated;
        } else {
          return this.$store.state.user.usersUnDecorated;
        }
      },
      async set(value) {
        const users = value.map((item, index) => {
          return { id: item.id, order: index + 1 };
        });
        await this.$store.dispatch("user/sort", {
          users
        });
      }
    },

    litersForDate() {
      return this.$store.getters["user/litersForDate"](
        this.date,
        this.userType
      );
    },

    title() {
      return this.userType === 1
        ? "Оформлені користувачі"
        : "Не оформлені користувачі";
    }
  }
};
</script>

<style scoped>
.result {
  background-color: #0002ff;
  color: white;
  padding: 10px;
  border-radius: 7px;
}

.title {
  margin-left: 20px;
  margin-bottom: 20px;
}
</style>

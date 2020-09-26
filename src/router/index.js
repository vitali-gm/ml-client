import Vue from "vue";
import VueRouter from "vue-router";
import ListUsers from "../components/ListUsers.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "ListUsers",
    component: ListUsers
  },
  {
    path: "/create-user",
    name: "CreateUser",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "create-user" */ "../components/CreateUser.vue"
      )
  },
  {
    path: "/update-user/:id",
    name: "UpdateUser",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "create-user" */ "../components/UpdateUser.vue"
      )
  },

  {
    path: "/results-month",
    name: "ResultsOfMonth",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "create-user" */ "../components/ResultsOfMonth.vue"
      )
  }
];

const router = new VueRouter({
  routes
});

export default router;

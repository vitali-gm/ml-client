import axios from "axios";
import { API_URL } from "../../../config/api";

const url = API_URL + "user";

export default {
  async listUsers({ commit }) {
    await axios.get(url).then(response => {
      commit("setUsers", { users: response.data });
    });
  },

  async create({ commit }, { data }) {
    await axios.post(url, data).then(response => {
      commit("addUser", response.data);
      window.location.href = "/";
    });
  },

  async update({ commit }, { id, data }) {
    await axios.put(`${url}/${id}`, data).then(response => {
      if (response.status === 200) {
        commit("updateUser", { id, user: data });
      }
    });
  },

  async delete({ commit }, { id }) {
    await axios.delete(`${url}/${id}`).then(response => {
      if (response.status === 200) {
        commit("deleteUser", { id });
      }
    });
  },

  async sort({ commit }, { users }) {
    await axios.post(`${url}/update-all`, users).then(response => {
      if (response) {
        commit("setUsers", { users: response.data });
      }
    });
  }
};

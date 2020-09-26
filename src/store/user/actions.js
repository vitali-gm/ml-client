import axios from "axios";

const url = "http://localhost:3000/api/user";

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
        if (data.records) {
          commit("updateRecords", { id, data });
        } else if (data.greasiness) {
          commit("updateGreasiness", { id, data });
        } else if (data.countCows) {
          commit("updateCountCows", { id, data });
        }else {
          commit("updateUser", { id, data });
        }
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
    await axios
      .post(`${url}/sort`, {
        users
      })
      .then(response => {
        if (response.status === 200) {
          commit("setUsers", { users });
        }
      });
  }
};

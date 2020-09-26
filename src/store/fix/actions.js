import axios from "axios";

const url = "http://localhost:3000/api/fix";

export default {
  async get({ commit }) {
    await axios.get(url).then(response => {
      commit("setFix", { settings: response.data });
    });
  },

  async create({ commit }, { data }) {
    await axios.post(url, data).then(response => {
      commit("addFix", { data: response.data });
    });
  },

  async update({ commit }, { data }) {
    await axios.put(`${url}/${data.date}`, data).then(response => {
      if (response.status === 200) {
        commit("updateFix", { data });
      }
    });
  }
};

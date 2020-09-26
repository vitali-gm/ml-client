import axios from "axios";

const url = "http://localhost:3000/api/setting";

export default {
  async get({ commit }) {
    await axios.get(url).then(response => {
      commit("setSettings", { settings: response.data });
    });
  },

  async create({ commit }, { data }) {
    await axios.post(url, data).then(response => {
      commit("addSetting", { data: response.data });
    });
  },

  async update({ commit }, { data }) {
    await axios.put(`${url}/${data.date}`, data).then(response => {
      if (response.status === 200) {
        commit("updateSetting", { data });
      }
    });
  }
};

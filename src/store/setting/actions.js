import axios from "axios";
import { API_URL } from "../../../config/api";

const url = API_URL + "setting";

export default {
  async get({ commit }) {
    await axios.get(url).then(response => {
      commit("setSettings", { settings: response.data });
    });
  },

  async create({ commit }, { setting }) {
    await axios.post(url, setting).then(response => {
      commit("addSetting", { data: response.data });
    });
  },

  async update({ commit }, { setting }) {
    await axios.put(`${url}/${setting.id}`, setting).then(response => {
      if (response.status === 200) {
        commit("updateSetting", { setting: response.data });
      }
    });
  }
};

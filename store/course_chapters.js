export const state = () => ({
  data: [],
  detail: {},
  course: {},
});

export const mutations = {
  set: function (state, data) {
    state.data = data;
  },
  setDetail: function (state, data) {
    state.detail = data;
    state.course = data['course'];
  },
  setLocalDetail: function (state, data) {
    state.detail = data;
  },
}

export const actions = {
  set: function ({ commit }, id) {
    this.$axios.$get(`courses/${id}/chapters`).then(response => {
      commit('set', response.data);
    })
  },
  setDetail: function ({ commit }, id) {
    this.$axios.$get(`chapters/${id}`).then(response => {
      commit('setDetail', response.data);
    })
  },
  setLocalDetail: function ({ commit }, data) {
    commit('setDetail', data);
  }
}

export const getters = {
  data: state => state.data,
  detail: state => state.detail,
  course: state => state.course,
}

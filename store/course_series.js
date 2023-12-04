export const state = () => ({
  data: [],
  detail: {},
  exam: {},
  path: ''
});

export const mutations = {
  set: function (state, data) {
    state.data = data[0];
    state.exam = data[1][0];
  },
  setDetail: function (state, data) {
    state.detail = data;
    state.path = [data?.chapter?.course?.name, data?.chapter?.name, data.name]
  }
}

export const actions = {
  set: function ({ commit }, id) {
    this.$axios.$get(`chapters/${+id}/series`).then(response => {
      commit('set', [response.series, response.exams]);
    })
  },
  setDetail: function ({ commit }, id) {
    this.$axios.$get(`series/${id}`).then(response => {
      commit('setDetail', response.data);
    })
  }
}

export const getters = {
  data: state => state.data,
  detail: state => state.detail,
  exam: state => state.exam,
  path: state => state.path,
}

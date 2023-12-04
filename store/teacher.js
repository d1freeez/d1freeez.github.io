export const state = () => ({
  data: [],
  course: [],
});

export const mutations = {
  set: function (state, data) {
    state.data = data;
    state.course = data['courses'];
  }
}

export const actions = {
  set: function ({ commit }, id) {
    this.$axios.$get(`teacher/${id}`,{
      headers: {
        Authorization: process.env.defaultToken
      }
    }).then(response => {
      commit('set', response.data);
    })
  }
}

export const getters = {
  data: state => state.data,
  course: state => state.course
}

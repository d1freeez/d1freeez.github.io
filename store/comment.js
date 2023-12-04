export const state = () => ({
  data: []
});

export const mutations = {
  set: function (state, data){
    state.data = data;
  }
}

export const actions = {
  set: function ({ commit }, data){
    this.$axios.$get('reviews',{
      headers: {
        Authorization: process.env.defaultToken
      }
    }).then(response => {
      commit('set', response.data);
    });
  }
}

export const getters = {
  data: state => state.data
}

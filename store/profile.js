export const state = () => ({
  data: []
});

export const mutations = {
  set: function (state, data){
    state.data = data;
  }
}

export const actions = {
  set: function ({ commit }){
    this.$axios.$get('user').then(response => {
      commit('set', response.user);
    });
  }
}

export const getters = {
  data: state => state.data
}

export const state = () => ({
  data: null
});

export const mutations = {
  set: function (state, data){
    state.data = data;
  }
}

export const actions = {
  set: function ({ commit }, id){
    this.$axios.$get('user/certificates').then(response => {
      commit('set', response.data);
    });
  }
}

export const getters = {
  data: state => state.data
}

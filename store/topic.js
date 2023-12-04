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
    commit('set', data);
  }
}

export const getters = {
  data: state => state.data
}

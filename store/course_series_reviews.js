export const state = () => ({
  data: [],
  isLoading: false
});

export const mutations = {
  start: function (state) {
    state.isLoading = true
    state.data = [];
  },
  set: function (state, data) {
    state.isLoading = false
    state.data = data;
  }
}

export const actions = {
  async set ({ commit }, id) {
    commit('start')

    return new Promise(async resolve => {
      let _page = 1;
      let _all_page = 1;
      let _all = []

      for(let i = 1; i <= _all_page; i++){
        await this.$axios.$get(`series/${id}/reviews?page=${_page++}`).then(response => {
          _all_page = response.data.last_page;
          _all = [..._all, ...response.data.data]
        })
      }

      resolve();
      commit('set', _all);
    })
  },
}

export const getters = {
  data: state => state.data,
  isLoading: state => state.isLoading
}

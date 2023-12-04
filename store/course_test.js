export const state = () => ({
  data: null,
})

export const mutations = {
  set: function (state, data) {
    state.data = data
  },
}

export const actions = {
  set: function ({ commit }, id) {
    this.$axios.$get(`exam/${id}`).then((response) => {
      commit('set', response.data)
    })
  },
  finished({ commit }, data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$post(`exam/${data[0]}/progress`, data[1])
        .then((response) => {
          response.passed ? resolve(response.message) : reject(response.message)
        })
    })
  },
  finishedSeries({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$post(`series/${id}/progress`, {
          finished: 1,
        })
        .then((response) => {
          resolve(response.message)
        })
        .catch((error) => {
          console.log(error)
          reject()
        })
    })
  },
}

export const getters = {
  data: (state) => state.data,
}

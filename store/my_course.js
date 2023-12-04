export const state = () => ({
  my: [],
  paid: [],
  favorites: []
})

export const mutations = {
  setMyCourse: function (state, data) {
    state.my = data
  },
  setFavoriteCourse: function (state, data) {
    state.favorites = data.data
  },
  setPaidCourse: function (state, data) {
    state.paid = data
  },
}

export const actions = {
  setFavoritesCourse: function ({ commit }, status) {
    this.$axios.$get(`user/favourite/courses`,).then(response => {
      console.log(response.data);
      commit('setFavoriteCourse', response.data)
    })
  },
  setMyCourse: function ({ commit }, status) {
    this.$axios.$get(`paid-courses${status === 1 ? '?status=process' : ''}${status === 2 ? '?status=finished' : ''}`,).then(response => {
      commit('setMyCourse', response.data)
    })
  },
  setPaidCourse: function ({ commit }, status) {
    this.$axios.$get(`paid-courses?purchased=yes${status === 1 ? '&status=process' : ''}${status === 2 ? '&status=finished' : ''}`).then(response => {
      commit('setPaidCourse', response.data)
    })
  }
}

export const getters = {
  my: state => state.my,
  paid: state => state.paid,
  favorites: state => state.favorites,
}

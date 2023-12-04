export const state = () => ({
  courses: [],
  authors: []
})

export const mutations = {
  set: function (state, {courses, authors}) {
    state.courses = courses
    state.authors = authors
  },
}

export const actions = {
  setSearch({ commit }, data) {
    this.$axios
      .$get(`search?filter[name]=${data}`, {
        headers: {
          Authorization: process.env.defaultToken,
        },
      })
      .then((response) => {
        commit('set', {
          courses: response.courses.data,
          authors: response.authors.data
        })
      })
  },
}

export const getters = {
  courses: (state) => state.courses,
  authors: (state) => state.authors
}

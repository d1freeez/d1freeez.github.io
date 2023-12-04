import createPersistedState from 'vuex-persistedstate'

export const state = () => ({
  data: [],
  skills: [],
  details: {},
  author: {},
  category: {},
  chapters: {},
  reviews: {},
  course_skills: {},
  chapters_view: [],
  chapters_view_lesson: {},
  chapters_view_author: {},
  question: {},
  lesson_detail: [],
})

export const mutations = {
  setCourseStart: function (state) {
    state.data = []
  },
  setCourse: function (state, data) {
    state.data.push(...data)
  },
  setSkills: function (state, data) {
    state.skills = data
  },

  setChapters: function (state, data) {
    state.chapters_view = data
    state.chapters_view_lesson = data[0]
    state.chapters_view_author = data[0]['course']['user']
  },
  setLessonLocal: function (state, data) {
    state.chapters_view_lesson = data
    state.chapters_view_lesson = data['course']
    state.chapters_view_author = data['course']['user']
  },
  setDetails: function (state, data) {
    state.details = data
    state.author = data['user']
    state.category = data['category']
    state.chapters = data['chapters']
    state.reviews = data['reviews']
    state.course_skills = data['skills']
    state.question = data['faqs']
  },
  setLessonDetail: function (state, data) {
    state.lesson_detail = data
    state.details = data['chapter']['course']
  },
}

export const actions = {

  setCourse: function ({ commit }, { page }) {
    return new Promise((resolve) => {
      this.$axios
        .$get('courses?page=' + page || 1, {
          headers: {
            Authorization: process.env.defaultToken,
          },
        })
        .then((response) => {
          commit('setCourse', response.data.data)
          resolve({ data: response.data.data })
        })
    })
  },

  setDetails: function ({ commit }, data) {
    this.$axios
      .$get(`courses/${data[0]}?user_id=${data[1]?.id || ''}`, {
        headers: {
          Authorization: process.env.defaultToken,
        },
      })
      .then((response) => {
        let _data = response.data
        _data['purchased'] = response.purchased
        commit('setDetails', _data)
      })
  },
  setChapters: function ({ commit }, id) {
    this.$axios.$get(`courses/${id}/chapters`).then((response) => {
      commit('setChapters', response.data)
    })
  },

  setLessonLocal: function ({ commit }, data) {
    commit('setLessonLocal', data)
  },

  setSkills: function ({ commit }) {
    let _count = 0
    let _index = 0
    let _array = [[]]

    this.$axios.$get('category').then((response) => {
      response.data.forEach((element) => {
        if (_count % 5 === 0 && _count !== 0) {
          _array.push([])
          ++_index
        }
        _array[_index].push(element)
        _count++
      })
      commit('setSkills', _array)
    })
  },
}

export const getters = {
  data: (state) => state.data,
  skills: (state) => state.skills,
  details: (state) => state.details,
  author: (state) => state.author,
  category: (state) => state.category,
  chapters: (state) => state.chapters,
  reviews: (state) => state.reviews,
  course_skills: (state) => state.course_skills,
  chapters_view: (state) => state.chapters_view,
  chapters_view_lesson: (state) => state.chapters_view_lesson,
  chapters_view_author: (state) => state.chapters_view_author,
  question: (state) => state.question,
  lesson_detail: (state) => state.lesson_detail,
}

export const plugins = [createPersistedState()]

export const state = () => ({
  token: localStorage.getItem('token') || '',
  defaultToken: '1|OVTW9gi7qxBVn46iOwH7TiMNtPyb1L78ebzoKIWX',
  user: {}
});

export const mutations = {
  SET_TOKEN (state , data){
    this.$axios.setHeader('Authorization', `Bearer ${data}`)
    state.token = data;
  },
  SET_TOKEN_LOCAL (state , data){
    this.$axios.setHeader('Authorization', `Bearer ${data}`)
    state.token = data;
    localStorage.setItem('token', data);
  },
  SET_USER (state, data){
    state.user = JSON.parse(data);
    localStorage.setItem('user', data);
  }
}

export const actions = {
  async setToken({ commit }, data) {
    this.$axios.setHeader('Authorization', `Bearer ${data}`);
    commit('SET_TOKEN', data);
  },
  async setTokenLocal({ commit }, data) {
    this.$axios.setHeader('Authorization', `Bearer ${data}`);
    commit('SET_TOKEN_LOCAL', data);
  },
  async setUser({ commit, state, dispatch }) {
    this.$axios.setHeader('Authorization', `Bearer ${state.token}`);
    this.$axios.$get('user').then(response => {
      commit('SET_USER', JSON.stringify(response.user));
    }).catch(error => {
      this.$notification.error({
        message: 'Время сессии истекло. Авторизуйтесь заново'
      })
      dispatch('logout')
    })
  },
  async logout({ commit }) {
    commit('SET_USER', null);
    commit('SET_TOKEN', null);
    localStorage.clear();
    this.$axios.$post('auth/logout').then(element => {})
    await this.$router.push({ name: 'index' })
  }
}

export const getters = {
  token: state => state.token,
  defaultToken: state => state.defaultToken,
  hasToken: store => !!store.token,
  user: state => state.user
}

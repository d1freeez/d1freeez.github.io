export const state = () => ({
  data: [],
  data_by_id: [],
  data_detail: [],
  data_array: [],
  data_by_category: [],
  navigation: []
});

export const mutations = {
  set: function (state , data){
    state.data = data;
  },
  setById: function (state , data){
    state.data_by_id = !!data && data.length > 0 ? data[0].child_categories : [];
  },
  setArray: function (state , data){
    state.data_array = data;
  },
  setDetail: function (state , data){
    state.data_detail = data;
  },
  setCategoryNavigation: function (state , data){
    state.navigation = data;
  },
  setCourseByCategory: function (state , data){
    state.data_by_category = data;
  }
}

export const actions = {
  set: function ({ commit }){
    this.$axios.$get('categories',{
      headers: {
        Authorization: process.env.defaultToken
      }
    }).then(response => {
      commit('set', response.data);
    })
  },

  setById: function ({ commit }, id){
    this.$axios.$get('navbar/categories',{
      headers: {
        Authorization: process.env.defaultToken
      }
    }).then(response => {
      commit('setById', response.data.filter(e => +e.id === +id) || []);
    })
  },

  setCourseByCategory: function ({ commit }, id){
    this.$axios.$get(`categories/${id}/courses`,{
      headers: {
        Authorization: process.env.defaultToken
      }
    }).then(response => {
      commit('setCourseByCategory', response.data.data);
    })
  },

  setCategoryDetail: function ({ commit }, id){
    this.$axios.$get(`categories/${id}`,{
      headers: {
        Authorization: process.env.defaultToken
      }
    }).then(response => {
      commit('setDetail', response.data);
    })
  },

  setCategoryNavigation: function ({ commit }){
    this.$axios.$get('navbar/categories',{
      headers: {
        Authorization: process.env.defaultToken
      }
    }).then(response => {
      commit('setCategoryNavigation', response.data);
    })
  },

  setArray: function ({ commit }){
    let _count = 0;
    let _index = 0;
    let _array = [[]];

    this.$axios.$get('categories', {
      headers: {
        Authorization: process.env.defaultToken
      }
    }).then(response => {
      response.data.forEach(element => {
        if(_count % 5 === 0 && _count !== 0){
          _array.push([]);
          ++_index;
        }
        _array[_index].push(element);
        _count++;
      });

      commit('setArray', _array);
    })
  }
}

export const getters = {
  data: state => state.data,
  data_by_id: state => state.data_by_id,
  data_detail: state => state.data_detail,
  setArray: state => state.data_array,
  data_by_category: state => state.data_by_category,
  navigation: state => state.navigation,
}

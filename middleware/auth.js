// export default function ({ store, redirect, route }) {
//   const token = store.getters['auth/hasToken'];
//   console.log(route, token, window.location)
//
//   if(token && route.name === 'index'){
//     window.location.href = '/course'
//     // return redirect('/course')
//     return true;
//   }else if(route.name !== 'index'){
//     window.location.href = '/'
//     // return redirect('/')
//     return true;
//   }
// }

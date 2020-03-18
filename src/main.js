import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {request} from "./network/request";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  request,
  render: h => h(App)
}).$mount('#app')


request({
  method:'post',
  url:'/user/list',
  params: {
    pageNo:1,
    pageSize:10
  }
}).then(res => {
  console.info(res.data.data)
})

/*request.all([
  request({
      method:'post',
      url:'/user/list',
      params: {
        pageNo:1,
        pageSize:10
      }
    }),
  request({
          url:'/user/findUserById',
          params: {
            id:'524f7440-7283-4b2d-8af5-4a67570e892e'
          }
        })
    ]).then(request.spread((res1,res2) =>{
  console.log(res1);
  console.log(res2);
}))*/

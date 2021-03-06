import {request} from 'network/request'

export function getHomeMultiData() {
  return request({
    url:"/api/wh/home/multidata"
  });
}

export function getHomeGoods(type,page) {
  return request({
    url:"/api/wh/home/data",
    params:{
      type,
      page
    }
  })
}

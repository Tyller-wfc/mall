export function debounce(fuc,delay=300) {
  let timer = null
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(()=>{
      fuc.apply(this,args)
    },delay)
  }
}

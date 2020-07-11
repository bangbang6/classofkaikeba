//宏任务 先执行一个 然后清空微任务 这时候页面更新 然后在执行下一个宏任务 注意第一次执行js文件也是第一次宏任务 就是同步任务执行完也算是执行完一次宏任务 会清空微任务再去做宏任务
//宏任务：settimeout setInterval  xhr
//微任务：promise ，mutationObserver
//暗号 “show me the money"

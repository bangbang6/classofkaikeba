declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
//对已知的类型进行扩展
import Vue from 'vue'
import { AxiosInstance } from 'axios'
declare module 'vue/types/vue' {
  interface Vue {
    $http: AxiosInstance
  }
}

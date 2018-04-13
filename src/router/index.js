import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/Index/Index';
import Clause from '@/components/Clause/Clause';
import Result from '@/components/Result/Result';
Vue.use(Router)
/**
 * [异步组件加载函数]
 * @param  {[string]} name [组件名称]
 * @return {[promise]}      [组件]
 */
const asyncComponent = (name) => {
    return resolve => require([`@/components/${name}`], resolve)
}
// const Index = asyncComponent('Index/Index'),
//       Clause = asyncComponent('Clause/Clause')
export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
      meta:{
        title:'赠险活动'
      }
    },{
      path: '/index',
      component: Index,
      meta:{
        title:'赠险活动'
      }
    },{
    	path:'/clause',
    	component:Clause,
      meta:{
        title:'安全条款'
      }
    },{
      path:'/result',
      component:Result,
      meta:{
        title:'申请详情'
      }
    }
  ]
})

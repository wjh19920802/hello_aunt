/*
 *  文件说明
 *  日期：2021/3/8.
 *  作者：WangJinHui
 * */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import {
  login
} from '@/api/app'
import WechatAuth from 'vue-wechat-auth'
import config from '@/config'
import { resetReady, share } from '@/utils/wxplugin'
import {
  getUrlParame
} from '@/utils/index'

import {
  applyMessageData,
  vipmessagesysIndexData
} from '../api/info'
async function getGuildData() {
  const params = {
    token: store.getters.userInfo.token
  }
  const that = this
  if (store.getters.userInfo.token) {
    const res = await vipmessagesysIndexData({})
    if (res.result == 0) {
      if (!(!res.data && typeof res.data !== 'undefined' && res.data != 0)) {
        console.log('app/setMessageNum', true)
        store.dispatch('app/setMessageNum', true)
      }
    }
  }
  if (store.getters.userInfo.vipRole == 1 || store.getters.userInfo.vipRole == 2) {
    const ress = await applyMessageData(params)
    if (ress.result == 0) {
      console.log('app/setMessageNum', ress)
      if (parseInt(ress.data.msgNum) > 0) {
        store.dispatch('app/setMessageNum', true)
      }
    }
  }
}

const Layout = () => import('views/Layout/Layout')
const SpringBoard = () => import('views/SpringBoard/SpringBoard')
const Home = () => import('views/Home/Home')
const Guild = () => import('views/Guild/Guild')
const GuildMember = () => import('views/Guild/GuildMember')
const ManageMember = () => import('views/Guild/ManageMember')
const MakeOverGuild = () => import('views/Guild/MakeOverGuild')
const ManageAdmin = () => import('views/Guild/ManageAdmin')
const Message = () => import('views/Message/Message')
const UserCenter = () => import('views/UserCenter/UserCenter')
const SelfGuild = () => import('views/UserCenter/SelfGuild/SelfGuild')
const Article = () => import('views/Article/Article')
const Shuoshuo = () => import('views/Shuoshuo/Shuoshuo')
const Video = () => import('views/Video/Video')
const SelfTask = () => import('views/Task/SelfTask')
const Task = () => import('views/Task/Task')
const Material = () => import('views/Task/Material')

const PublishArticle = () => import('views/Publish/PublishArticle')
const PublishShuoshuo = () => import('views/Publish/PublishShuoshuo')

const GoldCoin = () => import('views/GoldCoin/GoldCoin')
const GoldCoinDetail = () => import('views/GoldCoin/GoldCoinDetail')
const WithdrawProcess = () => import('views/GoldCoin/WithdrawProcess')
const Search = () => import('views/Search/Search')
const Ranking = () => import('views/Ranking/Ranking')
const GuildItem = () => import('views/Guild/GuildItem')
const CreateGuild = () => import('views/Guild/CreateGuild')
const InputGuildName = () => import('views/Guild/InputGuildName')
const InputGuildIntroduction = () =>
  import('views/Guild/InputGuildIntroduction')

const InteractiveNews = () => import('views/Message/interactiveNews/index')
const MessageSearch = () => import('views/Message/messageSearch/index')
const Page404 = () => import('views/ErrorPage/Page404')

const SystemMessage = () => import('views/Message/systemMessage/index')

const GuildMembers = () => import('views/Message/guildMembers/index')

const GuildIntroduction = () =>
  import('views/UserCenter/guildIntroduction/index')

const Aboutus = () => import('views/UserCenter/aboutus/index')
const Power = () => import('views/UserCenter/power/index')
const Feedback = () => import('views/UserCenter/feedback/index')
const CustomerService = () => import('views/UserCenter/customerService/index')
const PersonalHomepage = () =>
  import('views/UserCenter/personalHomepage/index')
const EditingMaterials = () =>
  import('views/UserCenter/editingMaterials/index')
const UserName = () => import('views/UserCenter/username/index')

const Invitation = () => import('views/UserCenter/invitation/index')
const routes = [
  {
    path: '',
    component: Layout,
    redirect: '/index',
    meta: {
      title: '首页'
    }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    meta: {
      title: '首页'
    },
    children: [{
      path: '/index',
      name: 'Home',
      component: Home,
      meta: {
        title: '首页',
        isShowTab: true,
        active: 0,
        auth: true
      }
    },
    {
      path: '/guild',
      name: 'Guild',
      component: Guild,
      meta: {
        title: '我的公会',
        isShowTab: true,
        active: 1,
        auth: true
      }
    },
    {
      path: '/message',
      name: 'Message',
      component: Message,
      meta: {
        title: '消息',
        isShowTab: true,
        active: 2,
        auth: true
      }
    },
    {
      path: '/user-center',
      name: 'UserCenter',
      component: UserCenter,
      meta: {
        title: '我的',
        isShowTab: true,
        active: 3,
        auth: true
      }
    },
    {
      path: '/guild-item',
      name: 'GuildItem',
      component: GuildItem,
      meta: {
        title: '公会',
        isShowTab: false,
        auth: true
      }
    },
    {
      path: '/self-task',
      name: 'SelfTask',
      component: SelfTask,
      meta: {
        title: '我的任务',
        isShowTab: false,
        auth: true
      }
    },
    {
      path: '/task/:id',
      name: 'Task',
      component: Task,
      meta: {
        title: '任务详情',
        isShowTab: false,
        auth: true
      }
    },
    {
      path: '/task/:id/material',
      name: 'Material',
      component: Material,
      meta: {
        title: '提交详情',
        isShowTab: false,
        auth: true
      }
    },
    {
      path: '/guild-member',
      name: 'GuildMember',
      component: GuildMember,
      meta: {
        title: '公会成员',
        isShowTab: false,
        auth: true
      }
    },
    {
      path: '/manage-member',
      name: 'ManageMember',
      component: ManageMember,
      meta: {
        title: '成员管理',
        isShowTab: false,
        notAllow: [3, 4],
        auth: true
      }
    },
    {
      path: '/make-over-guild',
      name: 'MakeOverGuild',
      component: MakeOverGuild,
      meta: {
        title: '公会管理权转让',
        isShowTab: false,
        notAllow: [2, 3, 4],
        auth: true
      }
    },
    {
      path: '/manage-admin',
      name: 'ManageAdmin',
      component: ManageAdmin,
      meta: {
        title: '公会管理员',
        isShowTab: false,
        auth: true
      }
    },
    {
      path: '/self-guild',
      name: 'SelfGuild',
      component: SelfGuild,
      meta: {
        title: '我的公会',
        isShowTab: false,
        auth: true
      }
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: Article,
      meta: {
        title: '文章评论',
        isShowTab: false,
        auth: true
      }
    },
    {
      path: '/shuoshuo/:id',
      name: 'Shuoshuo',
      component: Shuoshuo,
      meta: {
        title: '说说',
        isShowTab: false,
        auth: true
      }
    },
    {
      path: '/shuoshuo',
      name: 'Shuoshuo',
      component: Shuoshuo,
      meta: {
        title: '说说评论',
        isShowTab: false,
        auth: true
      }
    },
    {
      path: '/video/:id',
      name: 'Video',
      component: Video,
      meta: {
        title: '视频',
        isShowTab: false,
        auth: true
      }
    },
    {
      path: '/publish-article',
      name: 'PublishArticle',
      component: PublishArticle,
      meta: {
        title: '发布文章',
        isShowTab: false,
        auth: true
      }
    },
    {
      path: '/publish-shuoshuo',
      name: 'PublishShuoshuo',
      component: PublishShuoshuo,
      meta: {
        title: '发布说说',
        isShowTab: false,
        auth: true
      }
    },
    {
      path: '/gold-coin',
      name: 'GoldCoin',
      component: GoldCoin,
      meta: {
        title: '我的金币',
        isShowTab: false,
        auth: true
      }
    },
    {
      path: '/gold-coin-detail/:type',
      name: 'GoldCoinDetail',
      component: GoldCoinDetail,
      meta: {
        title: '金币明细',
        isShowTab: false,
        auth: true
      }
    },
    {
      path: '/withdraw-process',
      name: 'WithdrawProcess',
      component: WithdrawProcess,
      meta: {
        title: '余额提现',
        isShowTab: false,
        auth: true
      }
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta: {
        title: '搜索',
        isShowTab: false,
        auth: true
      }
    },
    {
      path: '/ranking',
      name: 'Ranking',
      component: Ranking,
      meta: {
        title: '排行榜',
        isShowTab: false,
        auth: true
      }
    },
    {
      path: '/create-guild',
      name: 'CreateGuild',
      component: CreateGuild,
      meta: {
        title: '创建公会',
        isShowTab: false,
        auth: true
      }
    },
    {
      path: '/guild-name',
      name: 'InputGuildName',
      component: InputGuildName,
      meta: {
        title: '公会名称',
        isShowTab: false,
        auth: true
      }
    },
    {
      path: '/input-guild-introduction',
      name: 'InputGuildIntroduction',
      component: InputGuildIntroduction,
      meta: {
        title: '公会介绍',
        isShowTab: false,
        auth: true
      }
    },
    {
      path: '/spring-board',
      name: 'SpringBoard',
      component: SpringBoard,
      meta: {
        title: '加载中',
        isShowTab: false,
        auth: true
      }
    },
    {
      path: '/interactiveNews',
      name: 'InteractiveNews',
      component: InteractiveNews,
      meta: {
        title: '互动消息',
        isShowTab: false,
        auth: true
      }
    },
    {
      path: '/messageSearch',
      name: 'MessageSearch',
      component: MessageSearch,
      meta: {
        title: '消息搜索',
        isShowTab: false,
        auth: true
      }
    },
    {
      path: '/systemMessage',
      name: 'SystemMessage',
      component: SystemMessage,
      meta: {
        title: '系统消息',
        isShowTab: false,
        auth: true
      }
    },
    {
      path: '/guildMembers',
      name: 'GuildMembers',
      component: GuildMembers,
      meta: {
        title: '公会审核',
        isShowTab: false,
        auth: true
      }
    },
    {
      path: '/aboutus',
      name: 'Aboutus',
      component: Aboutus,
      meta: {
        title: '关于我们',
        isShowTab: false,
        auth: true
      }
    },
    {
      path: '/power',
      name: 'Power',
      component: Power,
      meta: {
        title: '公会权益',
        isShowTab: false,
        auth: true
      }
    },
    {
      path: '/feedback',
      name: 'Feedback',
      component: Feedback,
      meta: {
        title: '意见反馈',
        isShowTab: false,
        auth: true
      }
    },

    {
      path: '/customerService',
      name: 'CustomerService',
      component: CustomerService,
      meta: {
        title: '联系客服',
        isShowTab: false,
        auth: true
      }
    },

    {
      path: '/personalHomepage',
      name: 'PersonalHomepage',
      component: PersonalHomepage,
      meta: {
        title: '个人主页',
        isShowTab: false,
        auth: true
      }
    },
    {
      path: '/editingMaterials',
      name: 'EditingMaterials',
      component: EditingMaterials,
      meta: {
        title: '编辑个人资料',
        isShowTab: false,
        auth: true
      }
    },
    {
      path: '/username',
      name: 'UserName',
      component: UserName,
      meta: {
        title: '用户名',
        isShowTab: false,
        auth: true
      }
    },
    {
      path: '/guildIntroduction',
      name: 'GuildIntroduction',
      component: GuildIntroduction,
      meta: {
        title: '个人介绍',
        isShowTab: false,
        auth: true
      }
    },
    {
      path: '/invitation',
      name: 'Invitation',
      component: Invitation,
      meta: {
        title: '邀请',
        isShowTab: false,
        auth: true
      }
    }
    ]
  },
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/404',
    name: 'Page404',
    component: Page404,
    meta: {
      title: '404',
      isShowTab: false
    }
  }
]

// 解决连续点击同一个路由报错问题
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location, onResolve, onReject) {
//   if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch(err => err)
// }

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history', // 如果你是 history模式 需要配置vue.config.js publicPath
  base: process.env.BASE_URL,
  // scrollBehavior: () => ({ y: 1000 }),
  routes
})

// 微信授权插件初始化
Vue.use(WechatAuth, {
  router, // 路由实例对象
  appid: config.APPID, // 您的微信appid
  responseType: 'code', // 返回类型，请填写code
  scope: 'snsapi_userinfo', // 应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且，即使在未关注的情况下，只要用户授权，也能获取其信息）
  getCodeCallback(code, next) {
    // 用户同意授权后回调方法
    // code：用户同意授权后，获得code值
    // code说明： code作为换取access_token的票据，每次用户授权带上的code将不一样，code只能使用一次，5分钟未被使用自动过期。
    // next： 无论access_token是否获取成功,一定要调用该方法
    // next说明：next方法接收两个参数
    // 参数1为通过code值请求后端获取到的access_token值，如果获取失败请填入空字符串''
    // 参数2(非必填，默认获取access_token切换到当前路由对象)，指定切换对象 next('/') 或者 next({ path: '/' })
    login({
      code
    })
      .then(response => {
        const data = response.data
        const token = data.token
        store.dispatch('app/setUserInfo', data)
        store.dispatch('app/setToken', token)
        if (token) {
          next(token) // 获取access_toeken成功
        } else {
          next() // 获取access_token失败
        }
      })
      .catch(() => {
        next() // ajax出现错误
      })
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  // 重置签名实例
  // resetReady()
  // 路由变化时，判断是否切换菜单页，菜单页变化则修改全局active
  if ([0, 1, 2, 3].includes(to.meta.active)) {
    store.dispatch('app/setActive', to.meta.active)
  }
  if (window.sessionStorage.getItem('isFirst') != 1) {
    window.sessionStorage.setItem('isFirst', 1)
    store.dispatch('app/setUserInfo')
  }
  store.dispatch('app/setMessageNum', false)
  getGuildData()
  next()
})
router.afterEach((to, from, next) => {
  // share()
})

export default router

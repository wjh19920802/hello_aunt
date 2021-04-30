// 按需全局引入 vant组件
import Vue from 'vue'
import {
  Button,
  List,
  Cell,
  Tabbar,
  TabbarItem,
  Icon,
  Tab,
  Tabs,
  PullRefresh,
  Image as VanImage,
  Skeleton,
  Form,
  Field,
  Picker,
  Popup,
  ImagePreview,
  Uploader,
  Cascader,
  DatetimePicker
} from 'vant'
Vue.use(Button)
Vue.use(Cell)
Vue.use(List)
Vue.use(Icon)
Vue.use(VanImage)
Vue.use(PullRefresh)
Vue.use(Skeleton)
Vue.use(Form)
Vue.use(Field)
Vue.use(Picker)
Vue.use(Popup)
Vue.use(ImagePreview)
Vue.use(Uploader)
Vue.use(Cascader)
Vue.use(DatetimePicker)
Vue.use(Tabbar).use(TabbarItem)
Vue.use(Tab).use(Tabs)

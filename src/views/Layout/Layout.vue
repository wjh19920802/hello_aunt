<template>
  <div id="layout-wrap">
    <div class="layout-content ig-content">
    <!--   缓存路由 方法1    -->
      <keep-alive :include="keepAlive">
        <router-view></router-view>
      </keep-alive>
      <!--   缓存路由 方法2    -->
      <!-- <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>-->

      <!--  这样写不生效 ！！！！
          若A路由需要缓存 B路由不需要缓存， 此时不生效。 因为 A=>B  v-if为false时，会销毁A路由对应的页面，再从B=>A 时， A会重新创建， 所以无法缓存
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view  v-if="!$route.meta.keepAlive"></router-view>
      -->
    </div>
    <div class="layout-footer" v-show="$route.meta.isShowTab">
      <TabBar @change="handleChange" />
    </div>
    <Publish />
  </div>
</template>

<script>
import TabBar from '@/components/TabBar/index'
import Publish from 'components/Publish/PublishModal'
export default {
  name: 'Layout',
  components: {
    TabBar,
    Publish
  },
  data() {
    return {}
  },
  computed: {
    keepAlive() {
      return this.$store.state.app.keepAlive
    }
  },
  mounted() {
  },
  methods: {
    handleChange(v) {}
  }
}
</script>

<style lang="scss" scoped>
#layout-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .layout-content {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>

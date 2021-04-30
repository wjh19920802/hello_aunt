<template>
  <div id="gold_coin">
    <GoldCountCard />
    <Withdraw />
  </div>
</template>

<script>
import GoldCountCard from '@/components/GoldCoin/GoldCountCard'
import Withdraw from '@/components/GoldCoin/Withdraw'
export default {
  name: 'GoldCoin',
  components: {
    GoldCountCard,
    Withdraw
  },
  data() {
    return {}
  },
  watch: {
    test() {}
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
#gold_coin {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>

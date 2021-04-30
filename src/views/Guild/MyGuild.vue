<template>
  <div id="my_guild">

  </div>
</template>

<script>
import GuildInfo from '@/components/Guild/GuildInfo'
export default {
  name: 'MyGuild',
  components: {
    GuildInfo
  },
  data() {
    return {
      scene: 3
    }
  },
  computed: {
    guildInfo() {
      return this.$store.state.guild.guildInfo
    }
  },
  watch: {
    test() {
    }
  },
  mounted() {
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>

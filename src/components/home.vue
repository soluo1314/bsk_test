<template>
  <div class="app">
    <layFooter v-if="!($route.path=='/show')"></layFooter>
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
import layFooter from '@/components/layout/lay_footer'
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  mounted(){
    this.$store.commit("vueInit");
  },
  components: {
    layFooter
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

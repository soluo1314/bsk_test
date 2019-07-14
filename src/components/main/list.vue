<template>
  <div>
    <div class="list_head">
      <router-link to="/list/ziyin" :class="setClass()">自营</router-link>
      <router-link to="/list/yanxuan" :class="setClass()">贝式严选</router-link>
    </div>
     <router-view/>
   <infoFoot></infoFoot>
  </div>
</template>

<script>
export default {
  name: 'List',
  data () {
    return {}
  },
  methods: {
    setClass () {
      return 'active'
    }
  }
}
</script>

<style scoped lang="scss">
  div {
    width: 100%;
    .list_head {
        display: flex;
      a {
        display: block;
        width: 50%;
        text-align: center;
        border-bottom: r(1) solid #d9d9d9;
        color:  #333;
        font-size: 4.266vw;
        height: 13vw;
        line-height: 12vw;
      }
    }
  }
  // .active {
  //   color: #1db0b8 !important;
  // }
</style>

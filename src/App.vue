<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title" img-set='/static/favicon-logo.ico'/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

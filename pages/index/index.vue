<template>
  <view class="container">

  </view>
</template>

<script>
export default {
  data() {
    return {
      href: 'https://uniapp.dcloud.io/component/README?id=uniui',
      normal_poke: uni.getStorageSync('normal_poke')
    }
  },
  methods: {},
  mounted() {
    let a = uni.getStorageSync('normal_poke');
    console.log(a)
  }
}
</script>

<style>
</style>

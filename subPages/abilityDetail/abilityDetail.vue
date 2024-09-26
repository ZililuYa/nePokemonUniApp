<template>
  <view class="ne-abilityDetail">


    <view class="title">
      {{ data.cnName }}
    </view>
    <view class="content">
      {{ data.content }}
    </view>
    <view class="title">
      描述
    </view>
    <view class="content">
      {{ data.markdownContent }}
    </view>

  </view>
</template>

<script>
import {getAbility} from "../../server";

export default {
  data() {
    return {
      data: {}
    }
  },
  methods: {},
  mounted() {
  },
  onLoad(option) {
    console.log(option)
    getAbility(option.id).then(res => {
      console.log(res)
      this.data = res.data;
    })
  },
  onShow() {
  },
}
</script>

<style lang="scss">
.ne-abilityDetail {
  background-color: #f5f5f5;
  min-height: 100vh;
  width: 100%;
  padding: 24rpx;


  .title {
    margin-top: 24px;
    color: #000;
    font-weight: bold;
    font-size: 30rpx;
  }

  .content {
    margin-top: 24rpx;
    padding: 24rpx;
    background-color: #fff;
    border-radius: 20rpx;
    color: #333;
    line-height: 30rpx;
    font-size: 26rpx;

  }

}
</style>

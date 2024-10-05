<template>
  <view class="ne-item">
    <view class="img">
      <image :src="data.image"></image>
    </view>

    <view class="title">
      {{ data.name }}
    </view>

    <view class="content">
      <view class="ne-li">
        <view class="ne-right">
          {{ data.type }}
        </view>
        <text class="ne-left">分类:</text>
      </view>
    </view>

    <view class="title" v-if="effect">
      效果
    </view>
    <view class="content" v-if="effect">
      {{ data.effect }}
    </view>

    <view class="title">
      描述
    </view>
    <view class="content">
      {{ data.content }}
    </view>


  </view>
</template>

<script>
import {getItem} from "../../server";
import UniSection from "../../uni_modules/uni-section/components/uni-section/uni-section.vue";

export default {
  components: {UniSection},
  data() {
    return {
      data: {}
    }
  },
  onLoad(option) {

    getItem(option.id).then(res => {
      console.log(res)
      this.data = res.data;
    })

  },
  methods: {}
}
</script>

<style lang="scss">
.ne-item {
  padding: 24rpx;
  min-height: 100vh;
  background-color: #f5f5f5;

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

    .fr {
      font-size: 24rpx;
      color: #999;
    }
  }

  .img {
    text-align: center;
    display: flex;
    justify-content: center;

    image {
      width: 150rpx;
      height: 150rpx;
    }
  }
}
</style>

<template>
  <view class="ne-me">
    <view class="avatar-main">
      <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
        <image class="avatar" :src="avatarUrl" v-if="avatarUrl"></image>
        <text class="text" v-if="!avatarUrl">获取头像</text>
      </button>
    </view>

    <uni-list :border="false">
      <uni-list-item :border="false" v-for="item in data" :thumb="item.img" :title="item.title" thumb-size="lg"
                     :class="item.to?'ok':'no'"
                     @tap="to(item)">

      </uni-list-item>
    </uni-list>

    <view class="appVersion">
      当前版本：v{{ appVersion }}
    </view>

  </view>
</template>

<script>
export default {
  data() {
    return {
      appVersion: uni.getSystemInfoSync().appVersion,
      data: [{
        title: '清除缓存',
        img: '/static/icon/Ball.png',
        text: '清除缓存数据成功~🥳'
      }, {
        title: '设置',
        img: '/static/icon/Ball.png'
      }, {
        title: '关于神奇宝贝图鉴',
        img: '/static/icon/MasterBall.png'
      }],
      avatarUrl: uni.getStorageSync("avatarUrl")
    }
  },
  methods: {
    to(item) {
      if (!item.to)
        return uni.showToast({
          title: item.text || '功能在来的路上~☺️',
          icon: 'none'
        })
      uni.navigateTo({
        url: item.to
      })
    },
    onChooseAvatar(avatar) {
      uni.setStorageSync("avatarUrl", avatar.detail.avatarUrl)
      this.avatarUrl = avatar.detail.avatarUrl
    }
  },
  onLoad() {
  },
  mounted() {
  },
}
</script>

<style lang="scss">
.ne-me {
  min-height: 100vh;
  margin-bottom: 24rpx;
  padding: 0 24rpx 24rpx;
  background-color: #f5f5f5;
  overflow: hidden;

  .appVersion {
    font-size: 24rpx;
    color: #909399;
    text-align: center;
    margin-top: 24rpx;

    position: fixed;
    width: 100%;
    bottom: 30rpx;
    left: 0;
  }

  //.no {
  //  filter: grayscale(100%);
  //}

  .uni-list {
    border-radius: 20rpx;
    margin-top: 24rpx;
    background-color: #fff;
    overflow: hidden;
  }

  .uni-list-item__content-title {
    font-size: 30rpx;
  }

  .avatar-main {
    display: flex;
    justify-content: center;
    margin-top: 24rpx;
    padding: 50rpx 0 !important;
    overflow: hidden;

    .avatar-wrapper {
      display: inline-block;
      align-items: center;
      background-color: transparent;
      border: none;
      width: 150rpx;
      height: 150rpx;
      padding: 0 !important;

      &::after {
        display: none;
      }
    }

    .avatar {
      width: 150rpx;
      height: 150rpx;
      border-radius: 50%;
    }

    .text {
      display: inline-block;
      font-size: 24rpx;
      width: 150rpx;
      height: 150rpx;
      line-height: 150rpx;
      text-align: center;
      background-color: #eeeeee;
      border-radius: 50%;
    }
  }
}
</style>

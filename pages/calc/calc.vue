<template>
  <view class="ne-calc">
    <uni-list :border="false">
      <uni-list-item :border="false" v-for="item in data" :thumb="item.img" :title="item.title" thumb-size="lg"
                     :class="item.to?'ok':'no'"
                     @tap="to(item)">

      </uni-list-item>
    </uni-list>
    <uni-list :border="false">
      <uni-list-item :border="false" v-for="item in other" :thumb="item.img" :title="item.title" thumb-size="lg"
                     :class="item.to?'ok':'no'"
                     @tap="to(item)">

      </uni-list-item>
    </uni-list>
  </view>
</template>

<script>
export default {
  data() {
    return {
      data: [{
        title: '能力值计算器',
        img: '/static/icon/GoldBottleCap.png',
        to: '/pages/list/list'
      }, {
        title: '个体值计算器',
        img: '/static/icon/BottleCap.png',
      }, {
        title: '努力值计算器',
        img: '/static/icon/MachoBrace.png',
      }, {
        title: '伤害计算器',
        img: '/static/icon/KingRock.png',
      }, {
        title: '宝可梦数据对比',
        img: '/static/icon/FocusBand.png',
      }],
      other: [{
        title: '队伍编辑',
        img: '/static/icon/ExpShare.png',
      }, {
        title: '打击盲点计算器',
        img: '/static/icon/MegaStone1.png',
      }, {
        title: '联防盲点计算器',
        img: '/static/icon/MegaStone2.png',
      }, {
        title: '觉醒力量属性计算器',
        img: '/static/icon/MegaStone3.png',
      }, {
        title: '速度计算器',
        img: '/static/icon/PowerWeight.png',
      }, {
        title: '闪光计数器',
        img: '/static/icon/egg.png',
      }]
    }
  },
  methods: {
    to(item) {
      if (!item.to)
        return uni.showToast({
          title: '功能在来的路上~☺️',
          icon: 'none'
        })
      uni.navigateTo({
        url: item.to
      })
    }
  }
}
</script>

<style lang="scss">
.ne-calc {
  min-height: 100vh;
  margin-bottom: 24rpx;
  padding: 0 24rpx 24rpx;
  background-color: #f5f5f5;
  overflow: hidden;

  .no {
    filter: grayscale(100%);
  }

  .uni-list {
    border-radius: 20rpx;
    margin-top: 24rpx;
    background-color: #fff;
    overflow: hidden;
  }

  .uni-list-item__content-title {
    font-size: 30rpx;
  }
}
</style>

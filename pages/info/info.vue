<template>
  <view class="ne-info">


    <uni-list :border="false">
      <uni-list-item :border="false" v-for="item in data" :thumb="item.img" :title="item.title" thumb-size="lg"
                     :key="item.title"
                     :class="item.to?'ok':'no'"
                     @tap="to(item)">

      </uni-list-item>
    </uni-list>
    <uni-list :border="false">
      <uni-list-item :border="false" v-for="item in other" :thumb="item.img" :title="item.title" thumb-size="lg"
                     :key="item.title"
                     :class="item.to?'ok':'no'"
                     @tap="to(item)">

      </uni-list-item>
    </uni-list>

  </view>
</template>

<script>
import {getDetails} from "../../server";
import {attributeToId} from "../../utils";

export default {
  data() {
    return {
      data: [{
        title: '招式列表',
        img: '/static/icon/yb.png',
        to: '/subPages/skills/skills'
      }, {
        title: '定点教学 - 普通招式',
        img: '/static/icon/yb.png'
      }, {
        title: '定点教学 - 特殊招式',
        img: '/static/icon/yb.png'
      }, {
        title: '招式优先度',
        img: '/static/icon/yb.png'
      }],
      other: [{
        title: '道具列表',
        img: '/static/icon/Leftovers.png',
        to: '/subPages/items/items'
      }, {
        title: '特性列表',
        img: '/static/icon/AbilityPatch.png',
        to: '/subPages/ability/ability'
      }, {
        title: '蛋组',
        img: '/static/icon/egg.png'
      }, {
        title: '属性相克表',
        img: '/static/icon/LuckyPunch.png',
        to: '/subPages/typeConflict/typeConflict'
      }, {
        title: '性格修正',
        img: '/static/icon/Mint.png',
        to: '/subPages/nature/nature'
      }, {
        title: '训练家',
        img: '/static/icon/ch.png'
      }, {
        title: '速度线',
        img: '/static/icon/ChoiceScarf.png'
      }, {
        title: '觉醒力量详情',
        img: '/static/icon/yb.png'
      }, {
        title: '异常状态列表',
        img: '/static/icon/FlameOrb.png'
      }, {
        title: '场地列表',
        img: '/static/icon/TerrainExtender.png'
      }, {
        title: '天气列表',
        img: '/static/icon/HeatRock.png'
      }, {
        title: '能力等级说明',
        img: '/static/icon/Leek.png'
      }],
      sc: 0,
      items: ['基本信息', '游戏中', '招式列表'],
      id: '',
      current: 0,
      activeColor: '#2979ff',
      rpx: '175rpx',
    }
  },
  onLoad(option) {
    console.log(option)
    this.id = option.id
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
    attributeToId,
    onClickItem() {
    },
    change(e) {
      this.current = e.detail.current
      console.log(e)
    },
    inter(i) {
      return parseInt(i)
    },
  },
  mounted() {
  }
}
</script>

<style lang="scss">
.ne-info {
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

  .egg {
    color: $uni-primary;
    text-decoration: underline;
    font-size: 14px;
  }

  .description {
    max-height: 200rpx;
    overflow: hidden;
    line-height: 45rpx;
    font-size: 28rpx;
    color: $uni-info;
    text-indent: 2em;
  }

  .uni-padding-wrap {
    padding: 20rpx 60rpx;
  }

  .banner {
    width: 100%;
  }

  .banner, .swiper {
    width: 100%;
    height: 400rpx;
  }

  .image {
    transform: scale(1);
    width: 400rpx;
    height: 400rpx;
    margin: 0 auto;
    transition: all 0.5s;
  }

  .image-hide {
    transform: scale(0.5);
  }

  .type {
    width: 100rpx;
    color: #fff;
    border-radius: 100rpx;
    text-align: center;
    padding: 5rpx 0;
    font-size: 24rpx;
  }
}


</style>

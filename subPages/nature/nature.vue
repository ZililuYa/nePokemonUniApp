<template>
  <view class="ne-nature">

    <view class="table">

      <view class="tr">
        <view class="th">
          性格
        </view>
        <view class="th">
          提升
        </view>
        <view class="th">
          降低
        </view>
        <view class="th">
          ❤️
        </view>
        <view class="th">
          💔
        </view>
      </view>
      <view class="tr" v-for="(nature, index) in natures" :key="index">
        <view class="td">
          {{ nature.nature }}
        </view>
        <view class="td" :class="'bgl-'+bgl(nature.increased_stat)">
          {{ nature.increased_stat }}
        </view>
        <view class="td" :class="'bgl-'+bgl(nature.decreased_stat)">
          {{ nature.decreased_stat }}
        </view>
        <view class="td">
          {{ nature.likes_flavor }}
        </view>
        <view class="td">
          {{ nature.dislikes_flavor }}
        </view>
      </view>

    </view>

  </view>
</template>

<script>
import {natures} from "../../utils";

export default {
  onShareAppMessage: function () {
    return {
      title: '精灵宝可梦',
      path: '/pages/list/list'
    }
  },
  data() {
    return {
      natures
    }
  },
  methods: {
    bgl(text) {
      switch (text) {
        case '攻击':
          return 1;
        case '防御':
          return 2;
        case '特攻':
          return 3;
        case '特防':
          return 4;
        case '速度':
          return 5;
        default:
          return '';
      }

    }
  }
}
</script>

<style lang="scss">
.ne-nature {
  width: 100%;
  padding-bottom: 50rpx;

  .table {
    width: 100%;
  }

  .tr {
    display: flex;
    width: 100%;
    border-bottom: 1rpx solid #eee;
    height: 80rpx;
    line-height: 80rpx;
  }

  .th {
    color: #333;
    font-size: 26rpx;
    font-weight: bold;
    text-align: center !important;
    width: 25%;
    border-right: 1rpx solid #eee;
    background-color: rgb(255, 224, 196);
  }

  .td {
    text-align: center !important;
    font-size: 24rpx;
    width: 25%;
    border-right: 1rpx solid #eee;
  }

  .bgl-1 {
    background-color: #FAE192;
  }

  .bgl-2 {
    background-color: #FBB977;
  }

  .bgl-3 {
    background-color: #A2D4DA;
  }

  .bgl-4 {
    background-color: #89A9CD !important;
  }

  .bgl-5 {
    background-color: #C39CD8 !important;
  }
}
</style>

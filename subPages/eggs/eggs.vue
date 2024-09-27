<template>
  <view class="ne-eggs">
    <uni-list :border="false" v-if="!show">
      <uni-list-item v-for="item in eggs" :title="item.text" @tap="tap(item)"></uni-list-item>
    </uni-list>

    <view v-if="show">


      <view class="title">
        {{ egg.text }}
      </view>
      <view class="content">
        {{ egg.value }}
      </view>

      <uni-collapse ref="collapse" v-model="value">
        <uni-collapse-item title="属于此蛋群的宝可梦" :border="false">
          <view style="padding-bottom: 24rpx;overflow: hidden">
            <view class="th">
              <view class="v1">宝可梦</view>
              <view class="v1">单一蛋群</view>
              <view class="v1">双蛋群</view>
            </view>
            <view class="th" v-for="item in data">
              <view class="v1">
                <image class="img" :src="`https://pokepast.es/img/pokemon/${inter(item.id)}-0.png`"></image>
                <text>{{ item.cnName }}</text>
              </view>
              <view class="v1" :class="{active: item.eggGroup[0] === egg.text }">{{ item.eggGroup[0] }}</view>
              <view class="v1" :class="{active: item.eggGroup[1] === egg.text }">{{ item.eggGroup[1] || '-' }}</view>
            </view>
          </view>
        </uni-collapse-item>
      </uni-collapse>

    </view>
  </view>
</template>

<script>
import {eggs} from "../../utils";
import {getList} from "../../server";

export default {
  data() {
    return {
      value: ['0'],
      eggs,
      show: false,
      data: [],
      egg: {},
    }
  },
  methods: {
    inter(i) {
      if (!i) return i;
      return parseInt(i)
    },
    tap(item) {
      this.egg = item;
      getList({
        page: 1,
        per_page: 200,
        egg: item.text,
      }).then(res => {
        this.data = res.data.result.map(r => {
          r.eggGroup = r.eggGroup.split(',').map(s => s.trim());
          return r;
        });
        this.show = true;
      });

    }
  }
}
</script>

<style lang="scss">

.ne-eggs {
  padding: 24rpx 24rpx 64rpx 24rpx;
  min-height: 100vh;
  background-color: #f5f5f5;

  .uni-collapse-item-border {
    border: 0 !important;
  }

  .th {
    height: 80rpx;
    display: flex;
    margin-bottom: 12rpx;

    .v1 {
      width: 33.333%;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      font-size: 24rpx;
      color: #333;
      display: flex;
      justify-content: center;

      .img {
        width: 80rpx;
        height: 80rpx;
        margin-right: 12rpx;
      }

      &.active {
        color: $uni-primary;
      }
    }
  }

  .uni-collapse {
    margin-top: 24rpx;
    border-radius: 20rpx;
    overflow: hidden;
  }


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

  .uni-list {
    border-radius: 20rpx;
    overflow: hidden;
  }
}

</style>

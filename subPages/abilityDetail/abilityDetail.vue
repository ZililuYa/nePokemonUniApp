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
      <view v-for="(item, i) in content" :key="i" class="ne-c">{{ item }}</view>
    </view>


    <uni-collapse ref="collapse" v-model="value" v-if="pokemon && pokemon.length">
      <uni-collapse-item title="拥有此特性的宝可梦" :border="false">
        <view style="padding-bottom: 24rpx;overflow: hidden">
          <view class="th">
            <view class="v1 t1">宝可梦</view>
            <view class="v1">特性一</view>
            <view class="v1">特性二</view>
            <view class="v1">隐藏特性</view>
          </view>
          <view class="th" v-for="item in pokemon" :key="item.cnName" @tap="to(item.id)">
            <view class="v1 t1">
              <image class="img" :src="item.image"></image>
              <text>{{ item.cnName }}</text>
            </view>
            <view class="v1" :class="{active: item.commonFeature[0] === data.cnName }">{{
                item.commonFeature[0] || '-'
              }}
            </view>
            <view class="v1" :class="{active: item.commonFeature[1] === data.cnName }">{{
                item.commonFeature[1] || '-'
              }}
            </view>
            <view class="v1" :class="{active: item.hideFeature === data.cnName }">{{
                item.hideFeature || '-'
              }}
            </view>
          </view>
        </view>
      </uni-collapse-item>
    </uni-collapse>

  </view>
</template>

<script>
import {getAbility, getList} from "../../server";
import {inter} from "../../utils";

export default {
  onShareAppMessage: function () {
    return {
      title: '精灵宝可梦',
      path: '/pages/list/list'
    }
  },
  data() {
    return {
      value: ['0'],
      pokemon: [],
      content: [],
      data: {}
    }
  },
  methods: {
    inter, to(id) {

      uni.navigateTo({
        url: '/pages/detail/detail?id=' + id
      })

    }
  },
  mounted() {
  },
  onLoad(option) {
    console.log(option)
    getAbility(option.id).then(res => {
      console.log(res)
      this.data = res.data;
      this.content = res.data.markdownContent.split('\n');
      uni.setNavigationBarTitle({
        title: this.data.cnName || this.data.name
      });

      getList({
        page: 1,
        per_page: 200,
        feature: res.data.cnName,
      }).then(res => {
        this.pokemon = res.data.result.map(r => {
          r.commonFeature = r.commonFeature.split(',').map(s => s.trim());
          return r;
        });
      });

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
  padding: 24rpx 24rpx 64rpx 24rpx;

  .uni-collapse-item-border {
    border: 0 !important;
  }
  .ne-c + .ne-c {
    margin-top: 12rpx;
  }

  .th {
    height: 80rpx;
    display: flex;
    margin-bottom: 12rpx;

    .t1 {
      width: 40% !important;
    }

    .v1 {
      width: 20%;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      font-size: 24rpx;
      color: #333;
      display: flex;
      justify-content: center;
      overflow: hidden;

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

}
</style>

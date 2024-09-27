<template>
  <view class="ne-skill">
    <image class="img" :src="thumb(id)" alt=""></image>

    <view style="padding: 0 24rpx">
      <view class="title">
        基础信息
      </view>

      <view class="content">
        <view class="li">
          <view style="display: flex" class="fl">
            {{ data.cnName }}
            <text style="font-size: 22rpx;margin-left: 24rpx">{{ data.enName }} / {{ data.jpName }}</text>
          </view>
          <view class="fr">招式</view>
        </view>
        <view class="li">

          <view class="right">

            <attributeTag :name="data.attributes.name" class="tag" v-if="data.attributes"></attributeTag>
            <image src="/static/Physicalmove.png" alt="" v-if="data.categories.name==='物理'"/>
            <image src="/static/Specialmove.png" alt="" v-if="data.categories.name==='特殊'"/>
            <image src="/static/Statusmove.png" alt="" v-if="data.categories.name==='变化'"/>

          </view>

          <view class="fr">属性</view>
        </view>
        <view class="li">
          <text class="power">{{ data.power }}</text>
          <view class="fr">威力</view>
        </view>
        <view class="li">
          {{ data.hit === '-' ? '-' : data.hit + '%' }}
          <view class="fr">命中</view>
        </view>
        <view class="li">
          {{ pp(data.pp) }}
          <view class="fr">PP</view>
        </view>
        <view class="li">
          -
          <view class="fr">优先度</view>
        </view>
        <view>
          -
          <view class="fr">目标</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {getSkill} from "../../server";
import attributeTag from "../../components/attributeTag.vue";

export default {
  components: {attributeTag},
  data() {
    return {
      id: 0,
      data: {},
    }
  },
  methods: {
    thumb(id) {
      if (id <= 559) {
        return `https://s1.52poke.com/assets/animoves/AniMove${id < 10 ? '00' + id : id < 100 ? '0' + id : id}.gif`
      } else
        return `https://pokepast.es/img/pokemon/${this.inter(id)}-0.png`
    },
    pp(pp) {
      pp = parseInt(pp);
      if (pp === 1) {
        return `1（1/1/1）`
      } else if (pp === 5) {
        return `5（6/7/8）`
      } else if (pp === 10) {
        return `10（12/14/16）`
      } else if (pp === 15) {
        return `15（18/21/24）`
      } else if (pp === 20) {
        return `20（24/28/32）`
      } else if (pp === 25) {
        return `25（30/35/40）`
      } else if (pp === 30) {
        return `30（36/42/48）`
      } else if (pp === 35) {
        return `35（42/49/56）`
      } else if (pp === 40) {
        return `40（48/56/64）`
      }
    },
  },
  mounted() {
    // 559
  },
  onLoad(option) {
    console.log(option)
    this.id = option.id;
    getSkill(option.id).then(res => {
      console.log(res)
      this.data = res.data;
    })
  }
}
</script>

<style lang="scss">
.ne-skill {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 0 0 64rpx 0;

  .right {
    display: flex;
    float: left;

    image {
      height: 40rpx;
      width: 70rpx;
      margin-left: 20rpx;
      display: inline-block;
      transform: translateY(5rpx);
    }
  }


  .img {
    width: 750rpx;
    height: 562.5rpx;
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

    .li {
      margin-bottom: 24rpx;
      font-size: 30rpx;
      overflow: hidden;
      line-height: 50rpx;

      .power {
        color: $uni-primary;
        font-weight: bold;
      }
    }

    .fr {
      font-size: 24rpx !important;
      color: #999;
    }
  }
}
</style>

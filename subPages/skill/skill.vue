<template>
  <view class="ne-skill" v-if="data.cnName">
    <image class="img" :src="thumb(id)" alt="" v-if="id <= 559"></image>

    <view style="padding: 0 24rpx">
      <view class="title">
        基础信息
      </view>

      <view class="content">
        <view class="ne-li">
          <view class="ne-left">招式:</view>

          <view class="ne-right">
            {{ data.cnName }} / {{ data.enName }} / {{ data.jpName }}
          </view>
        </view>

        <view class="ne-li">

          <view class="ne-left">属性:</view>
          <view class="ne-right">
            <attributeTag :name="data.attributes.name" class="tag" v-if="data.attributes"></attributeTag>
            <image src="/static/Physicalmove.png" class="image" alt="" v-if="data.categories.name==='物理'"/>
            <image src="/static/Specialmove.png" class="image" alt="" v-if="data.categories.name==='特殊'"/>
            <image src="/static/Statusmove.png" class="image" alt="" v-if="data.categories.name==='变化'"/>
          </view>

        </view>
        <view class="ne-li">
          <view class="ne-left">威力:</view>
          <text class="ne-right power">{{ data.power }}</text>
        </view>
        <view class="ne-li">
          <view class="ne-left">命中:</view>
          <view class="ne-right">
            {{ data.hit === '—' ? data.hit : data.hit + '%' }}
          </view>
        </view>
        <view class="ne-li">
          <view class="ne-left">PP:</view>
          <view class="ne-right">
            {{ pp(data.pp) }}
          </view>
        </view>
        <view class="ne-li">
          <view class="ne-left">优先度:</view>
          <view class="ne-right">
            {{ data.priority || '—' }}
          </view>
        </view>
        <view class="ne-li">
          <view class="ne-left">目标:</view>
          <view class="ne-right">
            {{ data.target || '—' }}
          </view>
        </view>
      </view>


      <view class="title">
        描述
      </view>
      <view class="content">
        {{ data.content }}
        <view style="height: 24rpx"></view>

        <template v-for="(item) in data.moreInfoExt">
          <view style="margin-top: 12rpx;" :key="item">{{ item }}</view>
        </template>
      </view>


      <uni-collapse ref="collapse" v-model="value" v-if="pokemon && pokemon.length">
        <uni-collapse-item title="可以学会该招式的宝可梦" :border="false">
          <view style="padding-bottom: 24rpx;overflow: hidden">
            <view class="th">
              <view class="v1">宝可梦</view>
              <view class="v1">世代</view>
            </view>
            <template v-for="(item) in pokemon">
              <view class="th" :key="item.id" @tap="to(item.id)">
                <view class="v1">
                  <image class="img" :src="item.image"></image>
                  <text>{{ item.cnName }}</text>
                </view>
                <view class="v1">{{ item.generation }}</view>
              </view>
            </template>
          </view>
        </uni-collapse-item>
      </uni-collapse>


    </view>
  </view>
</template>

<script>
import {getSkill, getSkillPokemon} from "../../server";
import attributeTag from "../../components/attributeTag.vue";

export default {
  onShareAppMessage: function () {
    return {
      title: '精灵宝可梦',
      path: '/pages/list/list'
    }
  },
  components: {attributeTag},
  data() {
    return {
      value: ['0'],
      id: 0,
      data: {
        moreInfoExt: []
      },
      pokemon: []
    }
  },
  methods: {
    to(id) {
      uni.navigateTo({
        url: '/pages/detail/detail?id=' + id
      })
    },
    inter(i) {
      if (!i) return i;
      return parseInt(i)
    },
    thumb(id) {
      if (id <= 559) {
        return `https://s1.52poke.com/assets/animoves/AniMove${id < 10 ? '00' + id : id < 100 ? '0' + id : id}.gif`
      }
      return ''
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

    getSkillPokemon(option.id, {page: 1, per_page: 100}).then(res => {
      console.log(res)
      this.pokemon = res.data.result
    })

    getSkill(option.id).then(res => {
      console.log(res)
      this.data = res.data;
      uni.setNavigationBarTitle({
        title: res.data.cnName
      });
    })
  }
}
</script>

<style lang="scss">
.ne-skill {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 0 0 64rpx 0;

  .uni-collapse-item-border {
    border: 0 !important;
  }

  .uni-collapse {
    margin-top: 24rpx;
    border-radius: 20rpx;
    overflow: hidden;
  }

  .th {
    height: 80rpx;
    display: flex;
    margin-bottom: 12rpx;

    .v1 {
      width: 50%;
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

  .image {
    height: 40rpx;
    width: 70rpx;
    margin-left: 20rpx;
    display: inline-block;
    transform: translateY(5rpx);
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

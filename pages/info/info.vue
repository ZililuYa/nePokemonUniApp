<template>
  <view class="info">
    <!--    <view class="banner">-->
    <!--      <swiper class="swiper" :indicator-dots="false" :autoplay="false"-->
    <!--              :previous-margin="rpx" active-class="active" @change="change"-->
    <!--              :next-margin="rpx">-->
    <!--        <swiper-item>-->
    <!--          <image class="image" :class="current===0?'':'image-hide'"-->
    <!--                 :src="`https://pokepast.es/img/pokemon/${inter(id)}-0.png`"></image>-->
    <!--        </swiper-item>-->
    <!--        <swiper-item v-if="data.form2">-->
    <!--          <image class="image" :class="current===1?'':'image-hide'"-->
    <!--                 :src="`https://pokepast.es/img/pokemon/${inter(id)}-1.png`"></image>-->
    <!--        </swiper-item>-->
    <!--        <swiper-item v-if="data.form3">-->
    <!--          <image class="image" :class="current===2?'':'image-hide'"-->
    <!--                 :src="`https://pokepast.es/img/pokemon/${inter(id)}-2.png`"></image>-->
    <!--        </swiper-item>-->
    <!--        <swiper-item v-if="data.form4">-->
    <!--          <image class="image" :class="current===3?'':'image-hide'"-->
    <!--                 :src="`https://pokepast.es/img/pokemon/${inter(id)}-3.png`"></image>-->
    <!--        </swiper-item>-->
    <!--      </swiper>-->
    <!--    </view>-->

    <!--    <view class="uni-padding-wrap">-->
    <!--      <uni-segmented-control :current="sc" :values="items" :style-type="'button'"-->
    <!--                             :active-color="activeColor" @clickItem="onClickItem"/>-->
    <!--    </view>-->

    <!--    <view v-if="sc === 0 && data.name">-->

    <!--      <uni-list :border="true">-->

    <!--        <uni-list-item :title="'#' + id" rightText="编号"></uni-list-item>-->

    <!--        <uni-list-item :title="data.name || ''" rightText="名称" v-if="current === 0"></uni-list-item>-->
    <!--        <uni-list-item :title="data.form2 || ''" rightText="名称" v-if="current === 1"></uni-list-item>-->
    <!--        <uni-list-item :title="data.form3 || ''" rightText="名称" v-if="current === 2"></uni-list-item>-->
    <!--        <uni-list-item :title="data.form4 || ''" rightText="名称" v-if="current === 3"></uni-list-item>-->


    <!--        <uni-list-item :title="data.ability1 || ''" rightText="特性" v-if="current === 0"></uni-list-item>-->
    <!--        <uni-list-item :title="data.ability2 || ''" rightText="特性"-->
    <!--                       v-if="current === 0 && data.ability2"></uni-list-item>-->
    <!--        <uni-list-item :title="data.abilityd || ''" rightText="隐藏特性"-->
    <!--                       v-if="current === 0 && data.abilityd"></uni-list-item>-->


    <!--        <uni-list-item :title="data['ability1-2'] || data.ability1 || ''" rightText="特性"-->
    <!--                       v-if="current === 1"></uni-list-item>-->
    <!--        <uni-list-item :title="data['ability1-3'] || data.ability1 || ''" rightText="特性"-->
    <!--                       v-if="current === 2"></uni-list-item>-->
    <!--        <uni-list-item :title="data['ability1-4'] || data.ability1 || ''" rightText="特性"-->
    <!--                       v-if="current === 3"></uni-list-item>-->


    <!--        <uni-list-item rightText="属性">-->

    <!--          <template v-slot:header>-->
    <!--            <view style="display: flex">-->
    <!--              <view class="type" :class="'bg-' + attributeToId(data.type1)">{{ data.type1 }}</view>-->
    <!--              <view class="type" :class="'bg-' + attributeToId(data.type2)" v-if="data.type2"-->
    <!--                    style="margin-left: 10px">{{ data.type2 }}-->
    <!--              </view>-->
    <!--            </view>-->
    <!--          </template>-->

    <!--        </uni-list-item>-->


    <!--        <uni-list-item :title="data.species+'宝可梦'" rightText="分类"></uni-list-item>-->

    <!--        <uni-list-item rightText="蛋组">-->

    <!--          <template v-slot:header>-->
    <!--            <view style="display: flex">-->
    <!--              <text class="egg">{{ data.egggroup1 || '未发现' }}</text>-->
    <!--              <text class="egg" style="margin-left: 10px" v-if="data.egggroup2">{{ data.egggroup2 }}</text>-->
    <!--            </view>-->
    <!--          </template>-->

    <!--        </uni-list-item>-->

    <!--        <uni-list-item :title="data.catchrate || ''" rightText="捕获率"></uni-list-item>-->

    <!--        <uni-list-item :title="data.height || ''" rightText="身高(m)"></uni-list-item>-->

    <!--        <uni-list-item :title="data.weight || ''" rightText="体重(kg)"></uni-list-item>-->

    <!--        <uni-list-item :title="data.lv100exp || ''" rightText="100级时经验值"></uni-list-item>-->
    <!--        &lt;!&ndash;        evat: "0"&ndash;&gt;-->
    <!--        &lt;!&ndash;        evde: "0"&ndash;&gt;-->
    <!--        &lt;!&ndash;        evhp: "0"&ndash;&gt;-->
    <!--        &lt;!&ndash;        evsa: "3"&ndash;&gt;-->
    <!--        &lt;!&ndash;        evsd: "0"&ndash;&gt;-->
    <!--        &lt;!&ndash;        evsp: "0"&ndash;&gt;-->
    <!--        <uni-list-item v-if="data.evhp && data.evhp !== '0'" :title="data.evhp || ''"-->
    <!--                       rightText="HP(取得基础点数)"></uni-list-item>-->
    <!--        <uni-list-item v-if="data.evsa && data.evsa !== '0'" :title="data.evsa || ''"-->
    <!--                       rightText="特攻(取得基础点数)"></uni-list-item>-->
    <!--        <uni-list-item v-if="data.evsd && data.evsd !== '0'" :title="data.evsd || ''"-->
    <!--                       rightText="特防(取得基础点数)"></uni-list-item>-->
    <!--        <uni-list-item v-if="data.evsp && data.evsp !== '0'" :title="data.evsp || ''"-->
    <!--                       rightText="速度(取得基础点数)"></uni-list-item>-->
    <!--        <uni-list-item v-if="data.evde && data.evde !== '0'" :title="data.evde || ''"-->
    <!--                       rightText="防御(取得基础点数)"></uni-list-item>-->
    <!--        <uni-list-item v-if="data.evat && data.evat !== '0'" :title="data.evat || ''"-->
    <!--                       rightText="攻击(取得基础点数)"></uni-list-item>-->


    <!--      </uni-list>-->

    <!--      <uni-section title="介绍" type="line" padding>-->
    <!--        <view class="description">-->
    <!--          {{ data.description || '暂无介绍' }}-->
    <!--        </view>-->
    <!--      </uni-section>-->

    <!--    </view>-->

  </view>
</template>

<script>
import {getDetails} from "../../server";
import {attributeToId} from "../../utils";

export default {
  data() {
    return {
      sc: 0,
      items: ['基本信息', '游戏中', '招式列表'],
      id: '',
      current: 0,
      activeColor: '#2979ff',
      rpx: '175rpx',
      data: {}
    }
  },
  onLoad(option) {
    console.log(option)
    this.id = option.id
  },
  methods: {
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
    console.log(this.id)
    getDetails({id: this.id}).then(res => {
      console.log(res)
      this.data = res.data;
    })
  }
}
</script>

<style lang="scss">
.info {
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

<template>
  <view class="ne-type-conflict">

    <image src="https://media.52poke.com/wiki/8/8a/%E5%B1%9E%E6%80%A7%E7%9B%B8%E5%85%8B%E8%A1%A8_SWSH.png"
           class="tc-image"></image>
    <view class="ne-tc">
      <view class="title">
        判定
      </view>
      <view class="content">
        当一个招式对一种属性效果绝佳时，这个招式造成的伤害会变为原来的两倍（2×）
        <text class="c1">（○）</text>
        。
        <view class="mt-10">当一个招式对一种属性效果不好时，这个招式造成的伤害会变为原来的一半（1⁄2×）
          <text class="c2">（△）</text>
          。
        </view>
        <view class="mt-10">
          当一个招式对一种属性没有效果时，它不会造成任何伤害（0×）
          <text class="c3">（×）</text>
          。同时也不会触发目标的特性或者其它的一些判定。
        </view>
      </view>

      <view class="title">
        概述
      </view>
      <view class="content">
        属性相克是属性作用的直接体现，一种属性与另一种属性之间可能拥有效果绝佳、效果一般、效果不好和没有效果关系。属性相克表直观地表示了攻击方所使用招式的属性和防御方宝可梦的属性两者对该招式威力所产生的影响。表格中只包含了一组属性的影响，而非多种属性。
        <view class="mt-10">
          每个宝可梦和招式都有各自的属性。在特定属性的直接造成伤害的招式攻击特定属性的宝可梦时，依照属性相性，可能会出现“效果绝佳”，“效果一般”，“效果不好”或“没有效果”的结果。
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {attributes} from "../../utils";
import AttributeTag from "../../components/attributeTag.vue";

export default {
  components: {AttributeTag},
  data() {
    return {
      attributes
    }
  },
  methods: {}
}
</script>

<style lang="scss">
.ne-type-conflict {
  background-color: #f5f5f5;
  min-height: 100vh;

  .title {
    margin-top: 24px;
    color: #000;
    font-weight: bold;
    font-size: 30rpx;
  }

  .ne-tc {
    padding: 0 24rpx 54rpx;
  }

  .content {
    margin-top: 24rpx;
    padding: 24rpx;
    background-color: #fff;
    border-radius: 20rpx;
    color: #333;
    line-height: 40rpx;
    font-size: 26rpx;

    text.c1 {
      background-color: #3dc53d;
      color: #fff;
    }

    text.c2 {
      background-color: #e43f3f;
      color: #fff;
    }

    text.c3 {
      background-color: #5b5b5b;
      color: #fff;
    }
  }

  .tc-image {
    width: 750rpx;
    height: 750rpx;
  }

  .tc-title {
    color: #333;
    font-size: 28rpx;
  }
}
</style>

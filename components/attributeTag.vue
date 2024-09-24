<template>
  <view class="attributeTag" :class="'bg-'+attributeToId(name) ">
    <view class="tag-icon" :class="'sprite-type-'+attributeToId(name)"></view>
    <view class="tag-name">{{ name }}</view>
  </view>
</template>

<script>
import {attributeToId} from "../utils";

export default {
  name: "attributeTag",
  data() {
    return {};
  },
  methods: {attributeToId},
  mounted() {
  },
  props: ["name"],
  components: {},
}
</script>

<style scoped lang="scss">
.attributeTag {
  width: 160rpx;
  height: 50rpx;
  display: flex;
  color: #fff;
  text-align: center;
  font-size: 24rpx;
  border-radius: 15rpx;


  .tag-icon {

    background-image: url("https://media.52poke.com/wiki/8/87/MST_SV.webp");
    background-size: 40rpx 840rpx;
    background-repeat: no-repeat;
    width: 40rpx;
    height: 40rpx;
    margin: 5rpx 10rpx;
  }

  .tag-name {
    width: 120rpx;
    height: 50rpx;
    line-height: 50rpx;
    text-align: center;
  }
}
</style>
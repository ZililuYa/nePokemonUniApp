<template>
  <view class="slider-main" v-if="data && data.length" :style="'width: '+(width * data.length + 4)+'px'">

    <view class="sm-bj" :style="'width: '+width+'px;left:'+(index*width+2)+'px'"></view>

    <view :style="'width: '+(width * data.length)+'px'" class="sm-tabs">
      <view :style="'width: '+width+'px'" v-for="(item, i) in data" :key="i" class="sm-t" @tap.prevent.stop="input(i)">
        {{ item.title }}
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: "slider",
  data() {
    return {
      index: 0,
    };
  },
  mounted() {
    console.log(this.data, this.width);
  },
  methods: {
    input(e) {
      this.index = e;
      this.$emit('input', e);
    },
  },
  props: ['data', 'width', 'value'],
  components: {},
}
</script>
<style scoped lang="scss">
.slider-main {
  background-color: #eeeeee;
  font-size: 14px;
  height: 34px;
  position: relative;
  color: #333;
  border-radius: 8px;

  .sm-bj {
    height: 30px;
    background-color: #fff;
    position: absolute;
    top: 2px;
    transition: all 0.3s;
    left: 2px;
    z-index: 2;
    border-radius: 8px;
    box-shadow: 0 0 2px #f5f5f5;
  }

  .sm-tabs {
    position: absolute;
    height: 30px;
    top: 2px;
    left: 2px;
    z-index: 10;

    .sm-t {
      float: left;
      line-height: 30px;
      text-align: center;
    }
  }
}
</style>
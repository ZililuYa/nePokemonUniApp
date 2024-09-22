<template>
  <view>
    <uni-search-bar class="search-bar" @confirm="search" v-model="searchValue" @blur="blur" @focus="focus"
                    @input="input"
                    cancel-text="筛选"
                    @cancel="cancel" @clear="clear">
    </uni-search-bar>
    <view style="height: 56px"></view>
    <uni-list>
      <uni-list :border="true">
        <!-- 显示圆形头像 -->


        <template v-for="item in data">

          <!--          <uni-list-chat :avatar-circle="true" :title="item.name"-->
          <!--                         avatar="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" :time="'#'+item.id"-->
          <!--          ></uni-list-chat>-->

          <uni-list-item :title="item.name" :thumb="`https://pokepast.es/img/pokemon/${inter(item.id)}-0.png`"
                         thumb-size="lg" :rightText="'#'+item.id"></uni-list-item>

        </template>

        <uni-load-more :status="status"/>

      </uni-list>
    </uni-list>

    <uni-data-picker v-model="item" :localdata="items" popup-title="请选择" @change="onchange" ref="picker"
                     class="list-data-picker"></uni-data-picker>


  </view>
</template>

<script>
import {getList} from "../../server";

export default {
  data() {
    return {
      item: '0',
      items: [{
        text: "全部",
        value: "0",
      }, {
        text: "第一世代",
        value: "0|151",
      }, {
        text: "第二世代",
        value: "152|300",
      }, {
        text: "第三世代",
        value: "3",
      }, {
        text: "第四世代",
        value: "4",
      }, {
        text: "第五世代",
        value: "5",
      }, {
        text: "第六世代",
        value: "6",
      }, {
        text: "第七世代",
        value: "7",
      }, {
        text: "第八世代",
        value: "8",
      }, {
        text: "第九世代",
        value: "9",
      }],
      status: 'loading',
      list: [],
      data: [],
      rawData: [],
      index: 0,
      searchValue: ''
    }
  },
  onReachBottom() {
    this.next();
    if (this.index >= this.list.length) {
      this.status = 'no-more';
    }
  },
  methods: {
    blur() {
    },
    onchange() {
      console.log(this.item)
      if (this.item === '0') {
        this.list = this.paginateArray(this.rawData, 15);
        this.data = this.list[0];
        this.index = 0;
      } else {
        let startEnd = this.item.split('|');
        this.list = this.paginateArray(this.rawData.slice(parseInt(startEnd[0]), parseInt(startEnd[1])), 15);
        this.data = this.list[0];
        this.index = 0;
      }
    },
    paginateArray(arr, pageSize) {
      const result = [];
      for (let i = 0; i < arr.length; i += pageSize) {
        result.push(arr.slice(i, i + pageSize));
      }
      return result;
    },
    inter(i) {
      return parseInt(i)
    },
    next() {
      this.index++;
      if (this.index >= this.list.length) {
        return;
      }
      this.data = this.data.concat(this.list[this.index]);
    },
    search() {
    },
    focus() {
    },
    input() {
    },
    cancel() {
      this.$refs.picker.show();
    },
    clear() {
    }
  },
  mounted() {
    getList().then(res => {
      console.log(res)
      this.rawData = res.data;
      this.list = this.paginateArray(res.data, 15);
      this.data = this.list[0];
    });
  }
}
</script>

<style lang="scss">
.search-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  background-color: #fff;
}

.list-data-picker {
  width: 0;
  height: 0;
}

.popup-height {
  height: 100vh;
  width: 200px;
}
</style>

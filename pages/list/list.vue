<template>
  <view>
    <uni-search-bar class="search-bar" placeholder="请输入宝可梦名称" @confirm="search" v-model="searchValue"
                    @blur="blur" @focus="focus"
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

    <uni-data-picker @popupclosed="popupclosed" v-model="item" :localdata="items" popup-title="请选择"
                     @change="onchange" ref="picker"
                     :class="!show?'list-data-picker':''"></uni-data-picker>


  </view>
</template>

<script>
import {getList} from "../../server";

export default {
  data() {
    return {
      show: false,
      item: '0',
      items: [{
        text: "全部",
        value: "0",
      }, {
        text: "第一世代",
        value: "1|151",
      }, {
        text: "第二世代",
        value: "152|251",
      }, {
        text: "第三世代",
        value: "252|386",
      }, {
        text: "第四世代",
        value: "387|493",
      }, {
        text: "第五世代",
        value: "494|649",
      }, {
        text: "第六世代",
        value: "650|721",
      }, {
        text: "第七世代",
        value: "722|810",
      }, {
        text: "第八世代",
        value: "811|905",
      }, {
        text: "第九世代",
        value: "906|1026",
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
    popupclosed() {
      this.show = false;
    },
    onchange() {
      console.log(this.item)
      if (this.item === '0') {
        this.list = this.paginateArray(this.rawData, 15);
        this.data = this.list[0];
        this.index = 0;
      } else {
        let startEnd = this.item.split('|');
        this.list = this.paginateArray(this.rawData.slice(startEnd[0] - 1, startEnd[1] - 1), 15);
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
      this.show = true;
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
  display: none !important;
}

.popup-height {
  height: 100vh;
  width: 200px;
}
</style>

<template>
  <view class="ne-list">

    <view class="ne-top">


      <uni-search-bar class="search-bar" v-if="searchShow" :focus="true" placeholder="搜索全国图鉴" @confirm="search"
                      v-model="searchValue"
                      @blur="blur" @focus="focus"
                      @input="input"
                      @cancel="searchShow = false" @clear="clear">
      </uni-search-bar>


      <image src="@/static/search.png" class="icon search" v-if="!searchShow"
             @tap.prevent.stop="searchShow = true"></image>
      <image src="@/static/menu.png" class="icon menu" v-if="!searchShow"></image>


      <view style="display: flex;justify-content: center;" v-if="!searchShow">
        <slider :data="menu" :width="90"></slider>
      </view>


    </view>


    <view style="height: 56px"></view>


    <view class="list-main">


      <uni-list class="uni-list-main" :border="false">
        <!-- 显示圆形头像 -->


        <template v-for="item in data">

          <uni-list-item :key="item.id" class="list-item"
                         :thumb="`https://pokepast.es/img/pokemon/${inter(item.id)}-0.png`"
                         @tap.prevent.stop="click(item)"
                         direction="row"
                         thumb-size="lg">


            <template v-slot:body>
              <text>{{ item.name }}</text>
            </template>

            <template v-slot:footer>
              <view class="tag-list">
                <attributeTag name="岩石" class="tag"></attributeTag>
                <attributeTag name="超能力" class="tag"></attributeTag>
              </view>
            </template>


          </uni-list-item>

        </template>

        <!--        <uni-load-more :status="status"/>-->

      </uni-list>
    </view>


  </view>
</template>

<script>
import {getList} from "../../server";
import slider from "../../components/slider.vue";
import attributeTag from "../../components/attributeTag.vue";

export default {
  onShareAppMessage: function () {
    return {
      title: '宝可梦列表',
      path: '/pages/list/list'
    }
  },
  components: {slider, attributeTag},
  data() {
    return {
      menu: [{
        title: '全国图鉴',
      }, {
        title: '帕底亚',
      }],
      searchShow: false,
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
      data: [{
        id: 1,
        name: '小火龙',
      }, {
        id: 2,
        name: '杰尼龟',
      }, {
        id: 3,
        name: '妙蛙花',
      }],
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
    click(item) {
      // console.log(item)
      // uni.navigateTo({
      //   url: '/pages/info/info?id=' + item.id
      // })
    },
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
      if (this.searchValue) {
        this.list = this.paginateArray(this.rawData.filter(item => item.name.indexOf(this.searchValue) !== -1), 15);
        this.data = this.list[0];
        this.index = 0;
      } else {
        this.list = this.paginateArray(this.rawData, 15);
        this.data = this.list[0];
        this.index = 0;
      }
    },
    cancel() {
      // this.show = true;
      // this.$refs.picker.show();
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
.ne-list {
  min-height: 100vh;
  background-color: #f5f5f5;

  .tag-list {
    width: 160rpx;
    margin-left: auto;
    margin-right: 12rpx;
  }

  .tag {
    margin-top: 10rpx;
    display: inline-block;
  }

  .list-main {
    padding: 0 24rpx;

    .list-item {
      margin-bottom: 18rpx;
      border-radius: 20rpx;
      overflow: hidden;
    }

    .uni-list {
      background-color: #f5f5f5;
    }

    .uni-list--lg {
      width: 130rpx;
      height: 130rpx;
    }

    .uni-list--border {
      display: none;
    }

    .uni-list-item__container {
      padding: 12rpx !important;
    }
  }


  .search-bar {
    background-color: #ffffff;
  }

  .ne-top {

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 56px;
    z-index: 99;
    background-color: #f5f5f5;

    .icon {
      position: absolute;
      width: 26px;
      height: 26px;
      top: 15px;
      left: 20px;

      &.menu {
        right: 20px;
        left: auto;
      }
    }

  }

  .list-data-picker {
    display: none !important;
  }

  .popup-height {
    height: 100vh;
    width: 200px;
  }

}

</style>

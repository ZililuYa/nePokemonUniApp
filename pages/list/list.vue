<template>
  <view class="ne-list">

    <view class="ne-top">


      <uni-search-bar class="search-bar" v-if="searchShow" :focus="true" placeholder="搜索全国图鉴"
                      v-model="searchValue"
                      @blur="blur" @focus="focus"
                      @confirm="input"
                      @cancel="cancel" @clear="clear">
      </uni-search-bar>


      <image src="@/static/search.png" class="icon search" v-if="!searchShow"
             @tap.prevent.stop="searchShow = true"></image>
      <image src="@/static/menu.png" class="icon menu" v-if="!searchShow" @tap="open"></image>


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
                         :thumb="thumb(item.id)"
                         @tap.prevent.stop="click(item)"
                         direction="row"
                         thumb-size="lg">


            <template v-slot:body>
              <view style="font-size: 26rpx;margin-top: 10rpx">
                {{ item.cnName }}
                <text style="font-size: 20rpx;color: #999;margin-left: 20rpx">{{ item.jpName }}</text>
              </view>
              <view style="font-size: 20rpx;color: #999;margin-top: 10rpx">
                {{ item.no }}
              </view>
              <view style="font-size: 20rpx;color: #999;margin-top: 10rpx">
                {{ item.features }}
              </view>
            </template>

            <template v-slot:footer>
              <view class="tag-list">
                <attributeTag :name="item.attributes[0].name" class="tag" v-if="item.attributes[0]"></attributeTag>
                <attributeTag :name="item.attributes[1].name" class="tag" v-if="item.attributes[1]"></attributeTag>
              </view>
            </template>


          </uni-list-item>

        </template>

        <uni-load-more :status="status"/>

      </uni-list>
    </view>

    <view>
      <uni-popup ref="popup" type="right" border-radius="10px 10px 0 0">


        <view class="popup-main">
          <uni-section class="mb-10" title="属性" type="line">
            <view style="overflow: hidden">
              <view v-for="item in attributes" :class="'attributes '+(attributesValue===item?'':'grayscale')"
                    :key="item"
                    @tap="attributeSet(item)">
                <attributeTag :name="item" class="tag"></attributeTag>
              </view>

            </view>
          </uni-section>
          <uni-section class="mb-10" title="世代" type="line">
            <view style="overflow: hidden">
              <view v-for="item in century" :text="item.text" class="pm-li" :key="item"
                    :class="{active: item.value === centuryValue}" @tap="centurySet(item.value)">
                {{ item.text }}
              </view>
            </view>
          </uni-section>

          <view class="ne-btn" @tap="refresh">
            <text>重 置</text>
          </view>
        </view>

      </uni-popup>
    </view>

  </view>
</template>

<script>
import {getList} from "../../server";
import slider from "../../components/slider.vue";
import attributeTag from "../../components/attributeTag.vue";
import {attributes, century} from "../../utils";

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
        title: '朱／紫',
      }],
      searchShow: false,
      show: false,
      item: '0',
      attributes,
      attributesValue: '',
      century,
      centuryValue: '',
      status: 'loading',
      list: [],
      data: [],
      page: 1,
      pageSize: 15,
      rawData: [],
      index: 0,
      searchValue: ''
    }
  },
  onReachBottom() {
    if (this.status === 'no-more') return;
    this.next();
  },
  methods: {
    thumb(id) {
      // if (id <= 649) {
      //   return `https://s1.52poke.com/assets/sprite/gen5/${id < 10 ? '00' + id : id < 100 ? '0' + id : id}s.gif`
      // } else
      return `https://pokepast.es/img/pokemon/${this.inter(id)}-0.png`
    },
    refreshData() {
      this.$refs.popup.close();
      this.page = 1;
      this.data = [];
      this.status = 'loading';
      this.getData();
    },
    refresh() {
      this.attributesValue = '';
      this.centuryValue = '';
      this.refreshData();
    },
    attributeSet(value) {
      this.attributesValue = value === this.attributesValue ? '' : value;
      this.refreshData();
    },
    centurySet(value) {
      this.centuryValue = value === this.centuryValue ? '' : value;
      this.refreshData();
    },
    open() {
      this.$refs.popup.open('right')
    },
    click(item) {
      // console.log(item)
      uni.navigateTo({
        url: '/pages/detail/detail?id=' + item.id
      })
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
      if (!i) return i;
      return parseInt(i)
    },
    next() {
      this.page++;
      this.getData();
    },
    focus() {
    },
    input() {
      if (this.searchValue) {
        this.data = [];
        this.page = 1;
        this.getData();
      }
    },
    cancel() {
      this.searchShow = false
      this.searchValue = '';
      this.data = [];
      this.page = 1;
      this.getData();
    },
    clear() {
      this.data = [];
      this.page = 1;
      this.getData();
    },
    getData() {
      this.status = 'loading';
      getList({
        page: this.page,
        per_page: this.pageSize,
        name: this.searchValue || '',
        numb: this.centuryValue || '',
        attribute: this.attributesValue || '',
        generation: this.century.find(item => item.value === this.centuryValue)?.text || ''
      }).then(res => {
        this.data = this.data.concat(res.data.result)
        if (res.data.result.length < this.pageSize) {
          this.status = 'no-more';
        }
      });
    }
  },
  mounted() {
    this.getData();
  }
}
</script>

<style lang="scss">
.ne-list {
  min-height: 100vh;
  background-color: #f5f5f5;

  .ne-btn {
    width: 490rpx;
    margin-left: 30rpx;
    border: 2rpx solid $uni-primary;
    background-color: $uni-primary;
    color: #ffffff;
    margin-top: 30rpx;
    text-align: center;
    border-radius: 15rpx;
    height: 70rpx;
    line-height: 68rpx;
  }

  .uniui-refreshempty {
    color: #fff !important;
    margin-right: 20rpx;
  }

  .popup-main {
    background-color: #ffffff;
    width: 550rpx;
    position: relative;
    height: 100%;

    .uni-section__content-title {
      font-size: 32rpx !important;
    }

    .attributes {
      width: 160rpx;
      margin-bottom: 30rpx;
      margin-left: 17.5rpx;
      float: left;

      &.grayscale {
        filter: grayscale(100%);
      }
    }

    .pm-li {
      width: 230rpx;
      box-sizing: border-box;
      border: 1rpx solid #e5e5e5;
      float: left;
      text-align: center;
      height: 60rpx;
      line-height: 58rpx;
      font-size: 28rpx;
      color: #909399;
      margin-left: 30rpx;
      margin-bottom: 30rpx;
      border-radius: 15rpx;

      &.active {
        border: 1rpx solid $uni-primary;
        background-color: $uni-primary;
        color: #ffffff;
      }
    }
  }

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

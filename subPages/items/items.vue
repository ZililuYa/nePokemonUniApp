<template>
  <view class="ne-skills">

    <uni-search-bar class="search-bar" :focus="true" placeholder="搜索全部"
                    v-model="searchValue"
                    @confirm="confirm"
                    @cancel="cancel" @clear="clear">
    </uni-search-bar>

    <view class="ne-search-bar"></view>


    <uni-list :border="false">
      <uni-list-item :border="true" v-for="item in data"
                     :key="item.name" :thumb="item.image" thumb-size="lg"
                     @tap="to(item)">

        <template v-slot:body>
          <view class="left">
            <text class="title">{{ item.name }}</text>
            <br>
            <text class="content">{{ item.content }}</text>
          </view>
        </template>

      </uni-list-item>
    </uni-list>


    <uni-load-more :status="status"/>

  </view>
</template>

<script>
import {getItemsList, getSkillList} from "../../server";
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
      searchValue: '',
      page: 1,
      pageSize: 15,
      status: 'loading',
      data: []
    }
  },
  onReachBottom() {
    if (this.status === 'no-more') return;
    this.next();
  },
  methods: {
    next() {
      this.page++;
      this.getData();
    },
    cancel() {
      this.searchValue = ''
      this.confirm();
    },
    clear() {
    },
    confirm() {
      this.page = 1;
      this.data = [];
      this.getData();
    },
    to(item) {
      console.log(item)
      uni.navigateTo({
        url: '/subPages/item/item?id=' + item.id,
      });
    },
    getData() {
      this.status = 'loading';
      getItemsList({page: this.page, per_page: this.pageSize, name: this.searchValue}).then(res => {
        console.log(res)
        this.data = this.data.concat(res.data.result);
        if (res.data.result.length < this.pageSize) {
          this.status = 'no-more';
        }
      })

    },
  },
  mounted() {
    this.getData();
  },

}
</script>

<style lang="scss">
.ne-skills {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 0 24rpx;

  .uni-list {
    border-radius: 20rpx;
    overflow: hidden;
  }

  .left {
    width: 100%;

    text {
      width: 100%;
      display: inline-block;
    }
  }

  .right {
    display: flex;
    padding-top: 15rpx;

    image {
      height: 40rpx;
      width: 70rpx;
      margin-left: 20rpx;
      display: inline-block;
      transform: translateY(5rpx);
    }
  }

  .title {
    font-size: 28rpx;
  }

  .content {
    font-size: 22rpx;
    color: #999;
    width: 50%;
    line-height: 30rpx;
    max-height: 60rpx;
    overflow: hidden;
  }

  .ne-search-bar {
    height: 56px;
  }

  .search-bar {
    background-color: #f5f5f5;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
  }
}
</style>

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
                     :key="item.cnName"
                     @tap="to(item)">

        <template v-slot:header>
          <view class="left">
            <text class="title">{{ item.cnName }}</text>
            <view style="display: flex">
              <text class="power">威力：{{ item.power === '变化' ? '-' : item.power }}</text>
              <text class="pp">PP：{{ item.pp }}</text>
            </view>
          </view>
        </template>
        <template v-slot:footer>
          <view class="right">
            <attributeTag :name="item.attributes.name" class="tag" v-if="item.attributes"></attributeTag>
            <image src="/static/Physicalmove.png" alt="" v-if="item.categories.name==='物理'"/>
            <image src="/static/Specialmove.png" alt="" v-if="item.categories.name==='特殊'"/>
            <image src="/static/Statusmove.png" alt="" v-if="item.categories.name==='变化'"/>
          </view>
        </template>

      </uni-list-item>
    </uni-list>


    <uni-load-more :status="status"/>

  </view>
</template>

<script>
import {getSkillList} from "../../server";
import attributeTag from "../../components/attributeTag.vue";

export default {
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
    to(item) {
      uni.navigateTo({
        url: '/subPages/skill/skill?id=' + item.id,
      });
    },
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
    getData() {
      this.status = 'loading';
      getSkillList({page: this.page, per_page: this.pageSize, name: this.searchValue}).then(res => {
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
    width: 50%;

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

  .power {
    font-size: 24rpx;
    color: $uni-primary;
    width: 50%;
  }

  .pp {
    font-size: 22rpx;
    color: #999;
    width: 50%;
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

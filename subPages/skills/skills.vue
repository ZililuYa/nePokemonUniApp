<template>
  <view class="ne-skills">

    <uni-search-bar class="search-bar" :focus="true" placeholder="搜索全部"
                    v-model="searchValue"
                    @confirm="confirm"
                    @cancel="cancel" @clear="clear">
    </uni-search-bar>

    <view class="ne-search-bar"></view>


  </view>
</template>

<script>
import {getSkillList} from "../../server";

export default {
  data() {
    return {
      searchValue: '',
      page: 1,
      pageSize: 15
    }
  },
  methods: {
    cancel() {
      this.searchValue = ''
    },
    clear() {
      this.searchValue = ''
    },
    confirm() {
    },
    search() {
      this.$emit('search', this.searchValue)
    },
    getData() {

      getSkillList({page: this.page, per_page: this.pageSize}).then(res => {
        console.log(res)
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

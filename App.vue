<script>
export default {
  onLaunch: function () {
    console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')


    const updateManager = uni.getUpdateManager();

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate);
    });

    updateManager.onUpdateReady(function (res) {
      uni.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        }
      });

    });

    updateManager.onUpdateFailed(function (res) {
      // 新的版本下载失败
    });


  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
@import '@/uni_modules/uni-scss/index.scss';

@import '@/static/customicons.css';
@import '@/static/css.css';
// 设置整个项目的背景色
page {
  //background-color: #f5f5f5;
}

.fr {
  float: right;
}

.fl {
  float: left;
}

.mt-10 {
  margin-top: 24rpx;
}

.mt-5 {
  margin-top: 12rpx !important;
}

view {
  box-sizing: border-box;
}

.flex-center {
  display: flex;
  justify-content: center;
}

.center {
  text-align: center;
}

.ne-li {
  overflow: hidden;

  .ne-left {
    font-size: 24rpx;
    color: #999;
    float: left;
    line-height: 50rpx;
    overflow: hidden;
  }

  .ne-right {
    font-size: 28rpx;
    color: #333;
    float: right;
    display: flex;
    line-height: 50rpx;
    align-items: center;
    justify-content: right;
  }
}

.ne-li + .ne-li {
  margin-top: 24rpx;
}

</style>

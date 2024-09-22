<script>
export default {
  onLaunch: function () {
    console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
    console.log('App Launch')

    function init(imageUrl, name) {
      // uni.downloadFile({
      //   url: imageUrl, // 图片的 URL
      //   success: function (res) {
      //     // 下载成功后，返回的文件路径
      //     const filePath = res.tempFilePath;
      //     console.log('downloadFile', res, filePath)
      //
      //     // 可以使用 wx.saveImageToPhotosAlbum 将图片保存到用户的相册
      //     // 也可以直接使用这个 filePath 显示图片
      //
      //   },
      //   fail: function (error) {
      //     console.error('Download failed:', error);
      //     if (!two) init('')
      //   }
      // });
      if (!uni.getStorageSync(name))
        uni.getImageInfo({
          src: imageUrl,
          success: function (info) {
            console.log('Image info:', info);
            uni.setStorageSync(name, info.path);
          },
          fail: function (error) {
            console.error('Get image info failed:', error);
          }
        });

    }

    init('https://media.52poke.com/wiki/a/a2/MSP_Normal.webp?v=231214', 'normal_poke');
    init('https://media.52poke.com/wiki/8/84/MSP_Shiny.webp?v=231214', 'flash_poke');
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
/*每个页面公共css */
@import '@/uni_modules/uni-scss/index.scss';
/* #ifndef APP-NVUE */
@import '@/static/customicons.css';
@import '@/static/css.css';
// 设置整个项目的背景色
page {
  //background-color: #f5f5f5;
}

</style>

<template>
  <view class="ne-index">

    <uni-section title="😊" type="line" padding>
      欢迎使用神奇宝贝图鉴
    </uni-section>

    <uni-section title="公告" type="line" padding>
      {{ '暂无' }}
    </uni-section>
    <uni-section title="猜猜我是谁？" type="line" padding>
      <!-- 用于绘制马赛克的 Canvas -->
      <view style=" display: flex;justify-content: center;height: 0;overflow: hidden" :class="show?'showMain':''">
        <canvas canvas-id="mosaicCanvas" class="mosaicCanvas"
                v-if="!open"
                @tap.prevent.stop="open=true;openTra()"></canvas>
        <uni-transition ref="ani" v-if="open" :show="open" style="width: 300px; height: 300px;">
          <image :src="imgSrc" style="width: 300px; height: 300px;" @tap.prevent.stop="openPm"></image>
        </uni-transition>

      </view>

    </uni-section>

  </view>
</template>

<script>
export default {
  data() {
    return {
      imgSrc: '', // 替换为你的图片路径
      show: false,
      id: '',
      open: false,

      canvasWidth: 300, // 限制画布宽度为300px
      canvasHeight: 300, // 限制画布高度为300px
      fireworks: [],
      isRunning: true, // 控制烟花效果的运行状态
    };
  },
  mounted() {
  },
  onShow() {
    this.init();
  },
  methods: {
    openTra() {
      setTimeout(() => {
// 同时右平移到 100px,旋转 360 度
        this.$refs.ani.step({
          translateX: '100px',
          rotate: '360'
        })
        // 上面的动画执行完成后，等待200毫秒平移到 0px,旋转到 0 度
        this.$refs.ani.step({
              translateX: '0px',
              rotate: '0'
            },
            {
              timingFunction: 'ease-in',
              duration: 400
            })
        // 开始执行动画
        this.$refs.ani.run(() => {
          console.log('动画支持完毕')
        })
      }, 300);
    },
    openPm() {
      uni.navigateTo({
        url: `/pages/info/info?id=${this.id}`,
      });
    },
    init() {
      this.open = false;
      this.show = false;
      setTimeout(() => {
        this.imgSrc = `https://pokepast.es/img/pokemon/${this.getRandomNumber()}-0.png`
        this.generateMosaic();
      }, 0);
    },
    getRandomNumber() {
      this.id = Math.floor(Math.random() * 1008) + 1;
      return this.id;
    },
    generateMosaic() {
      const ctx = uni.createCanvasContext('mosaicCanvas');
      const blockSize = 15; // 马赛克块的大小

      // 加载图片到 Canvas 中
      uni.getImageInfo({
        src: this.imgSrc,
        success: (res) => {
          const imgWidth = res.width;
          const imgHeight = res.height;
          console.log(res)

          // 设置 Canvas 大小
          // this.setData({
          //   canvasWidth: imgWidth,
          //   canvasHeight: imgHeight,
          // });

          // 绘制图片到 Canvas 上
          ctx.drawImage(res.path, 0, 0, imgWidth, imgHeight);

          // 获取图片像素数据
          ctx.draw(false, () => {
            uni.canvasGetImageData({
              canvasId: 'mosaicCanvas',
              x: 0,
              y: 0,
              width: imgWidth,
              height: imgHeight,
              success: (imageData) => {
                const data = imageData.data;
                console.log(imageData)

                // 遍历每个像素，将透明背景改为黑色，内容改为白色
                for (let i = 0; i < data.length; i += 4) {
                  const r = data[i];     // 红色
                  const g = data[i + 1]; // 绿色
                  const b = data[i + 2]; // 蓝色
                  const a = data[i + 3]; // 透明度

                  // 判断是否为透明背景
                  if (a === 0) {
                    // 设置为黑色背景
                    data[i] = 0;
                    data[i + 1] = 0;
                    data[i + 2] = 0;
                    data[i + 3] = 255; // 完全不透明
                  } else {
                    // 将内容部分设置为白色
                    data[i] = 255;
                    data[i + 1] = 255;
                    data[i + 2] = 255;
                  }
                }

                // 将处理后的数据重新放回 Canvas
                uni.canvasPutImageData({
                  canvasId: 'mosaicCanvas',
                  data: data,
                  x: 0,
                  y: 0,
                  width: imgWidth,
                  height: imgHeight,
                  complete: () => {
                    console.log('生成成功');
                    this.show = true;
                  },
                });
              },
            });
          });
        },
      });
    },

  },
};
</script>

<style lang="scss">
.ne-index {
  .mosaicCanvas {
    width: 300px;
    height: 300px;
    margin: 0 auto;
    opacity: 1;

    //&.show {
    //  opacity: 1;
    //}
  }

  .showMain {
    height: 300px !important;
  }
}

@keyframes shake {
  0% {
    transform: translate(0);
  }
  25% {
    transform: translate(-5px, 0);
  }
  50% {
    transform: translate(5px, 0);
  }
  75% {
    transform: translate(-5px, 0);
  }
  100% {
    transform: translate(0);
  }
}

.shake-enter-active {
  animation: shake 0.5s ease; /* 动画持续时间 */
}

.shake-leave-active {
  animation: shake 0.5s ease; /* 动画持续时间 */
}

</style>

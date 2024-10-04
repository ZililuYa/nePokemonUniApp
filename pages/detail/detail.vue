<template>
  <view class="ne-detail" v-if="pokemon">

    <view class="ne-top">
      <image class="icon menu" src="@/static/icon/collect.png"></image>
      <image class="icon" src="@/static/icon/copy.png"></image>
      <view style="display: flex;justify-content: center;">
        <slider :data="menu" :width="90"></slider>
      </view>
    </view>

    <view class="ne-main">
      <view class="ne-block flex-center">
        <image class="img" :src="thumb()"></image>
      </view>

      <view class="ne-block mt-10">
        <view class="ne-li">
          <view class="ne-left">
            {{ pokemon.no }}
          </view>
          <view class="ne-right">
            {{ pokemon.cnName }} / {{ pokemon.jpName }} / {{ pokemon.enName }}
          </view>
        </view>
        <view class="ne-li">
          <view class="ne-left" style="line-height: 100rpx">
            小图标:
          </view>
          <view class="ne-right" @tap="back=!back">
            <image style="width: 100rpx;height: 100rpx" mode="aspectFit"
                   :src="`https://sbds-pokemon.oss-cn-hangzhou.aliyuncs.com/img/img/${id + (back?'b':'')}.gif`"></image>
            <view style="width: 24rpx"></view>
            <image style="width: 100rpx;height: 100rpx" mode="aspectFit"
                   :src="`https://sbds-pokemon.oss-cn-hangzhou.aliyuncs.com/img/img/${id}s${back?'b':''}.gif`"></image>
          </view>
        </view>
        <view class="ne-li">
          <view class="ne-left">
            属性:
          </view>
          <view class="ne-right">
            <attributeTag v-if="pokemon.attributes[1]" :name="pokemon.attributes[1].name" class="tag"></attributeTag>
            <view style="width: 24rpx"></view>
            <attributeTag v-if="pokemon.attributes[0]" :name="pokemon.attributes[0].name" class="tag"></attributeTag>
          </view>
        </view>
        <view class="ne-li">
          <view class="ne-left">
            特性:
          </view>
          <view class="ne-right">
            <text style="color: #007aff" @tap="feature(pokemon.commonFeature[1])">{{ pokemon.commonFeature[1] }}</text>
            <view style="width: 24rpx"></view>
            <text style="color: #007aff" @tap="feature(pokemon.commonFeature[0])">{{ pokemon.commonFeature[0] }}</text>
          </view>
        </view>
        <view class="ne-li" v-if="pokemon.hideFeature">
          <view class="ne-left">
            隐藏特性:
          </view>
          <view class="ne-right">
            <text style="color: #007aff" @tap="feature(pokemon.hideFeature)">{{ pokemon.hideFeature }}</text>
          </view>
        </view>
        <view class="ne-li">
          <view class="ne-left">
            种族值:
          </view>
          <view class="ne-right">
            <view style="width: 100rpx" class="center">LV50</view>
            <view style="width: 24rpx"></view>
            <view style="width: 100rpx" class="center">LV100</view>
          </view>
        </view>
        <view class="ne-li mt-5" v-if="forms[showIndex]" v-for="item in form" :key="item.key">
          <view class="ne-left">
            <view class="fl l">{{ item.name }}</view>
            <view class="fl r">{{ forms[showIndex][item.key] }}</view>
            <view class="fl pas" :class="item.key" :style="'width:' + forms[showIndex][item.key] +'rpx'"></view>
          </view>
          <view class="ne-right form-size">
            <view style="width: 100rpx" class="center">
              {{
                calc(item.key, 50, 0, 0, forms[showIndex][item.key], 0.9)
              }}-{{ calc(item.key, 50, 31, 252, forms[showIndex][item.key], 1.1) }}
            </view>
            <view style="width: 24rpx"></view>
            <view style="width: 100rpx" class="center">
              {{ calc(item.key, 100, 0, 0, forms[showIndex][item.key], 0.9) }}-{{
                calc(item.key, 100, 31, 252, forms[showIndex][item.key], 1.1)
              }}
            </view>
          </view>
        </view>


        <view class="ne-li mt-5">
          <view class="ne-left">
            <view class="fl l">总和</view>
            <view class="fl r">{{ forms[showIndex].total }}</view>
            <view class="fl pas total" :style="'width:' + (forms[showIndex].total / 2) +'rpx'"></view>
          </view>

        </view>
      </view>

      <view class="ne-block mt-10">

        <view class="ne-kz">
          （如：龙 - 2 表示被龙2倍克制：空白表示 1 倍）
        </view>

        <view class="kz-list">

          <view class="kz-li" v-for="item in attributes" :key="item">

            <view class="kz-li-top" :class="'bg-' + attributeToId(item)">
              <view class="kz-li-icon sprite-type-icon" :class="'sprite-type-' + attributeToId(item)"></view>
            </view>
            <view class="kz-li-btn"
                  :class="{ruo: calculateTypeEffectiveness(pokemon.attributes[0].name, pokemon.attributes[1] ? pokemon.attributes[1].name : '', item) < 1}">
              {{
                calculateTypeEffectiveness(pokemon.attributes[0].name, pokemon.attributes[1] ? pokemon.attributes[1].name : '', item)
              }}
            </view>

          </view>

        </view>

      </view>


      <view class="ne-block mt-10">
      </view>

    </view>

  </view>
</template>

<script>
import {getAbilityList, getPokemonDetails, getPokemonDetailsForms} from '../../server/index';
import slider from "../../components/slider.vue";
import attributeTag from "../../components/attributeTag.vue";
import {attributes, attributeToId} from "../../utils";

export default {
  components: {attributeTag, slider},
  data() {
    return {
      attributes,
      showIndex: 0,
      back: false,
      id: '',
      forms: [],
      form: [
        {key: 'hp', name: "HP"},
        {key: 'attack', name: "攻击"},
        {key: 'defense', name: "防御"},
        {key: 'spAtk', name: "特攻"},
        {key: 'spDef', name: "特防"},
        {key: 'speed', name: "速度"}
      ],
      menu: [{
        title: '宝可梦',
      }, {
        title: '招式',
      }],
      pokemon: null
    };
  },
  methods: {
    attributeToId,
    feature(name) {
      if (name) {

        getAbilityList({page: 1, per_page: 1, name}).then(res => {
          const data = res.data.result[0]
          console.log(data)
          if (data) {
            uni.navigateTo({
              url: '/subPages/abilityDetail/abilityDetail?id=' + data.id,
            });
          }
        })

      }
    },
    // HP 计算公式
    calculateHpStat(level, iv, ev, baseStat) {
      return ((baseStat * 2 + iv + Math.floor(ev / 4)) * level) / 100 + level + 10;
    },
    // 其他能力值 (如攻击、防御等) 计算公式
    calculateOtherStat(level, iv, ev, baseStat, natureModifier) {
      return (((baseStat * 2 + iv + Math.floor(ev / 4)) * level) / 100 + 5) * natureModifier;
    },
    calc(key, level, iv, ev, baseStat, natureModifier) {
      if (key === 'hp') return parseInt(this.calculateHpStat(level, iv, ev, baseStat));
      return parseInt(this.calculateOtherStat(level, iv, ev, baseStat, natureModifier));
    },
    inter(i) {
      if (!i) return i;
      return parseInt(i)
    },
    thumb(id) {
      if (this.forms && this.forms.length) return this.forms[this.showIndex].hdImage;
      // if (id <= 649) {
      //   return `https://s1.52poke.com/assets/sprite/gen5/${id < 10 ? '00' + id : id < 100 ? '0' + id : id}s.gif`
      // } else
      return `https://pokepast.es/img/pokemon/${this.inter(this.id)}-0.png`
    },
    async fetchPokemonDetails(id) {
      try {
        this.pokemon = (await getPokemonDetails(id)).data;
        this.pokemon.commonFeature = this.pokemon.commonFeature.split(',').map(s => s.trim());
        console.log('Pokemon details:', this.pokemon);

        uni.setNavigationBarTitle({
          title: this.pokemon.cnName || this.pokemon.name
        });

        this.forms = (await getPokemonDetailsForms(id)).data;

      } catch (error) {
        console.error('Failed to fetch Pokemon details:', error);
      }
    },
    calculateTypeEffectiveness(defenseType1, defenseType2, attackType) {
      // 属性克制表
      const typeChart = {
        "一般": {"格斗": 2, "幽灵": 0, "钢": 0.5},
        "格斗": {"飞行": 0.5, "毒": 0.5, "虫": 0.5, "岩石": 2, "幽灵": 0, "超能力": 0.5, "冰": 2, "恶": 2, "妖精": 0.5},
        "飞行": {"格斗": 2, "岩石": 0.5, "钢": 0.5, "虫": 2, "草": 2, "电": 0.5},
        "毒": {"毒": 0.5, "地面": 0.5, "岩石": 0.5, "幽灵": 0.5, "钢": 0, "草": 2, "妖精": 2},
        "地面": {"毒": 2, "岩石": 2, "虫": 0.5, "钢": 2, "火": 2, "草": 0.5, "电": 2, "飞行": 0},
        "岩石": {"格斗": 0.5, "飞行": 2, "地面": 0.5, "虫": 2, "钢": 0.5, "火": 2, "冰": 2},
        "虫": {
          "格斗": 0.5,
          "飞行": 0.5,
          "毒": 0.5,
          "幽灵": 0.5,
          "钢": 0.5,
          "火": 0.5,
          "草": 2,
          "超能力": 2,
          "恶": 2,
          "妖精": 0.5
        },
        "幽灵": {"幽灵": 2, "超能力": 2, "恶": 0.5, "一般": 0},
        "钢": {"岩石": 2, "钢": 0.5, "火": 0.5, "水": 0.5, "电": 0.5, "冰": 2, "妖精": 2},
        "火": {"岩石": 0.5, "虫": 2, "钢": 2, "火": 0.5, "水": 0.5, "草": 2, "冰": 2, "龙": 0.5},
        "水": {"地面": 2, "岩石": 2, "火": 2, "水": 0.5, "草": 0.5, "龙": 0.5},
        "草": {
          "飞行": 0.5,
          "毒": 0.5,
          "地面": 2,
          "岩石": 2,
          "虫": 0.5,
          "钢": 0.5,
          "火": 0.5,
          "水": 2,
          "草": 0.5,
          "龙": 0.5
        },
        "电": {"飞行": 2, "地面": 0, "水": 2, "草": 0.5, "电": 0.5, "龙": 0.5},
        "超能力": {"格斗": 2, "毒": 2, "钢": 0.5, "超能力": 0.5, "恶": 0},
        "冰": {"飞行": 2, "地面": 2, "岩石": 2, "钢": 0.5, "火": 0.5, "水": 0.5, "草": 2, "冰": 0.5, "龙": 2},
        "龙": {"钢": 0.5, "龙": 2, "妖精": 0},
        "恶": {"格斗": 0.5, "幽灵": 2, "超能力": 2, "恶": 0.5, "妖精": 0.5},
        "妖精": {"格斗": 2, "毒": 0.5, "钢": 0.5, "火": 0.5, "恶": 2, "龙": 2},
      };

      // 获取进攻属性对第一个防御属性的克制倍数
      let effectiveness1 = typeChart[attackType]?.[defenseType1] || 1;
      // 获取进攻属性对第二个防御属性的克制倍数，如果防御属性2为空，则按1倍算
      let effectiveness2 = defenseType2 ? typeChart[attackType]?.[defenseType2] || 1 : 1;

      // 计算最终的克制倍数
      let finalEffectiveness = effectiveness1 * effectiveness2;

      return finalEffectiveness === 1 ? '' : finalEffectiveness;
    }
  },
  mounted() {
  },
  onLoad({id}) {
    this.id = id;
    this.fetchPokemonDetails(id);
  }
};
</script>

<style lang="scss">
.ne-detail {
  min-height: 100vh;
  padding-top: 56px;
  background-color: #f5f5f5;

  .ne-kz {
    font-size: 24rpx;
    color: $uni-primary;
  }

  .kz-list {
    width: 100%;
    overflow: hidden;
  }

  .kz-li {
    float: left;
    width: 70rpx;
    height: 140rpx;
    background-color: #eee;
    margin-top: 10rpx;
    margin-right: 5rpx;
  }

  .kz-li-top {
    width: 70rpx;
    height: 70rpx;
    overflow: hidden;

    .kz-li-icon {
      margin: 15rpx;
    }
  }

  .kz-li-btn {
    width: 70rpx;
    height: 70rpx;
    line-height: 70rpx;
    text-align: center;
    font-size: 30rpx;
    color: $uni-primary;

    &.ruo {
      color: #007aff;
    }
  }

  .ne-main {
    padding: 0 24rpx 24rpx 24rpx;
  }

  .ne-block {
    width: 100%;
    border-radius: 20px;
    background-color: #fff;
    padding: 24rpx;

    .img {
      width: 300rpx;
      height: 300rpx;
    }

    .ne-li {
      overflow: hidden;

      .ne-left {
        font-size: 24rpx;
        color: #999;
        float: left;
        line-height: 50rpx;
        overflow: hidden;

        .l {
          width: 50rpx;
        }

        .r {
          width: 50rpx;
          text-align: right;
          color: #333;
        }

        .pas {
          height: 30rpx;
          margin-top: 10rpx;
          margin-left: 10rpx;
          border-radius: 10rpx;

          &.hp {
            background-color: #8AC654 !important;
          }

          &.attack {
            background-color: #F8CB3C !important;
          }

          &.defense {
            background-color: #D98837 !important;
          }

          &.spAtk {
            background-color: #59C3D0 !important;
          }

          &.spDef {
            background-color: #5890CD !important;
          }

          &.speed {
            background-color: #A456D0 !important;
          }

          &.total {
            background-color: #E3695A !important;
          }
        }
      }

      .ne-right {
        font-size: 28rpx;
        color: #333;
        float: right;
        display: flex;
        line-height: 50rpx;

        &.form-size {
          font-size: 24rpx;
          color: #999;
        }
      }
    }

    .ne-li + .ne-li {
      margin-top: 24rpx;
    }
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
      transform: rotate(90deg);

      &.menu {
        right: 20px;
        left: auto;
        transform: rotate(0deg);
      }
    }
  }
}
</style>
<template>
  <view class="ne-detail" v-if="pokemon">

    <view class="ne-top">
      <!--      <image class="icon menu" src="@/static/icon/collect.png"></image>-->


      <uni-transition :show="true" ref="ani" class="icon menu">
        <uni-icons @tap="toggleFavorite" :type="isFavorite?'star-filled':'star'" size="26"
                   color="#ff4d4d"></uni-icons>
      </uni-transition>


      <picker @change="bindPickerChange" :value="sliderIndex" :range="array" v-if="array.length>1">
        <image class="icon" src="@/static/icon/copy.png"></image>
      </picker>
      <view style="display: flex;justify-content: center;">
        <slider :data="menu" :width="90" v-model="sliderIndex" ref="slider" @change="change"></slider>
      </view>
    </view>

    <view v-if="!sliderIndex" class="ne-main">
      <view class="ne-block flex-center" @tap="paint=!paint">
        <image class="img" v-if="!paint" :src="thumb()"></image>
        <image class="img" v-if="paint" :src="thumb(true)"></image>
        <image class="img" v-if="paint" :src="thumb(true, true)"></image>
      </view>

      <view class="ne-block mt-10">
        <view class="ne-li">
          <view class="ne-left">
            {{ pokemon.no }}
          </view>
          <view class="ne-right">
            {{ pokemon.morphologyName || pokemon.cnName }} / {{ pokemon.jpName }} / {{ pokemon.enName }}
          </view>
        </view>
        <view class="ne-li" v-if="id<650">
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
        <view class="ne-li" v-if="pokemon.commonFeatures">
          <view class="ne-left">
            特性:
          </view>
          <view class="ne-right">
            <text style="color: #007aff" v-if="pokemon.commonFeatures[1]"
                  @tap="feature(pokemon.commonFeatures[1].cnName)">
              {{ pokemon.commonFeatures[1].cnName }}
            </text>
            <view style="width: 24rpx"></view>
            <text style="color: #007aff" @tap="feature(pokemon.commonFeatures[0].cnName)">{{
                pokemon.commonFeatures[0].cnName
              }}
            </text>
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


        <view class="ne-li">
          <view class="ne-left">
            蛋组:
          </view>
          <view class="ne-right">

            <text style="color: #007aff" v-if="pokemon.eggGroup[1]" @tap="eggGroup(pokemon.eggGroup[1])">
              {{ pokemon.eggGroup[1] }}
            </text>
            <view style="width: 24rpx"></view>
            <text style="color: #007aff" @tap="eggGroup(pokemon.eggGroup[0])">{{ pokemon.eggGroup[0] }}</text>

          </view>
        </view>


        <view class="ne-li">
          <view class="ne-left">
            分类:
          </view>
          <view class="ne-right">

            {{ pokemon.category }}

          </view>
        </view>
        <view class="ne-li">
          <view class="ne-left">
            身高:
          </view>
          <view class="ne-right">
            {{ pokemon.height }}
          </view>
        </view>
        <view class="ne-li">
          <view class="ne-left">
            体重:
          </view>
          <view class="ne-right">
            {{ pokemon.weight }}
          </view>
        </view>
        <view class="ne-li">
          <view class="ne-left">
            捕获度:
          </view>
          <view class="ne-right">
            {{ pokemon.catchRate || '—' }}
          </view>
        </view>
        <view class="ne-li">
          <view class="ne-left">
            初始亲密度:
          </view>
          <view class="ne-right">
            {{ pokemon.baseFriendship || '—' }}
          </view>
        </view>
        <view class="ne-li">
          <view class="ne-left">
            满级经验:
          </view>
          <view class="ne-right">
            {{ pokemon.maxExperience  || '—' }}
          </view>
        </view>
        <view class="ne-li">
          <view class="ne-left">
            努力值:
          </view>
          <view class="ne-right">
            {{ pokemon.effortValues  || '—' }}
          </view>
        </view>
        <view class="ne-li">
          <view class="ne-left">
            性别比例:
          </view>
          <view class="ne-right">
            {{ pokemon.gender }}
          </view>
        </view>


      </view>


      <view class="ne-block mt-10" v-if="upgrades && upgrades.length">

        <view v-for="(upgrade, a) in upgrades" class="pm-upgrade" :key="upgrade.title">
          <view class="pm-title">
            {{ upgrade.title }}
          </view>
          <view class="pm-item-list" v-if="upgrade.items && upgrade.items.length" v-for="item in upgrade.items"
                :key="item">
            <view class="pm-items" v-if="item && item.length" v-for="(i, m) in item" :key="i">
              <view class="pm-item flex-center">
                <image class="pm-image" :src="i.image" @tap="toPm" :data-data="i"></image>
              </view>
              <view class="pm-item-text center" v-if="i.upgradeInfo">
                {{ i.upgradeInfo }}
              </view>
              <view class="pm-item-text center" v-if="!i.upgradeInfo && upgrade.title === '超极巨化' && m===0">
                {{ i.upgradeInfo || '极巨化' }}
              </view>
            </view>
          </view>
        </view>

      </view>

    </view>

    <view class="ne-main" v-if="sliderIndex && skills && skills.length">
      <uni-collapse ref="collapse">
        <uni-collapse-item title="等级提升" :border="false">
          <view style="padding-bottom: 24rpx;overflow: hidden">
            <view class="th" v-for="item in skills.filter(r=>r.subTitle === '可学会的招式')" :key="item.name"
                  @tap="to(item)">
              <view class="v1">
                <text>{{ item.grade }}</text>
              </view>
              <view class="v1" style="color: #007aff;">
                {{ item.name }}
              </view>
              <view class="v1 v2">
                <view style="width: 60rpx">{{ item.power }}</view>
                <attributeTag :name="item.attribute" class="tag" v-if="item.attribute"></attributeTag>
                <image src="@/static/Physicalmove.png" alt="" class="image" v-if="item.category==='物理'"/>
                <image src="@/static/Specialmove.png" alt="" class="image" v-if="item.category==='特殊'"/>
                <image src="@/static/Statusmove.png" alt="" class="image" v-if="item.category==='变化'"/>

              </view>
            </view>
          </view>
        </uni-collapse-item>
      </uni-collapse>
      <uni-collapse ref="collapse" class="mt-10">
        <uni-collapse-item title="招式学习器" :border="false">
          <view style="padding-bottom: 24rpx;overflow: hidden">
            <view class="th" v-for="item in skills.filter(r=>r.subTitle === '能使用的招式学习器')" :key="item.name"
                  @tap="to(item)">
              <view class="v1">
                <text>{{ item.grade }}</text>
              </view>
              <view class="v1" style="color: #007aff;">
                {{ item.name }}
              </view>
              <view class="v1 v2">
                <view style="width: 60rpx">{{ item.power }}</view>
                <attributeTag :name="item.attribute" class="tag" v-if="item.attribute"></attributeTag>
                <image src="@/static/Physicalmove.png" alt="" class="image" v-if="item.category==='物理'"/>
                <image src="@/static/Specialmove.png" alt="" class="image" v-if="item.category==='特殊'"/>
                <image src="@/static/Statusmove.png" alt="" class="image" v-if="item.category==='变化'"/>

              </view>
            </view>
          </view>
        </uni-collapse-item>
      </uni-collapse>
      <uni-collapse ref="collapse" class="mt-10">
        <uni-collapse-item title="蛋招式" :border="false">
          <view style="padding-bottom: 24rpx;overflow: hidden">
            <view class="th" v-for="item in skills.filter(r=>r.subTitle === '蛋招式')" :key="item.name"
                  @tap="to(item)">
              <view class="v1">
                <text>{{ item.grade }}</text>
              </view>
              <view class="v1" style="color: #007aff;">
                {{ item.name }}
              </view>
              <view class="v1 v2">
                <view style="width: 60rpx">{{ item.power }}</view>
                <attributeTag :name="item.attribute" class="tag" v-if="item.attribute"></attributeTag>
                <image src="@/static/Physicalmove.png" alt="" class="image" v-if="item.category==='物理'"/>
                <image src="@/static/Specialmove.png" alt="" class="image" v-if="item.category==='特殊'"/>
                <image src="@/static/Statusmove.png" alt="" class="image" v-if="item.category==='变化'"/>

              </view>
            </view>
          </view>
        </uni-collapse-item>
      </uni-collapse>
    </view>

    <view style="width: 100%" v-if="platform==='mp-weixin'">
      <!-- #ifdef MP-WEIXIN -->
      <ad unit-id="adunit-4322de44f112529c"></ad>
      <!-- #endif -->
    </view>
    <view style="width: 100%" v-if="platform==='mp-qq'">
      <!-- #ifdef MP-QQ -->
      <ad unit-id="27d0bf0fca1897c57355f3e74e301bfc"></ad>
      <!-- #endif -->
    </view>

    <view style="height: 50rpx"></view>

  </view>
</template>

<script>
import {
  getAbilityList, getList,
  getPokemonDetails,
  getPokemonDetailsForms,
  getPokemonDetailsSkills,
  getPokemonDetailsUpgrades
} from '../../server/index';
import slider from "../../components/slider.vue";
import attributeTag from "../../components/attributeTag.vue";
import {attributes, attributeToId} from "../../utils";

export default {
  components: {attributeTag, slider},
  onShareAppMessage: function () {
    return {
      title: '精灵宝可梦',
      path: '/pages/list/list'
    }
  },
  data() {
    const platform = uni.getSystemInfoSync().uniPlatform;
    console.log({platform});
    return {
      isFavorite: false,
      value: [],
      array: [],
      platform,
      sliderIndex: 0,
      upgrades: [],
      skills: [],
      paint: false,
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
    toPm(e) {
      let name = e.target.dataset.data.name;
      console.log(name, this.forms);
      if (this.forms.find(f => f.morphologyName === name)) {
        const value = this.forms.findIndex(f => f.morphologyName === name);
        this.bindPickerChange({detail: {value}});

        return;
      }
      name = name.replace('[阿罗拉]', '').trim();
      uni.showLoading();
      getList({page: 1, per_page: 10, name}).then(res => {
        if (!res.data.result.length) return uni.showToast({title: '未找到该宝可梦', icon: 'none'});
        let i = res.data.result.length - 1;
        uni.hideLoading();
        uni.navigateTo({
          url: '/pages/detail/detail?id=' + res.data.result[i].id
        })
      })
    },
    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
      let favorite = uni.getStorageSync('favorite');

      if (this.isFavorite) {
        this.$refs.ani.step({
          scale: '1.5',
          rotate: '180'
        })
        this.$refs.ani.step({
              scale: '1',
              rotate: '0'
            },
            {
              timingFunction: 'ease-in',
              duration: 200
            })
        // 开始执行动画
        this.$refs.ani.run(() => {
          favorite = favorite ? [...favorite, this.id] : [this.id];
          uni.setStorageSync('favorite', favorite);
          uni.showToast({
            title: '已添加到收藏',
            icon: 'success'
          });
        })
      } else {
        favorite = favorite.filter(r => r !== this.id);
        uni.setStorageSync('favorite', favorite);
      }
    },
    bindPickerChange(e) {
      console.log(e.detail.value);
      this.showIndex = parseInt(e.detail.value);
      this.pokemon = {...this.pokemon, ...this.forms[this.showIndex]};

      this.pokemon.commonFeature = this.pokemon.commonFeature.split(',').map(s => s.trim())
      this.pokemon.eggGroup = this.pokemon.eggGroup.split(',').map(s => s.trim());

      uni.pageScrollTo({
        scrollTop: 0,
        duration: 300  // 滚动动画时长，单位ms
      });

    },
    to(item) {
      uni.navigateTo({
        url: '/subPages/skill/skill?id=' + item.skillId,
      });
    },
    change() {
      this.sliderIndex = this.$refs.slider.index;

      if (this.skills && this.skills.length) return;

      console.log(this.$refs.slider.index);
      uni.showLoading();
      getPokemonDetailsSkills(this.id).then(res => {
        // console.log(res);
        this.skills = res.data
        uni.hideLoading();
      })
    },
    attributeToId,
    eggGroup(egg) {
      uni.navigateTo({
        url: '/subPages/eggs/eggs?egg=' + egg,
      });
    },
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
    thumb(paint, dodge) {

      if (paint) {

        return dodge ? this.forms[this.showIndex].simage : this.forms[this.showIndex].pimage;
      }

      if (this.forms && this.forms.length) return this.forms[this.showIndex].hdImage;
      // if (id <= 649) {
      //   return `https://s1.52poke.com/assets/sprite/gen5/${id < 10 ? '00' + id : id < 100 ? '0' + id : id}s.gif`
      // } else
      return `https://pokepast.es/img/pokemon/${this.inter(this.id)}-0.png`
    },
    async fetchPokemonDetails(id) {
      try {
        this.pokemon = (await getPokemonDetails(id)).data;
        console.log('Pokemon details:', this.pokemon);

        uni.setNavigationBarTitle({
          title: this.pokemon.cnName || this.pokemon.name
        });

        this.forms = (await getPokemonDetailsForms(id)).data
        this.bindPickerChange({detail: {value: 0}});
        this.array = this.forms.map(item => item.morphologyName);
        this.upgrades = (await getPokemonDetailsUpgrades(id)).data;
        console.log('Upgrades:', this.upgrades);


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
    let favorite = uni.getStorageSync('favorite');
    if (favorite && favorite.indexOf(id) !== -1) {
      this.isFavorite = true;
    }
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

    .uni-collapse-item-border {
      border: 0 !important;
    }

    .uni-collapse {
      margin-top: 24rpx;
      border-radius: 20rpx;
      overflow: hidden;
    }

    .th {
      height: 80rpx;
      display: flex;
      margin-bottom: 12rpx;

      .v1 {
        width: 25%;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        font-size: 24rpx;
        color: #333;
        display: flex;
        justify-content: center;
        align-items: center;

        &.v2 {
          width: 50%;
        }

        .img {
          width: 80rpx;
          height: 80rpx;
          margin-right: 12rpx;
        }

        .image {
          height: 40rpx;
          width: 70rpx;
          margin-left: 20rpx;
          display: inline-block;
          transform: translateY(5rpx);
        }

        &.active {
          color: $uni-primary;
        }
      }
    }

  }

  .ne-block {
    width: 100%;
    border-radius: 20px;
    background-color: #fff;
    padding: 24rpx;

    .pm-item-list + .pm-item-list {
      margin-top: 24rpx;
      border-top: 1px solid #eee;
      padding-top: 24rpx;
    }

    .pm-image {
      width: 100rpx;
      height: 100rpx;
    }

    .pm-upgrade + .pm-upgrade {
      margin-top: 48rpx;
    }


    .pm-title {
      font-size: 30rpx;
      fwight: 500;
    }

    .pm-item-text {
      font-size: 24rpx;
      color: #333;
      margin: 24rpx 0;
    }

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
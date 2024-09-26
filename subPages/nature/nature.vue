<template>
  <view class="ne-nature">
    <uni-table className="at-c a-c bd-神奇宝贝百科 bg-神奇宝贝百科 sortable roundy jquery-tablesorter">

      <uni-tr className="bgl-神奇宝贝百科">
        <uni-th className="roundytl-5 headerSort" width="100" tabindex="0" role="columnheader button" align="left">性格
        </uni-th>
        <uni-th width="100" className="headerSort" tabindex="0" role="columnheader button" align="center">容易成长的能力
        </uni-th>
        <uni-th width="100" className="headerSort" tabindex="0" role="columnheader button" align="center">不容易成长的能力
        </uni-th>
        <uni-th width="100" className="headerSort" tabindex="0" role="columnheader button" align="center">喜欢的口味
        </uni-th>
        <uni-th className="roundytr-5 headerSort" width="100" tabindex="0" role="columnheader button" align="center">
          不喜欢的口味
        </uni-th>
      </uni-tr>
      <uni-tr className="bgwhite">
        <uni-th>勤奋
        </uni-th>
        <uni-td>—
        </uni-td>
        <uni-td>—
        </uni-td>
        <uni-td>—
        </uni-td>
        <uni-td>—
        </uni-td>
      </uni-tr>
      <uni-tr className="bgwhite">
        <uni-th>怕寂寞
        </uni-th>
        <uni-td className="'bgl-1'">攻击
        </uni-td>
        <uni-td className="bgl-3">防御
        </uni-td>
        <uni-td className="bgl-辣">辣
        </uni-td>
        <uni-td className="bgl-酸">酸
        </uni-td>
      </uni-tr>
      <uni-tr className="bgwhite">
        <uni-th>固执
        </uni-th>
        <uni-td className="bgl-1">攻击
        </uni-td>
        <uni-td className="bgl-2">特攻
        </uni-td>
        <uni-td className="bgl-辣">辣
        </uni-td>
        <uni-td className="bgl-澀">涩
        </uni-td>
      </uni-tr>
      <uni-tr className="bgwhite">
        <uni-th>顽皮
        </uni-th>
        <uni-td className="bgl-1">攻击
        </uni-td>
        <uni-td className="bgl-4">特防
        </uni-td>
        <uni-td className="bgl-辣">辣
        </uni-td>
        <uni-td className="bgl-苦">苦
        </uni-td>
      </uni-tr>
      <uni-tr className="bgwhite">
        <uni-th>勇敢
        </uni-th>
        <uni-td className="bgl-1">攻击
        </uni-td>
        <uni-td className="bgl-5">速度
        </uni-td>
        <uni-td className="bgl-辣">辣
        </uni-td>
        <uni-td className="bgl-甜">甜
        </uni-td>
      </uni-tr>
      <uni-tr className="bgwhite">
        <uni-th>大胆
        </uni-th>
        <uni-td className="bgl-3">防御
        </uni-td>
        <uni-td className="bgl-1">攻击
        </uni-td>
        <uni-td className="bgl-酸">酸
        </uni-td>
        <uni-td className="bgl-辣">辣
        </uni-td>
      </uni-tr>
      <uni-tr className="bgwhite">
        <uni-th>坦率
        </uni-th>
        <uni-td>—
        </uni-td>
        <uni-td>—
        </uni-td>
        <uni-td>—
        </uni-td>
        <uni-td>—
        </uni-td>
      </uni-tr>
      <uni-tr className="bgwhite">
        <uni-th>淘气
        </uni-th>
        <uni-td className="bgl-3">防御
        </uni-td>
        <uni-td className="bgl-2">特攻
        </uni-td>
        <uni-td className="bgl-酸">酸
        </uni-td>
        <uni-td className="bgl-澀">涩
        </uni-td>
      </uni-tr>
      <uni-tr className="bgwhite">
        <uni-th>乐天
        </uni-th>
        <uni-td className="bgl-3">防御
        </uni-td>
        <uni-td className="bgl-4">特防
        </uni-td>
        <uni-td className="bgl-酸">酸
        </uni-td>
        <uni-td className="bgl-苦">苦
        </uni-td>
      </uni-tr>
      <uni-tr className="bgwhite">
        <uni-th>悠闲
        </uni-th>
        <uni-td className="bgl-3">防御
        </uni-td>
        <uni-td className="bgl-5">速度
        </uni-td>
        <uni-td className="bgl-酸">酸
        </uni-td>
        <uni-td className="bgl-甜">甜
        </uni-td>
      </uni-tr>
      <uni-tr className="bgwhite">
        <uni-th>内敛
        </uni-th>
        <uni-td className="bgl-2">特攻
        </uni-td>
        <uni-td className="bgl-1">攻击
        </uni-td>
        <uni-td className="bgl-澀">涩
        </uni-td>
        <uni-td className="bgl-辣">辣
        </uni-td>
      </uni-tr>
      <uni-tr className="bgwhite">
        <uni-th>慢吞吞
        </uni-th>
        <uni-td className="bgl-2">特攻
        </uni-td>
        <uni-td className="bgl-3">防御
        </uni-td>
        <uni-td className="bgl-澀">涩
        </uni-td>
        <uni-td className="bgl-酸">酸
        </uni-td>
      </uni-tr>
      <uni-tr className="bgwhite">
        <uni-th>害羞
        </uni-th>
        <uni-td>—
        </uni-td>
        <uni-td>—
        </uni-td>
        <uni-td>—
        </uni-td>
        <uni-td>—
        </uni-td>
      </uni-tr>
      <uni-tr className="bgwhite">
        <uni-th>马虎
        </uni-th>
        <uni-td className="bgl-2">特攻
        </uni-td>
        <uni-td className="bgl-4">特防
        </uni-td>
        <uni-td className="bgl-澀">涩
        </uni-td>
        <uni-td className="bgl-苦">苦
        </uni-td>
      </uni-tr>
      <uni-tr className="bgwhite">
        <uni-th>冷静
        </uni-th>
        <uni-td className="bgl-2">特攻
        </uni-td>
        <uni-td className="bgl-5">速度
        </uni-td>
        <uni-td className="bgl-澀">涩
        </uni-td>
        <uni-td className="bgl-甜">甜
        </uni-td>
      </uni-tr>
      <uni-tr className="bgwhite">
        <uni-th>温和
        </uni-th>
        <uni-td className="bgl-4">特防
        </uni-td>
        <uni-td className="bgl-1">攻击
        </uni-td>
        <uni-td className="bgl-苦">苦
        </uni-td>
        <uni-td className="bgl-辣">辣
        </uni-td>
      </uni-tr>
      <uni-tr className="bgwhite">
        <uni-th>温顺
        </uni-th>
        <uni-td className="bgl-4">特防
        </uni-td>
        <uni-td className="bgl-3">防御
        </uni-td>
        <uni-td className="bgl-苦">苦
        </uni-td>
        <uni-td className="bgl-酸">酸
        </uni-td>
      </uni-tr>
      <uni-tr className="bgwhite">
        <uni-th>慎重
        </uni-th>
        <uni-td className="bgl-4">特防
        </uni-td>
        <uni-td className="bgl-2">特攻
        </uni-td>
        <uni-td className="bgl-苦">苦
        </uni-td>
        <uni-td className="bgl-澀">涩
        </uni-td>
      </uni-tr>
      <uni-tr className="bgwhite">
        <uni-th>浮躁
        </uni-th>
        <uni-td>—
        </uni-td>
        <uni-td>—
        </uni-td>
        <uni-td>—
        </uni-td>
        <uni-td>—
        </uni-td>
      </uni-tr>
      <uni-tr className="bgwhite">
        <uni-th>自大
        </uni-th>
        <uni-td className="bgl-4">特防
        </uni-td>
        <uni-td className="bgl-5">速度
        </uni-td>
        <uni-td className="bgl-苦">苦
        </uni-td>
        <uni-td className="bgl-甜">甜
        </uni-td>
      </uni-tr>
      <uni-tr className="bgwhite">
        <uni-th>胆小
        </uni-th>
        <uni-td className="bgl-5">速度
        </uni-td>
        <uni-td className="bgl-1">攻击
        </uni-td>
        <uni-td className="bgl-甜">甜
        </uni-td>
        <uni-td className="bgl-辣">辣
        </uni-td>
      </uni-tr>
      <uni-tr className="bgwhite">
        <uni-th>急躁
        </uni-th>
        <uni-td className="bgl-5">速度
        </uni-td>
        <uni-td className="bgl-3">防御
        </uni-td>
        <uni-td className="bgl-甜">甜
        </uni-td>
        <uni-td className="bgl-酸">酸
        </uni-td>
      </uni-tr>
      <uni-tr className="bgwhite">
        <uni-th>爽朗
        </uni-th>
        <uni-td className="bgl-5">速度
        </uni-td>
        <uni-td className="bgl-2">特攻
        </uni-td>
        <uni-td className="bgl-甜">甜
        </uni-td>
        <uni-td className="bgl-澀">涩
        </uni-td>
      </uni-tr>
      <uni-tr className="bgwhite">
        <uni-th>天真
        </uni-th>
        <uni-td className="bgl-5">速度
        </uni-td>
        <uni-td className="bgl-4">特防
        </uni-td>
        <uni-td className="bgl-甜">甜
        </uni-td>
        <uni-td className="bgl-苦">苦
        </uni-td>
      </uni-tr>
      <uni-tr className="bgwhite">
        <uni-th className="roundybl-5">认真
        </uni-th>
        <uni-td>—
        </uni-td>
        <uni-td>—
        </uni-td>
        <uni-td>—
        </uni-td>
        <uni-td className="roundybr-5">—
        </uni-td>
      </uni-tr>
    </uni-table>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss">
.ne-nature {
  width: 100%;
  padding-bottom: 50rpx;

  .uni-table-th {
    color: #333;
    font-size: 26rpx;
    font-weight: bold;
  }

  .uni-table-td {
    text-align: center !important;
    font-size: 24rpx;
  }

  .bgl-1 {
    background-color: #FAE192;
  }

  .bgl-2 {
    background-color: #FBB977;
  }

  .bgl-3 {
    background-color: #A2D4DA;
  }

  .bgl-4 {
    background-color: #89A9CD !important;
  }

  .bgl-5 {
    background-color: #C39CD8 !important;
  }
}
</style>

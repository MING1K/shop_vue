<template>
  <div class="trade-container">
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">收件人信息</h5>
      <div
        class="address clearFix"
        v-for="(add, index) in addressList"
        :key="index"
        @click="changeDefaultAddress(add.id)"
      >
        <span class="username" :class="{ selected: add.isDefault === 1 }">{{
          add.consignee
        }}</span>
        <p>
          <span class="s1">{{ add.fullAddress }}</span>
          <span class="s2">{{ add.phoneNum }}</span>
          <span class="s3 active" v-show="add.isDefault === 1">默认地址</span>
        </p>
      </div>
      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span
          class="username"
          :class="{ selected: way.isDefault === 1 }"
          style="margin-right: 5px"
          v-for="(way, index) in payWay"
          :key="index"
          @click="changeCheckedPayWay(way.code)"
          >{{ way.name }}</span
        >
      </div>
      <div class="line"></div>
      <h5 class="pay">配送方式</h5>
      <div>
        <div
          class="address clearFix"
          v-for="(tran, index) in transWay"
          :key="index"
          @click="changeDefaultTrans(tran.code)"
        >
          <span
            class="username"
            style="margin-right: 20px"
            :class="{ selected: tran.isDefault }"
            >{{ tran.name }}
          </span>
          <p>
            <span>配送时间：{{ tran.time }}</span>
          </p>
        </div>
      </div>

      <div class="line"></div>

      <h5 class="pay">送货清单</h5>
      <div class="detail">
        <!-- <h5>商品清单</h5> -->
        <ul
          class="list clearFix"
          v-for="(good, index) in tradeList"
          :key="index"
        >
          <li>
            <img v-lazy="good.imgUrl" class="good-img" :alt="good.skuName" />
          </li>
          <li style="width: 40%">
            <p>{{ good.skuName }}</p>
            <h4>7天无理由退货</h4>
          </li>
          <li>
            <h3>￥{{ good.orderPrice }}</h3>
          </li>
          <li>X{{ good.skuNum }}</li>
          <li>有货</li>
        </ul>
      </div>
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea
          placeholder="建议留言前先与商家沟通确认"
          class="remarks-cont"
          v-model="remark"
        ></textarea>
      </div>
      <div class="line"></div>
      <div class="bill">
        <h5>发票信息：</h5>
        <div>普通发票（电子） 个人 明细</div>
        <h5>使用优惠/抵用</h5>
      </div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b
            >共 <i>{{ totalNum }}</i> 件商品，总商品金额</b
          ><span>¥{{ totalAmount }}</span>
        </li>
        <li>
          <b>返现：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>运费：</b>
          <span>0.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">
        应付金额：<span>¥{{ totalAmount }}</span>
      </div>
      <div class="receiveInfo">
        寄送至：<span>{{ userDefaultAddress.fullAddress }}</span
        ><br />
        收货人：<span>{{ userDefaultAddress.consignee }}</span
        ><br />
        联系方式：<span>{{ userDefaultAddress.phoneNum }}</span>
      </div>
    </div>
    <div class="sub clearFix">
      <a class="subBtn" @click="submitOrder">提交订单</a>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "Trade",
  data() {
    return {
      remark: "",
      orderId: '',
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    ...mapGetters("trade", ["tradeList", "totalNum", "totalAmount"]),
    ...mapState("trade", ["addressList", "payWay", "transWay", "orderInfo"]),
    userDefaultAddress() {
      return (
        (this.addressList || []).find((item) => item.isDefault === 1) || {}
      );
    },
    checkedPayWay() {
      return (this.payWay || []).find((item) => item.isDefault === 1) || {};
    },
    checkedTransWay() {
      return (this.transWay || []).find((item) => item.isDefault === 1) || {};
    },
  },
  methods: {
    async init() {
      try {
        await this.$store.dispatch("trade/getUserAddress");
        await this.$store.dispatch("trade/getOrderInfo");
      } catch (err) {
        this.$message.error(err);
      }
    },
    changeDefaultAddress(id) {
      (this.addressList || []).forEach((item) => {
        if (item.id === id) item.isDefault = 1;
        else item.isDefault = 0;
      });
    },
    changeCheckedPayWay(code) {
      (this.payWay || []).forEach((item) => {
        if (item.code === code) item.isDefault = 1;
        else item.isDefault = 0;
      });
    },
    changeDefaultTrans(code) {
      (this.transWay || []).forEach((item) => {
        if (item.code === code) item.isDefault = 1;
        else item.isDefault = 0;
      });
    },
    async submitOrder() {
      let tradeNo = this.orderInfo.tradeNo;
      let data = {
        consignee: this.userDefaultAddress.consignee,
        consigneeTel: this.userDefaultAddress.phoneNum,
        deliveryAddress: this.userDefaultAddress.fullAddress,
        paymentway: this.checkedPayWay.code,
        orderComment: this.remark,
        orderDetailList: this.tradeList,
      }
      try {
        let result = await this.$API.reqSubmitOrder(tradeNo, data);
        if (result.code === 200) {
          this.orderId = result.data;
          this.$router.push('/pay?orderId=' + this.orderId);
        } else {
          this.$message.error(result.message);
        }
      } catch (err) {
        this.$message.error(err);
      }
    }
  },
};
</script>

<style lang="less" scoped>
.good-img {
  width: 100px;
  height: 100px;
}
.trade-container {
  .title {
    width: 1200px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 21px;
  }

  .content {
    width: 1200px;
    margin: 10px auto 0;
    border: 1px solid rgb(221, 221, 221);
    padding: 25px;
    box-sizing: border-box;

    .receive,
    .pay {
      line-height: 36px;
      margin: 18px 0;
    }

    .address {
      padding-left: 20px;
      margin-bottom: 15px;

      .username {
        float: left;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ddd;
        position: relative;
        cursor: pointer;
      }

      .username::after {
        content: "";
        display: none;
        width: 13px;
        height: 13px;
        position: absolute;
        right: 0;
        bottom: 0;
        background: url(~@/assets/images/choosed.png) no-repeat;
      }

      .username.selected {
        border-color: #e1251b;
      }

      .username.selected::after {
        display: block;
      }

      p {
        width: 610px;
        float: left;
        line-height: 30px;
        margin-left: 10px;
        padding-left: 5px;
        cursor: pointer;

        .s1 {
          float: left;
        }

        .s2 {
          float: left;
          margin: 0 5px;
        }

        .s3 {
          display: none;
          float: left;
          width: 56px;
          height: 24px;
          line-height: 24px;
          margin-left: 10px;
          background-color: #878787;
          color: #fff;
          margin-top: 3px;
          text-align: center;
        }
        .s3:hover {
          display: block;
          background-color: #ff4949;
        }
        .active {
          display: block;
          background-color: #ff4949;
        }
      }

      p:hover {
        background-color: #ddd;
      }
    }

    .line {
      height: 1px;
      background-color: #ddd;
    }

    .way {
      width: 1080px;
      height: 110px;
      background: #f4f4f4;
      padding: 15px;
      margin: 0 auto;

      h5 {
        line-height: 50px;
      }

      .info {
        margin-top: 20px;

        .s1 {
          float: left;
          border: 1px solid #ddd;
          width: 120px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin-right: 10px;
        }

        p {
          line-height: 30px;
        }
      }
    }

    .detail {
      width: 1080px;

      background: #feedef;
      padding: 15px;
      margin: 10px auto 0;

      h5 {
        line-height: 50px;
      }

      .list {
        display: flex;
        justify-content: space-between;

        li {
          line-height: 30px;
          width: 15%;
          p {
            margin-bottom: 20px;
          }

          h4 {
            color: #c81623;
            font-weight: 400;
          }

          h3 {
            color: #e12228;
          }
        }
      }
    }

    .bbs {
      margin-bottom: 15px;

      h5 {
        line-height: 50px;
      }

      textarea {
        width: 100%;
        border-color: #e4e2e2;
        line-height: 1.8;
        outline: none;
        resize: none;
      }
    }

    .bill {
      h5 {
        line-height: 50px;
      }

      div {
        padding-left: 15px;
      }
    }
  }

  .money {
    width: 1200px;
    margin: 20px auto;

    ul {
      width: 220px;
      float: right;

      li {
        line-height: 30px;
        display: flex;
        justify-content: space-between;

        i {
          color: red;
        }
      }
    }
  }

  .trade {
    box-sizing: border-box;
    width: 1200px;
    padding: 10px;
    margin: 10px auto;
    text-align: right;
    background-color: #f4f4f4;
    border: 1px solid #ddd;

    div {
      line-height: 30px;
    }

    .price span {
      color: #e12228;
      font-weight: 700;
      font-size: 14px;
    }

    .receiveInfo {
      color: #999;
    }
  }

  .sub {
    width: 1200px;
    margin: 0 auto 10px;

    .subBtn {
      float: right;
      width: 164px;
      height: 56px;
      font: 700 18px "微软雅黑";
      line-height: 56px;
      text-align: center;
      color: #fff;
      background-color: #e1251b;
    }
  }
}
</style>
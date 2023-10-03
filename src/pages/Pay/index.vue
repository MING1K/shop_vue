<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info"
            >订单提交成功，请您及时付款，以便尽快为您发货~~</span
          >
        </h4>
        <div class="paymark">
          <span class="fl"
            >请您在提交订单<em class="orange time">4小时</em
            >之内完成支付，超时订单会自动取消。订单号：<em>{{
              payInfo.orderId
            }}</em></span
          >
          <span class="fr"
            ><em class="lead">应付金额：</em
            ><em class="orange money">￥{{ payInfo.totalFee }}</em></span
          >
        </div>
      </div>
      <!-- <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>
            尚品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。
          </li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
          <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
        </ol>
        <h4>
          支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）
        </h4>
        <ul>
          <li>支付帐号：11111111</li>
          <li>密码：111111</li>
          <li>支付密码：111111</li>
        </ul>
      </div> -->
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="@/assets/images/pay/pay2.jpg" /></li>
            <li class="selected">
              <img src="@/assets/images/pay/pay3.jpg" alt="weixin" />
            </li>
          </ul>
        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="@/assets/images/pay/pay10.jpg" /></li>
              <li><img src="@/assets/images/pay/pay11.jpg" /></li>
              <li><img src="@/assets/images/pay/pay12.jpg" /></li>
              <li><img src="@/assets/images/pay/pay13.jpg" /></li>
              <li><img src="@/assets/images/pay/pay14.jpg" /></li>
              <li><img src="@/assets/images/pay/pay15.jpg" /></li>
              <li><img src="@/assets/images/pay/pay16.jpg" /></li>
              <li><img src="@/assets/images/pay/pay17.jpg" /></li>
              <li><img src="@/assets/images/pay/pay18.jpg" /></li>
              <li><img src="@/assets/images/pay/pay19.jpg" /></li>
              <li><img src="@/assets/images/pay/pay20.jpg" /></li>
              <li><img src="@/assets/images/pay/pay21.jpg" /></li>
              <li><img src="@/assets/images/pay/pay22.jpg" /></li>
            </ul>
          </div>
        </div>
        <div class="hr"></div>

        <div class="submit">
          <a class="btn" @click="onPayment">立即支付</a>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span><a href="weixinpay.html" target="_blank">微信支付</a></span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  name: "Pay",
  data() {
    return {
      payInfo: {},
      timer: null,
      // 支付的状态码
      code: null,
    };
  },
  computed: {
    orderId() {
      return this.$route.query.orderId;
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      let result = await this.$API.reqPayInfo(this.orderId);
      if (result.code === 200) {
        this.payInfo = result.data;
      } else {
        this.$message.error(result.message);
      }
    },
    async onPayment() {
      let url = await QRCode.toDataURL(this.payInfo.codeUrl);
      this.$confirm(`<img src="${url}"></img>`, "请使用微信支付", {
        dangerouslyUseHTMLString: true,
        center: true,
        showCancelButton: true,
        cancelButtonText: "支付遇见问题",
        confirmButtonText: "已完成支付",
        showClose: false,
        // beforeClose: (action, instance, done) => {
        //   //在消息盒子关闭之前会触发
        //   //action参数:可以区分用户点击的是取消【cancel】、确定【confirm】
        //   //instance参数:当前消息框组件VC
        //   //done参数：是一个函数,函数可以关闭消息盒子
        //   if (action == "confirm" && this.code == 200) {
        //     //清除定时器
        //     clearInterval(this.timer);
        //     //关闭盒子
        //     done();
        //     //路由跳转
        //     this.$router.push("/paysuccess");
        //   } else if (action == "cancel" && this.code != 200) {
        //     //清除定时器
        //     clearInterval(this.timer);
        //     //关闭盒子
        //     done();
        //     this.$message.error("支付遇见问题请联系xxxx");
        //   }
        // },
      })
        .then(() => {
          clearInterval(this.timer);
          this.timer = null;
          this.$router.push("/paysuccess");
          // 测试，不进行付款
          // this.checkPaySuccess();
          return;
        })
        .catch(() => {
          clearInterval(this.timer);
          this.timer = null;
          this.$message.warning("已取消支付!");
          return;
        });
      this.checkPay();
    },
    async checkPaySuccess() {
      let result = await this.$API.reqPayStatus(this.payInfo.orderId);
      if (result.code === 200) {
        // 提示
        this.$confirm(`<img src=${require("@/assets/images/pay/right.png")}></img>`, "支付成功", {
            dangerouslyUseHTMLString: true,
            center: true,
            showConfirmButton: false,
            showCancelButton: false,
          });
        this.code = result.code;
        // 跳转路由
        setTimeout(() => {
          this.$router.push("/paysuccess");
        }, 1000);
      } else {
        this.$message.warning("未成功支付");
      }
    },
    checkPay() {
      clearInterval(this.timer);
      this.timer = null;
      this.timer = setInterval(async () => {
        let result = await this.$API.reqPayStatus(this.payInfo.orderId || 'error');
        if (result.code === 200) {
          this.$msgbox.close();
          // 提示
          this.$confirm(
            `<img src=${require("@/assets/images/pay/right.png")}></img>`,
            "支付成功",
            {
              dangerouslyUseHTMLString: true,
              center: true,
              showConfirmButton: false,
              showCancelButton: false,
            }
          );
          // 清除定时器
          clearInterval(this.timer);
          this.timer = null;
          // 保存支付成功返回的状态码
          this.code = result.code;
          // 跳转路由
          setTimeout(() => {
            this.$msgbox.close();
            this.$router.push("/paysuccess");
          }, 1000);
          // 关闭弹出框
        } else {
          console.log(result.message);
        }
      }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
.pay-main {
  margin-bottom: 20px;

  .pay-container {
    margin: 0 auto;
    width: 1200px;

    a:hover {
      color: #4cb9fc;
    }

    .orange {
      color: #e1251b;
    }

    .money {
      font-size: 18px;
    }

    .zfb {
      color: #e1251b;
      font-weight: 700;
    }

    .checkout-tit {
      padding: 10px;

      .tit-txt {
        font-size: 14px;
        line-height: 21px;

        .success-icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          background: url(~@/assets/images/pay/payicon.png) no-repeat 0 0;
        }

        .success-info {
          padding: 0 8px;
          line-height: 30px;
          vertical-align: top;
        }
      }

      .paymark {
        overflow: hidden;
        line-height: 26px;
        text-indent: 38px;

        .fl {
          float: left;
        }

        .fr {
          float: right;

          .lead {
            margin-bottom: 18px;
            font-size: 15px;
            font-weight: 400;
            line-height: 22.5px;
          }
        }
      }
    }

    .checkout-info {
      padding-left: 25px;
      padding-bottom: 15px;
      margin-bottom: 10px;
      border: 2px solid #e1251b;

      h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
        color: #e1251b;
      }

      ol {
        padding-left: 25px;
        list-style-type: decimal;
        line-height: 24px;
        font-size: 14px;
      }

      ul {
        padding-left: 25px;
        list-style-type: disc;
        line-height: 24px;
        font-size: 14px;
      }
    }

    .checkout-steps {
      border: 1px solid #ddd;
      padding: 25px;

      .hr {
        height: 1px;
        background-color: #ddd;
      }

      .step-tit {
        line-height: 36px;
        margin: 15px 0;
      }

      .step-cont {
        margin: 0 10px 12px 20px;

        ul {
          font-size: 0;

          li {
            margin: 2px;
            display: inline-block;
            padding: 5px 20px;
            border: 1px solid #ddd;
            cursor: pointer;
            line-height: 18px;
          }
          .selected {
            border: 1px solid #e1251b;
          }
        }
      }
    }

    .submit {
      text-align: center;

      .btn {
        display: inline-block;
        padding: 15px 45px;
        margin: 15px 0 10px;
        font: 18px "微软雅黑";
        font-weight: 700;
        border-radius: 0;
        background-color: #e1251b;
        border: 1px solid #e1251b;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
      }
    }
  }
}
</style>
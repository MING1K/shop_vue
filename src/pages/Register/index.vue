<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去<router-link to="/login">登录</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <!-- <input type="text" v-model="phone" placeholder="请输入你的手机号" />
        <span class="error-msg">错误提示信息</span> -->
        <input
          placeholder="请输入你的手机号"
          v-model="phone"
          name="phone"
          v-validate="{ required: true, regex: /^1\d{10}$/ }"
          :class="{ invalid: errors.has('phone') }"
        />
        <span class="error-msg">{{ errors.first("phone") }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input
          placeholder="请输入验证码"
          v-model="confirmCode"
          name="confirmCode"
          v-validate="{ required: true, regex: /^[0-9]{6}$/ }"
          :class="{ invalid: errors.has('confirmCode') }"
        />
        <button style="width: 100px; height: 40px" @click="getConfirmCode">
          获取验证码
        </button>
        <span class="error-msg">{{ errors.first("confirmCode") }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          type="password"
          placeholder="请输入你的登录密码"
          v-model="password"
          name="password"
          v-validate="{ required: true, regex: /^[0-9A-Za-z]{8,20}$/ }"
          :class="{ invalid: errors.has('password') }"
        />
        <span class="error-msg">{{ errors.first("password") }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          type="password"
          placeholder="请输入确认密码"
          v-model="confirmPassword"
          name="confirmPassword"
          v-validate="{ required: true, is: password }"
          :class="{ invalid: errors.has('confirmPassword') }"
        />
        <span class="error-msg">{{ errors.first("confirmPassword") }}</span>
      </div>
      <div class="controls">
        <input
          type="checkbox"
          :checked="agree"
          v-model="agree"
          name="agree"
          @click="changeAgree"
          v-validate="{ required: true, agree: true }"
          :class="{ invalid: errors.has('agree') }"
        />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ errors.first("agree") }}</span>
      </div>
      <div class="btn">
        <button @click="handleRegister">注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Register",
  data() {
    return {
      phone: "",
      confirmCode: "",
      password: "",
      confirmPassword: "",
      agree: true,
    };
  },
  computed: {
    ...mapGetters("user", ["code"]),
  },
  methods: {
    async getConfirmCode() {
      try {
        const { phone } = this;
        phone && (await this.$store.dispatch("user/getCode", phone));
        this.confirmCode = this.code || ""; // 验证码
      } catch (error) {
        this.$message.error(error);
      }
    },
    changeAgree() {
      this.agree = !this.agree;
    },
    // 用户注册
    async handleRegister() {
      const success = await this.$validator.validateAll(); //全部表单验证
      if (success) {
        try {
          const { phone, confirmCode, password } = this;
          await this.$store.dispatch("user/userRegister", {
            phone,
            password,
            code: confirmCode,
          });
          this.$router.push("/login");
        } catch (error) {
          this.$message.error(error);
        }
      } else {
        this.$message.warning('请检查注册信息后重试！');
      }
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
        border: 1px solid #e1251bb9;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>
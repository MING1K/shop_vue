<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(good, index) in cartInfoList"
          :key="index"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="good.isChecked === 1"
              @click="handleChangeChecked(good.skuId, good.isChecked)"
            />
          </li>
          <li class="cart-list-con2">
            <img v-lazy="good.imgUrl" />
            <div class="item-msg">
              {{ good.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ good.skuPrice.toFixed(2) }}</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="handleChange(good, good.skuId, -1, 'add')"
              >-</a
            >
            <input
              autocomplete="off"
              type="number"
              v-model.number="goodNumList[good.skuId]"
              minnum="1"
              class="itxt"
              @change="
                handleChange(
                  good,
                  good.skuId,
                  Math.floor(goodNumList[good.skuId] - good.skuNum),
                  'change'
                )
              "
            />
            <a class="plus" @click="handleChange(good, good.skuId, 1, 'add')"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{
              (good.skuNum * good.skuPrice).toFixed(2)
            }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="handleDelete(good.skuId)">删除</a>
            <br />
            <a>移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked" @click="handleAllChecked()" />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="handleDeleteSome()">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ totalCount.num }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalCount.sum.toFixed(2) }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { debounce } from "@/utils/debounce.js";
export default {
  name: "ShopCart",
  data() {
    return {
      onChange: false,
      goodNumList: {},
    };
  },
  mounted() {
    this.getData();
  },
  watch: {
    goodNumList: {
      deep: true,
      handler(newVal, oldVal) {
        if (!this.onChange) {
          this.changeNumList();
        }
      },
    },
  },
  computed: {
    ...mapGetters("shopcart", ["cartInfoList"]),
    totalCount() {
      let sum = 0;
      let num = 0;
      this.cartInfoList.forEach((item) => {
        if (item.isChecked === 1) {
          sum += item.skuNum * item.skuPrice;
          num += 1;
        }
      });
      return { sum, num };
    },
    isAllChecked() {
      // 遍历数组里面原理，只要全部元素isChecked属性都为1===>]
      // 只要有一个不是1======>假false
      if (this.cartInfoList?.length === 0) return false;
      return this.cartInfoList.every((item) => item.isChecked === 1);
    },
  },
  methods: {
    async getData() {
      await this.$store.dispatch("shopcart/getCartList");
      this.getGoodNumList();
    },
    getGoodNumList() {
      let obj = {};
      (this.cartInfoList || []).forEach((item) => {
        obj[item.skuId] = item.skuNum;
      });
      this.goodNumList = obj;
    },
    async handleChange(good, skuId, changeNum, type) {
      if (type === "add") {
        this.goodNumList[skuId] += changeNum;
      }
      if (this.goodNumList[skuId] <= 1) this.goodNumList[skuId] = 1;
    },
    async handleOnChange(skuId, changeNum) {
      this.onChange = true;
      try {
        await this.$store.dispatch("detail/addOrUpdateShopCart", {
          skuId,
          skuNum: changeNum,
        });
        this.getData().then(() => {
          this.onChange = false;
        });
      } catch (error) {
        this.onChange = false;
        this.$message.warning(error);
      }
    },
    changeNumList: debounce(function () {
      let change = {};
      (this.cartInfoList || []).forEach((item) => {
        if (this.goodNumList[item.skuId] !== item.skuNum) {
          change[item.skuId] = this.goodNumList[item.skuId] - item.skuNum;
        }
      });
      for (let item in change) {
        this.handleOnChange(item, change[item]);
      }
    }, 1000),
    async handleDelete(skuId) {
      try {
        await this.$store.dispatch("shopcart/deleteCart", skuId);
        this.getData();
      } catch (error) {
        this.$message.warning(error);
      }
    },
    async handleChangeChecked(skuId, isChecked) {
      try {
        isChecked = isChecked === 1 ? 0 : 1;
        await this.$store.dispatch("shopcart/updateCheckedByid", {
          skuId,
          isChecked,
        });
        this.getData();
      } catch (error) {
        this.$message.warning(error);
      }
    },
    async handleDeleteSome() {
      let checked =
        (this.cartInfoList || []).filter((item) => item.isChecked === 1) || [];
      // checked.forEach((item) => {
      //   this.handleDelete(item.skuId);
      // });
      try {
        await this.$store.dispatch("shopcart/deleteCheckedCart", checked);
        this.getData();
      } catch (error) {
        this.$message.warning(error);
      }
    },
    async handleAllChecked() {
      let checked = [];
      if (this.isAllChecked) {
        checked = this.cartInfoList || [];
      } else {
        checked = (this.cartInfoList || []).filter((item) => item.isChecked !== 1) || [];
      }
      try {
        await this.$store.dispatch("shopcart/changeAllChecked", {checked: checked, isAllChecked: this.isAllChecked});
        this.$nextTick(() => {
          this.getData();
        })
      } catch (error) {
        this.$message.warning(error);
      }
    },
  },
};
</script>

<style lang="less" scoped>
input[type="number"] {
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  -moz-appearance: textfield;
}
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        // .cart-list-con3 {
        //   width: 10%;

        //   .item-txt {
        //     text-align: center;
        //   }
        // }

        .cart-list-con4 {
          width: 10%;
          .price {
            font-size: 14px;
          }
        }

        .cart-list-con5 {
          width: 16%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          a {
            cursor: pointer;
          }
        }

        .cart-list-con6 {
          width: 11%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
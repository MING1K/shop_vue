<template>
  <div class="order-right">
    <div class="order-content">
      <div class="title">
        <h3>我的订单</h3>
      </div>
      <div class="chosetype">
        <table>
          <thead>
            <tr>
              <th width="29%">商品</th>
              <th width="31%">订单详情</th>
              <th width="13%">收货人</th>
              <th>金额</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="orders">
        <table class="order-item" v-for="(order, index) in list" :key="order.id">
          <thead>
            <tr>
              <th colspan="5">
                <span class="ordertitle">{{ order.createTime }} 订单编号：{{ order.outTradeNo }}
                  <span class="pull-right delete"><img src="@/assets/images/delete.png" /></span></span>
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- 每一笔订单展示购买商品的地方 -->
            <tr v-for="(cart, index) in order.orderDetailList" :key="index">
              <td width="60%">
                <div class="typographic">
                  <img v-lazy="cart.imgUrl" style="width: 100px; height: 100px" />
                  <a class="block-text">{{ cart.skuName }}</a>
                  <span>x{{ cart.skuNum }}</span>
                  <a class="service">售后申请</a>
                </div>
              </td>
              <td :rowspan="order.orderDetailList.length" v-show="index == 0" width="8%" class="center">
                {{ order.consignee }}
              </td>
              <td :rowspan="order.orderDetailList.length" v-show="index == 0" width="13%" class="center">
                <ul class="unstyled">
                  <li>总金额¥{{ order.totalAmount.toFixed(2) }}</li>
                  <li>在线支付</li>
                </ul>
              </td>
              <td :rowspan="order.orderDetailList.length" v-show="index == 0" width="8%" class="center">
                <a class="btn" @click="ifPay(order)">{{ order.orderStatusName }}</a>
              </td>
              <td :rowspan="order.orderDetailList.length" v-show="index == 0" width="13%" class="center">
                <ul class="unstyled">
                  <li>
                    <a target="_blank">评价|晒单</a>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="choose-order">
        <!-- 全局组件分页器：
          total:分页器一共要展示多少条数据
          pageSize:一页展示几条数据
          pageNo:当前页码
          continues:连续页码数
          handlePageNo:自定义事件父组件获取分页器当前页码
        -->
        <Pagination :total="total" :pageSize="limit" :pageNo="page" :continues="3" @handlePageNo="handlePageNo">
        </Pagination>
      </div>
    </div>
    <!--猜你喜欢-->
    <div class="like">
      <h4 class="kt">猜你喜欢</h4>
      <ul class="like-list">
        <li class="likeItem">
          <div class="p-img">
            <img src="@/assets/images/itemlike01.png" />
          </div>
          <div class="attr">
            <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
          </div>
          <div class="price">
            <em>¥</em>
            <i>3699.00</i>
          </div>
          <div class="commit">已有6人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="@/assets/images/itemlike02.png" />
          </div>
          <div class="attr">Apple苹果iPhone 6s/6s Plus 16G 64G 128G</div>
          <div class="price">
            <em>¥</em>
            <i>4388.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="@/assets/images/itemlike03.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="@/assets/images/itemlike04.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      page: 1, // 页码数
      limit: 3, //一页几条数据
      list: [], // 存储我的订单数据
      total: 0, // 一共多少条数据
    };
  },
  mounted() {
    //获取订单
    this.getData();
  },
  methods: {
    async getData() {
      //page|limit
      const { page, limit } = this;
      let result = await this.$API.reqMyOrderList(page, limit);
      if (result.code == 200) {
        this.list = result.data.records;
        this.total = result.data.total;
      } else {
        this.$message.error(result.message);
      }
    },
    handlePageNo(page) {
      this.page = page;
      this.getData();
    },
    ifPay(order) {
      // console.log(order);
      if (order.orderStatusName === '未支付') {
        this.$router.push('/pay?orderId=' + order.id);
      }
    },
  },
};
</script>

<style scoped></style>

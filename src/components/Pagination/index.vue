<template>
  <div class="pagination">
    <button :disabled="pageNo === 1" @click="handleChangePage(pageNo - 1)">上一页</button>
    <button v-if="startNumAndEndNum.start > 1" @click="handleChangePage(1)" :class="{active: pageNo === 1}">1</button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <button v-for="(page, index) in startNumAndEndNum.end" :key="index" v-show="page >= startNumAndEndNum.start"  @click="handleChangePage(page)"  :class="{active: pageNo === page}">{{page}}</button>

    <template>
        <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
        <button v-if="startNumAndEndNum.end < totalPage" @click="handleChangePage(totalPage)" :class="{active: pageNo === totalPage}">{{ totalPage }}</button>
    </template>
    
    <button :disabled="pageNo === totalPage" @click="handleChangePage(pageNo + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>
  
  <script>
export default {
  name: "Pagination",
  props: {
    pageNo: {
        type: Number,
        default: 1,
    },
    pageSize: {
        type: Number,
        default: 5,
    },
    total: {
        type: Number,
        default: 1,
    },
    continues: {
        type: Number,
        default: 5,
    }
  },
  computed: {
    totalPage() {
        // 总共多少页
        return Math.ceil(this.total / this.pageSize);
    },
    startNumAndEndNum() {
        // 连续起始与终止
        let start = 0, end = 0;
        // 连续页码至少5页
        if (this.continues > this.totalPage) {
            start = 1;
            end = this.totalPage;
        } else {
            start = this.pageNo - Math.floor(this.continues / 2);
            end = this.pageNo + Math.floor(this.continues / 2);
            if (start < 1) {
                start = 1;
                end = this.continues;
            }
            if (end > this.totalPage) {
                start = this.totalPage - this.continues + 1;
                end = this.totalPage;
            }
        }
        return {start, end}
    },
  },
  methods: {
    handleChangePage(pageNo) {
        this.$emit('handlePageNo', pageNo);
    },
  },
};
</script>
  
  <style lang="less" scoped>
.pagination {
    text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
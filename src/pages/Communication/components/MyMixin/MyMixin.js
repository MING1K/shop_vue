export default {
    methods: {
        giveMoney(num) {
            this.money -= num;
            //可以通过$parent属性获取到某一个组件父组件，可以操作父组件的数据与方法
            this.$parent.money += num;
        }
    }
}
<template>
  <div>
    <h2>Parent有存款：{{ money }}</h2>
    <button @click="getFromSon(100)">找son借钱100</button><br>
    <button @click="getFromDaughter(150)">找daughter借钱150</button><br>
    <button @click="getFromAll(200)">找son和daughter借钱200</button><br>
    <hr>
    <!-- ref：获取节点（组件标签） -->
    <ChildrenAndParentSon ref="son"></ChildrenAndParentSon>
    <hr>
    <ChildrenAndParentDaughter ref="daughter"></ChildrenAndParentDaughter>
  </div>
</template>

<script>
import ChildrenAndParentSon from './ChildrenAndParentSon.vue';
import ChildrenAndParentDaughter from './ChildrenAndParentDaughter.vue';
export default {
    components: { ChildrenAndParentDaughter, ChildrenAndParentSon },
    data() {
        return {
            money: 1000,
        }
    },
    methods: {
      getFromSon(num) {
        this.money += num;
        //ref可以获取真实DOM节点，当然也可以获取子组件标签(操作子组件的数据与方法
        this.$refs.son.money -= num;
      },
      getFromDaughter(num) {
        this.money += num;
        //ref可以获取真实DOM节点，当然也可以获取子组件标签(操作子组件的数据与方法
        this.$refs.daughter.money -= num;
      },
      getFromAll(num) {
        this.money += 2 * num;
        //组件实例自身拥有一个属性$children,可以获取到当前组件当中，全部子组件
        this.$children.forEach(item => {
          item.money -= 200;
        })

        // 切记不可以这样写
        // this.$children[0].money -= 200;
        // this.$children[1].money -= 200;

      }
    },
}
</script>

<style>

</style>
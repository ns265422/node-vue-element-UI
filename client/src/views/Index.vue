<template>
  <div class="index">
    <HeadNav></HeadNav>
    <LeftMenu></LeftMenu>
    <div class="rightContainer">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HeadNav from "../layout/HeadNav";
import LeftMenu from "../layout/LeftMenu";

export default {
  name: "index",
  components: {
    HeadNav,
    LeftMenu
  }
};
</script>
<style scoped>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.rightContainer {
  position: relative;
  top: 0;
  left: 140px;
  width: calc(100% - 140px);
  height: calc(100% - 71px);
  overflow: auto;
}
</style>


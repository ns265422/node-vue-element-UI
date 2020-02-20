<template>
  <el-row class="menu_page">
    <el-col>
      <el-menu
        mode="vertical"
        background-color="#3c5377"
        text-color="#fff"
        active-text-color="#409eff"
        class="el-menu-vertical-demo"
      >
        <router-link to="/home">
          <el-menu-item index="0">
            <i class="fa fa-margin fas fa-home"></i>
            <span slot="title">首頁</span>
          </el-menu-item>
        </router-link>
        <template v-for="item in items">
          <el-submenu v-if="item.children" :index="item.path" :key="item.path">
            <template slot="title">
              <i :class="'fa fa-margin ' + item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </template>
            <router-link
              v-for="(citem, cindex) in item.children"
              :to="citem.path"
              :key="cindex"
            >
              <el-menu-item :index="citem.path">
                <span slot="title">{{ citem.name }}</span>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: 'leftmenu',
  data() {
    return {
      items: [
        {
          icon: 'fas fa-hand-holding-usd',
          name: '記帳',
          path: 'fund',
          children: [{ path: 'foundlist', name: '收支紀錄'}]
        },
        {
          icon: 'fas fa-cog',
          name: '設定',
          path: 'info',
          children: [{ path: 'infoshow', name: '個人資料'}]
        }
      ]
    }
  }
}
</script>
<style scoped>
.menu_page {
  position: fixed;
  top: 71px;
  left: 0;
  min-height: 100%;
  background-color: #3c5377;
  z-index: 99;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 15px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 140px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 50px;
}
.el-submenu .el-menu-item {
  min-width: 140px;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>

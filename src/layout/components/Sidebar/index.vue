<template>
  <div class="">
    <div class="logo-container">
      <el-avatar
        shape="square"
        src="http://cdn.aqua.sharesweets.top/icon-1.jpg"
        :size="logoHeight"
      />
      <h1 v-if="$store.getters.sidebarOpened" class="logo-title">vue3-admin</h1>
    </div>
    <el-scrollbar>
      <sidebar-menu></sidebar-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import SidebarMenu from './SidebarMenu.vue';

const logoHeight = 44;
</script>

<style lang="scss" scoped>
.logo-container {
  //height: v-bind(logoHeight) + 'px';
  height: 50px;
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>

<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    :unique-opened="true"
    :default-active="activeMenu"
    :collapse="!$store.getters.sidebarOpened"
    router
  >
    <!-- 子集 menu 菜单 -->
    <sidebar-item
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { filterRouters, generateMenus } from '@/utils/route';
import SidebarItem from './SidebarItem.vue';

const router = useRouter();
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes());
  return generateMenus(filterRoutes);
});

// 计算高亮 menu 的方法
const route = useRoute();
const activeMenu = computed(() => {
  const { path } = route;
  return path;
});
</script>

<style lang="scss" scoped>
@import './src/style/variables.module.scss';

:deep(.el-menu-item) {
  //background-color: blueviolet;
  box-sizing: border-box;
  width: calc(100% - 30px);
  border-radius: 8px;
  margin: 5px 15px;
  height: 50px;

  // 处理文字溢出
  & > span {
    display: block;
    width: 90%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &.is-active {
    background-color: #293444 !important;
  }

  &:hover {
    background-color: rgba(43, 52, 67, 0.6);
    color: $menuActiveText;
  }
}

:deep(.el-sub-menu .el-menu-item) {
  box-sizing: border-box;
  width: calc(100% - 30px);
  //color: aqua;
  min-width: auto;
}

.el-menu :deep(.el-sub-menu > .el-sub-menu__title) {
  margin: 0 15px;
  // 处理文字溢出
  & > span {
    display: block;
    width: calc(100% - 42px);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

// 子菜单高亮时，使其父菜单也高亮
.el-menu :deep(.el-sub-menu.is-active > .el-sub-menu__title) {
  color: $menuActiveText !important;
}
</style>

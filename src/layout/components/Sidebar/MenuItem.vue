<template>
  <el-icon
    v-if="icon.includes('el-icon')"
    class="sub-el-icon"
    :size="size"
    :color="color"
  >
    <component :is="icon.split('-')[2]"></component>
  </el-icon>
  <svg-icon v-else :icon="icon"></svg-icon>
  <span>{{ generateTitle(title) }}</span>
</template>
<script setup>
import { generateTitle } from '@/utils/i18n';

defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped>
.el-icon {
  justify-content: start;
}
</style>

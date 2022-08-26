<template>
  <c-row>
    <c-col :span="{ xs: 2, sm: 4, md: 6, lg: 8, xl: 10, xxl: 8 }"> Col </c-col>
    <c-col :span="{ xs: 20, sm: 16, md: 12, lg: 8, xl: 4, xxl: 8 }"> Col </c-col>
    <c-col :span="{ xs: 2, sm: 4, md: 6, lg: 8, xl: 12, xxl: 8 }"> Col </c-col>
  </c-row>
</template>
<script setup lang="ts"></script>
<style scoped>
.crco-col {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
}
.crco-col:nth-child(2n) {
  background-color: rgba(var(--arcoblue-6), 0.9);
}
.crco-col:nth-child(2n + 1) {
  background-color: var(--color-primary-light-4);
}
</style>

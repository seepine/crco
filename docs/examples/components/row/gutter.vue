<template>
  <c-row :gutter="{ xs: 6, sm: 30 }">
    <c-col span="6">
      <div>Col</div>
    </c-col>
    <c-col span="12">
      <div>Col</div>
    </c-col>
    <c-col span="6">
      <div>Col</div>
    </c-col>
  </c-row>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.crco-col {
  div {
    height: 48px;
    line-height: 48px;
    color: var(--color-white);
    text-align: center;
  }
}
.crco-col:nth-child(2n) {
  div {
    background-color: rgba(var(--arcoblue-6), 0.9);
  }
}
.crco-col:nth-child(2n + 1) {
  div {
    background-color: var(--color-primary-light-4);
  }
}
</style>

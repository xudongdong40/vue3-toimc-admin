<template>
  <div class="demo-wrap p-4">
    <div class="p-4 wrap">
      <h1>默认密码输入框</h1>
      <PasswordCard placeholder="默认" />
      <h1>禁用密码输入框</h1>
      <PasswordCard placeholder="禁用" disabled />
      <br />
      <h1>隐藏input密码输入框</h1>
      <PasswordCard placeholder="隐藏input" :show-input="false" value="!@#qwe12345" />
    </div>
    
  </div>
</template>

<script lang="ts">
</script>

<style lang="scss" scoped>
.demo-wrap {
  .wrap {
    margin: auto;
    background-color: #fff;
  }
}
</style>

<template>
  <div class="wrapper">
    <div class="content">
      <div style="background-color: rgb(238, 225, 217)" class="w-full h-full">
        <div
          class="w-full h-full flex justify-between"
          style="align-items: flex-start; flex-direction: column; padding: 0.9em"
        >
          <div
            style="
              color: rgb(142, 114, 111);
              font-size: 0.6em;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            "
          >
            母亲节
          </div>
          <p class="inline-block" style="font-size: 2em; color: rgb(142, 114, 111)">
            <span style="font-weight: 700">2</span>
            <i style="font-size: 12px; font-style: normal">天</i>
          </p>
          <p class="mt5" data-v-0b576f7e="" style="color: rgb(142, 114, 111); font-size: 0.6em">
            2022-05-08
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CountDownBase',
    setup() {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    height: 100%;
    width: 100%;
    background-color: var(--bg-card);
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 0 10px 3px #0000001a;

    .content {
      position: relative;
      width: 100%;
      height: 100%;
      font-size: 18px;
    }
  }
</style>

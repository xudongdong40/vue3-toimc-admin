<template>
  <div class="wrapper">
    <div class="content">
      <div class="h-full" data-v-d1367202="" style="background-color: rgb(99, 160, 153)">
        <h2
          class="d-elip"
          data-v-d1367202=""
          style="
            color: rgb(255, 255, 255);
            font-size: 0.8em;
            height: 40%;
            display: flex;
            flex-flow: wrap;
            align-items: center;
            justify-content: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          "
          >下班还有 </h2
        ><div
          class="flex justify-center"
          style="font-size: 1.6em; height: 40%; color: rgb(255, 255, 255); font-weight: 700"
          >08:41:07</div
        ></div
      >
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

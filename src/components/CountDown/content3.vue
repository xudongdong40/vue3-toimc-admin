<template>
  <div class="wrapper">
    <div class="content">
      <div
        class="w-full h-full relative"
        style="background-color: rgb(255, 255, 255); text-align: center"
      >
        <div class="w-full h-full">
          <div
            class="items-center h-full w-full"
            style="
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: center;
              padding: 0.9em;
            "
          >
            <div
              style="
                color: rgb(235, 129, 151);
                font-size: 0.6em;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              "
              >和她❤️恋爱已经</div
            >
            <p class="inline" style="font-size: 1.7em; color: rgb(235, 129, 151)">
              <span style="font-weight: 700">432</span>
              <i style="font-size: 12px; font-style: normal"> 天 </i>
            </p>
            <p class="mt-1" style="color: rgb(235, 129, 151); font-size: 0.6em">2021-02-28</p></div
          ></div
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

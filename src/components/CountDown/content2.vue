<template>
  <div class="wrapper">
    <div class="content">
      <div style="background-color: #fff" class="w-full h-full">
        <div class="h-full relative" data-v-192177c4="">
          <h2
            style="
              font-size: 0.7em;
              height: 30%;
              color: rgb(255, 255, 255);
              background-color: rgb(24, 144, 255);
              display: flex;
              flex-flow: wrap;
              align-items: center;
              justify-content: center;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            "
            >发工资还有</h2
          >
          <div
            style="
              height: 70%;
              color: rgb(24, 144, 255);
              font-size: 3em;
              background-color: rgb(255, 255, 255);
              display: flex;
              flex-flow: wrap;
              align-items: center;
              justify-content: center;
              font-weight: 700;
            "
          >
            26
          </div>
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

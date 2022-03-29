<template>
  <div class="limit-box content">
    <waterfall
      :key="forUpdate"
      class="waterfall"
      :list="list"
      src-key="cover"
      :gap="12"
      :col-width="280"
      :distance-to-scroll="400"
      :is-loading="loading"
      :is-over="over"
      @scroll-reach-bottom="getNext"
    >
      <template #default="slotProp">
        <div class="item">
          <div>
            <div class="cover-wrapper">
              <img v-if="slotProp.item.cover" :src="slotProp.item.cover" class="cover" />
            </div>
            <div class="brief">
              <h3>{{ slotProp.item.title }}</h3>
              <p>{{ slotProp.item.outline }}</p>
            </div>
          </div>
          <div class="outline-bottom">
            <p class="article-tags">
              <span>tags</span>
              <span v-for="tag of slotProp.item.tags" :key="tag" class="tag">{{ tag }}</span>
            </p>
            <time>{{ slotProp.item.time }}</time>
          </div>
        </div>
      </template>
    </waterfall>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue'
  import Waterfall from '@/components/Waterfall/index.vue'
  import { getData } from './mock'
  export default defineComponent({
    name: 'App',
    components: { Waterfall },
    setup() {
      const list = ref<unknown[]>([])
      const loading = ref(false)
      const over = ref(false)
      const fetchList = async (): Promise<void> => {
        loading.value = true
        const newList = await getData()
        loading.value = false
        list.value = list.value.concat(newList)
        if (list.value.length > 120) over.value = true
      }
      onMounted(fetchList)
      let isLoad = false
      const getNext: () => Promise<void> = async (): Promise<void> => {
        if (isLoad) return
        isLoad = true
        await fetchList()
        isLoad = false
      }
      const isMounted = ref(false)
      const forUpdate = ref(0)
      const isLimit = ref(false)
      const toggleLimit = async () => {
        isLimit.value = !isLimit.value
        list.value = []
        over.value = false
        forUpdate.value++
        await fetchList()
        isMounted.value = true
      }
      return {
        isLimit,
        toggleLimit,
        isMounted,
        forUpdate,
        list,
        getNext,
        loading,
        over
      }
    }
  })
</script>

<style lang="scss" scoped>
  .content {
    padding-top: 30px;
    background-color: #dee3e7;
  }

  .limit-box {
    height: 100vh;
    overflow-y: scroll;
  }

  .waterfall,
  .tags {
    width: 80%;
    width: 100%;
    margin: 0 auto;
  }

  .tags-wrapper {
    padding: 10px 0;
    margin-bottom: 15px;
    background-color: #fff;
    border-bottom: 1px solid #c4cdd4;

    .tags {
      .tag {
        display: inline-block;
        width: 100px;
        padding: 5px 0;
        margin: 0 10px 8px 0;
        font-size: 14px;
        color: #576575;
        text-align: center;
        border: 1px solid #e8eaee;
        border-radius: 4px;

        &:hover {
          border-color: #8599ad;
        }

        &:not(.active) {
          cursor: pointer;
        }

        &.active {
          color: #fff;
          background-color: #576575;
          border-color: #576575;
        }
      }
    }
  }

  .brief {
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;

    h3,
    > p {
      word-break: break-all;
      word-wrap: break-word;
    }

    h3 {
      padding: 20px 20px 12px;
      font-weight: 400;
      color: #22252a;
      text-align: center;
    }

    > p {
      padding: 0 20px 12px;
      font-size: 13px;
      color: #8a98a8;
    }
  }

  .outline-bottom {
    display: flex;
    padding: 10px;
    background-color: #f9fafb;
    border-top: 1px solid #e7ebef;
    justify-content: space-between;

    .article-tags,
    time {
      font-size: 12px;
      color: #73828c;
    }

    .article-tags {
      span {
        margin-right: 6px;

        &.tag:hover {
          color: #000;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }

  .item {
    box-sizing: border-box;

    .cover-wrapper {
      overflow: hidden;
      background-color: #fff;
    }

    &:hover {
      @keyframes scale-img {
        0% {
          transform: scale(1);
        }

        100% {
          transform: scale(1.5);
        }
      }

      box-shadow: 5px 5px 5px #ccc;

      .cover {
        animation: scale-img 0.1s linear forwards;
      }
    }
  }

  .cover {
    width: 100%;
    vertical-align: middle;
  }
</style>

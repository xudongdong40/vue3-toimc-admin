<template>
  <div class="audio-player">
    <div class="audio-player-inner">
      <div class="audio-player-label">{{ state.title }}</div>
      <div class="audio-player-operate">
        <!-- 前后 -->
        <div class="operate-seq">
          <button
            class="operate-prev mr-1"
            :title="$t('components.player.audio.prev')"
            :disabled="hasPrev"
            ><icon icon="material-symbols:skip-previous-outline-rounded"
          /></button>
          <button
            v-show="!state.playing"
            class="operate-play mr-1"
            :title="$t('components.player.audio.play')"
            @click="play"
          >
            <icon icon="material-symbols:play-arrow-outline-rounded" />
          </button>
          <button
            v-show="state.playing"
            class="operate-pause mr-1"
            :title="$t('components.player.audio.pause')"
            @click="pause"
          >
            <icon icon="material-symbols:pause-outline-rounded"
          /></button>

          <button
            class="operate-next mr-1"
            :title="$t('components.player.audio.next')"
            :disabled="hasNext"
          >
            <icon icon="material-symbols:skip-next-outline-rounded"
          /></button>
        </div>
        <!-- 时间进度 -->
        <div class="operate-time ml-5 mr-5">
          <span class="time-current">{{ formatTime(state.time) }}</span>
          <d-slider
            v-model="state.time"
            class="time-slider ml-3 mr-3"
            :min="0"
            :max="state.total"
            :format-tooltip="formatTime"
            @change="handleTimeChange"
          ></d-slider>
          <span class="time-total">{{ formatTime(state.total) }}</span>
        </div>
        <div style="display: flex; align-items: center">
          <!-- 音量控制 -->
          <div class="operate-volume mr-2">
            <el-popover popper-class="audio-volume-popper">
              <template #reference>
                <button class="icon muted" @click="handleMutedClick">
                  <icon
                    v-show="state.muted"
                    :title="$t('components.player.audio.unmuted')"
                    icon="material-symbols:volume-off-outline-rounded"
                  />
                  <icon
                    v-show="!state.muted && state.volume < 0.5"
                    :title="$t('components.player.audio.muted')"
                    icon="material-symbols:volume-down-outline-rounded"
                  />
                  <icon
                    v-show="!state.muted && state.volume >= 0.5"
                    :title="$t('components.player.audio.muted')"
                    icon="material-symbols:volume-up-outline-rounded"
                  />
                </button>
              </template>
              <d-slider
                class="volume-slider"
                :model-value="state.volume"
                :min="0"
                :step="0.01"
                :max="1"
                vertical
                height="200px"
                @change="handleVolumeChange"
              ></d-slider>
            </el-popover>
          </div>

          <!-- 播放速度控制 -->
          <el-dropdown class="operate-rate mr-2">
            <span class="rate-text"> {{ formateRate(state.rate) }} </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="item in options.rateList"
                  :key="item.value"
                  class="operate-popover-item"
                  :class="{ 'is-active': state.rate === item.value }"
                  @click="handleRateChange(item.value)"
                  >{{ item.label }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-dropdown class="operate-loop">
            <svg-icon
              class="loop-icon"
              url="https://at.alicdn.com/t/font_3449991_ircbuvbgrwo.css"
              icon-class="player"
              :class-name="'player-loop-' + (state.loop + 1)"
              size="20px"
            ></svg-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="item in options.loopList"
                  :key="item.value"
                  class="operate-popover-item"
                  :class="{ 'is-active': state.loop === item.value }"
                  @click="handleLoopChange(item.value)"
                  >{{ item.label }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <slot name="list">
      <ul class="audio-list mt-5">
        <li
          v-for="(item, idx) in list"
          :key="item.src"
          class="audio-item"
          :class="{ active: idx === state.index }"
          @click="changeItem(idx)"
          >{{ item.title }}</li
        >
      </ul>
    </slot>
  </div>
</template>

<script lang="ts">
  import { onMounted, onBeforeUnmount, reactive, PropType } from 'vue'
  import { Howl } from 'howler'

  function formatTime(secs: number) {
    const hours = Math.floor(secs / 3600) || 0
    const minutes = Math.floor(secs / 60) || 0
    const seconds = Math.floor(secs - hours * 3600 - minutes * 60) || 0
    if (hours) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }

    return minutes + ':' + String(seconds).padStart(2, '0')
  }

  function formateRate(rate: number) {
    return rate.toFixed(2) + 'x'
  }

  export default defineComponent({
    name: 'AudioPlayer',
    props: {
      list: {
        type: Array as PropType<{ src: string; title: string; duration?: number }[]>,
        default: () => []
      },
      index: { type: Number, default: 0 },
      title: { type: String, default: '' },
      autoplay: { type: Boolean, default: false },
      volume: { type: Number, default: 1 },
      muted: { type: Boolean, default: false },
      loop: { type: Number, default: 0 },
      rate: { type: Number, default: 1 }
    },
    emits: ['update:index', 'update:volume', 'update:muted', 'update:loop', 'update:rate'],
    setup(_props, { emit, expose }) {
      const state = reactive({
        index: _props.index,
        list: _props.list,
        title: _props.list[_props.index].title,
        time: 0,
        total: 0,
        playing: false,
        volume: _props.volume,
        rate: _props.rate,
        loop: _props.loop,
        muted: _props.muted
      })

      const getNextIndex = () => {
        const list = state.list
        let nextIndex: number
        if (state.loop === 3) {
          nextIndex = Math.floor(Math.random() * list.length)
        } else if (state.loop === 2) {
          nextIndex = state.index
        } else {
          nextIndex = state.index + 1
          // 根据是否列表循环决定回到第一个还是结束
          if (nextIndex >= list.length) {
            nextIndex = state.loop === 1 ? 0 : -1
          }
        }
        return nextIndex
      }
      const getPrevIndex = () => {
        const list = state.list
        let prevIndex: number
        if (state.loop === 3) {
          prevIndex = Math.floor(Math.random() * list.length)
        } else if (state.loop === 2) {
          prevIndex = state.index
        } else {
          prevIndex = state.index - 1
          // 根据是否列表循环决定回到是否结束
          if (prevIndex < 0) {
            prevIndex = state.loop === 1 ? list.length - 1 : -1
          }
        }
        return prevIndex
      }
      const hasPrev = computed(() => {
        if (state.list.length < 2) return false
        return getPrevIndex() !== -1
      })
      const hasNext = computed(() => {
        if (state.list.length < 2) return false
        return getNextIndex() !== -1
      })

      const options = reactive({
        // 循环
        loopList: [
          {
            label: '顺序播放',
            value: 0
          },
          {
            label: '列表循环',
            value: 1
          },
          {
            label: '单曲循环',
            value: 2
          },
          {
            label: '随机播放',
            value: 3
          }
        ],
        // 倍数
        rateList: [
          {
            label: '0.5x',
            value: 0.5
          },
          {
            label: '0.75x',
            value: 0.75
          },
          {
            label: '1x',
            value: 1
          },
          {
            label: '1.25x',
            value: 1.25
          },
          {
            label: '1.5x',
            value: 1.5
          },
          {
            label: '2x',
            value: 2
          },
          {
            label: '2.5x',
            value: 2.5
          }
        ]
      })

      const playerMap = reactive(new Map())
      let player: Howl | null = null

      const getOrCreatePlayer = (src) => {
        let p = playerMap.get(src)
        if (!p) {
          p = new Howl({
            src: [src],
            volume: state.volume,
            loop: state.loop,
            mute: state.muted,
            rate: state.rate,
            onload: () => {
              state.total = p.duration()
            },
            onplay: () => {
              state.playing = true
              // 'load' 只会触发一次 列表切换时 总时间可能会变化 在播放时再获取一次
              state.total = p.duration()
              step()
            },
            onpause: () => {
              state.playing = false
            },
            onstop: () => {
              state.playing = false
            },
            onend: () => {
              next()
            }
          })
          playerMap.set(src, p)
        } else {
          p.pause()
        }

        return p
      }

      onBeforeUnmount(() => {
        playerMap.forEach((p) => {
          p.unload()
        })
      })

      onMounted(() => {
        const src = state.list[state.index].src
        player = getOrCreatePlayer(src)
        if (player && _props.autoplay) {
          player?.play()
        }
      })

      // 播放进度显示
      let step = () => {
        if (!player) {
          return
        }
        let playing = player.playing()
        if (!playing) {
          return
        }

        let seek = player.seek()
        state.time = seek
        requestAnimationFrame(step)
      }

      watch(
        () => _props.rate,
        (val) => {
          state.rate = val
          player?.rate(val)
        }
      )
      watch(
        () => _props.volume,
        (v) => {
          state.rate = v
          player?.volume(v)
        }
      )
      watch(
        () => _props.muted,
        (v) => {
          state.muted = v
          player?.mute(v)
        }
      )
      watch(
        () => _props.loop,
        (v) => {
          state.loop = v
          player?.loop(v)
        }
      )

      // 方法
      const play = () => {
        if (player) {
          state.playing = true
          player.play()
        }
      }
      const stop = () => {
        if (player) {
          state.playing = false
          player.stop()
        }
      }
      const pause = () => {
        if (player) {
          state.playing = false
          player.pause()
        }
      }

      const prev = () => {
        const prevIndex = getPrevIndex()
        const prevItem = state.list[prevIndex]
        if (prevIndex !== -1) {
          emit('update:index', prevIndex)
          state.title = prevItem.title
          state.time = 0
          state.total = prevItem.duration ? prevItem.duration : 0
          player = getOrCreatePlayer(prevItem.src)
          player.play()
        } else {
          state.playing = false
        }
      }

      const next = () => {
        const nextIndex = getNextIndex()
        const nextItem = state.list[nextIndex]
        if (nextIndex !== -1) {
          emit('update:index', nextIndex)
          // todo:
          state.title = nextItem.title
          state.time = 0
          state.total = nextItem.duration ? nextItem.duration : 0
          player = getOrCreatePlayer(nextItem.src)
          player.play()
        } else {
          state.playing = false
        }
      }

      expose({
        play,
        stop,
        pause,
        prev,
        next
      })

      return {
        hasPrev,
        hasNext,
        state,
        options,
        play,
        pause,
        prev,
        next,
        handleTimeChange: (val) => {
          player?.seek(val)
        },
        handleRateChange: (val) => {
          state.rate = val
          player?.rate(val)
          emit('update:rate', val)
        },
        handleLoopChange: (val) => {
          state.loop = val
          player?.loop(val)
          emit('update:loop', val)
        },
        handleMutedClick: () => {
          state.muted = !state.muted
          player?.mute(state.muted)
          emit('update:muted', state.muted)
        },
        handleVolumeChange: (v) => {
          state.volume = v
          player?.volume(v)
          emit('update:volume', v)
        },
        changeItem: (index) => {
          state.index = index
          const item = state.list[index]
          state.title = item.title
          player?.stop()
          player = getOrCreatePlayer(item.src)
          player?.play()
        },
        formatTime,
        formateRate
      }
    }
  })
</script>

<style lang="scss" scoped>
  .audio-player {
    padding: 10px;

    &-inner {
      padding: 10px;
      color: var(--el-text-color-primary);
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    &-operate {
      display: flex;
      align-items: center;
    }

    .operate-seq {
      font-size: 20px;
      line-height: 1;

      > button {
        line-height: 1;
      }
    }

    .operate-time {
      display: flex;
      color: var(--el-text-color-secondary);
      align-items: center;
      flex-grow: 1;
    }

    .operate-volume {
      font-size: 20px;
      line-height: 1;
    }

    .operate-rate {
      line-height: 1.5;
    }

    .rate-text {
      display: inline-block;
      height: 32px;
      padding: 0 4px;
      line-height: 32px;
      color: var(--el-text-color-primary);
      cursor: pointer;
      background: var(--el-fill-color-darker);
      border-radius: 4px;
    }
  }

  .audio {
    &-item {
      line-height: 1.5;
      cursor: pointer;

      &::before {
        display: inline-block;
        width: 10px;
        height: 10px;
        margin-right: 10px;
        background: #ddd;
        border-radius: 50%;
        content: '';
      }

      &.active {
        color: var(--el-color-primary);

        &::before {
          background: var(--el-color-primary);
        }
      }
    }
  }
</style>

<style>
  .audio-volume-popper {
    width: 60px !important;
    min-width: 60px !important;
  }

  .operate-popover-item.is-active {
    /* stylelint-disable-next-line */
    /* background: var(--el-dropdown-menuItem-hover-fill); */
    color: var(--el-text-color-primary);
  }
</style>

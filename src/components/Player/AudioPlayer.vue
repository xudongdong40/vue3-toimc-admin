<template>
  <div class="audio-player">
    <div class="audio-player-inner">
      <div class="audio-player-label">{{ title }}</div>
      <div class="audio-player-operate">
        <!-- 前后 -->
        <div class="operate-seq">
          <button class="icon prev" title="上一个" :disabled="!!prevsrc">上一个</button>
          <button class="icon play" title="播放">播放</button>
          <icon v-show="!state.playing" class="operate-play" type="VideoPlay" title="播放"></icon>
          <icon v-show="!state.playing" class="operate-pause" type="VideoPause" title="暂停"></icon>
          <button class="icon next" title="下一个" :disabled="!!nextsrc">下一个</button>
        </div>
        <!-- 时间进度 -->
        <div class="operate-time">
          <span class="time-current">{{ formatTime(state.time) }}</span>
          <d-slider
            v-model="state.time"
            :min="0"
            :max="current.total"
            :format-tooltip="formatTime"
            @change="handleTimeChange"
            @
            class="time-slider"
          ></d-slider>
          <span class="time-total">{{ formatTime(current.total) }}</span>
        </div>
        <!-- 音量控制 -->
        <div class="operate-volume">
          <el-popover>
            <template #reference>
              <button class="icon muted" @click="handleMutedClick"
                >{{ muted ? '已经静音' : '未静音' }}
              </button>
            </template>
            <d-slider
              v-model="state.volume"
              :min="0"
              :step="0.01"
              :max="1"
              vertical
              height="200px"
            ></d-slider>
          </el-popover>
        </div>

        <!-- 播放速度控制 -->
        <div class="operate-rate">
          <el-dropdown class="rate">
            <span class="rate-text"> 倍速 {{ formateRate(rate) }} </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  @click="handleRateChange(item.value)"
                  v-for="item in options.rateList"
                  :key="item.value"
                  >{{ item.label }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="operate-loop">
          <select class="select-loop" title="顺序播放">
            <option value="0" selected>顺序播放</option>
            <option value="1">随机播放</option>
            <option value="2">循环播放</option>
          </select>
          <button class="icon loop" loop="0" aria-hidden="true"></button>
        </div>
      </div>
    </div>
    <slot name="list">
      <ul>
        <li v-for="item in list" :key="item.id || item.src">{{ item.title }}</li>
      </ul>
    </slot>
  </div>
</template>

<script lang="ts">
  import { ClickOutside as vClickOutside } from 'element-plus'
  import { onMounted, ref, unref } from 'vue'
  import { Howl, Howler } from 'howler'

  function formatTime(secs: number) {

    const hours = Math.floor(secs / 3600) || 0
    const minutes = Math.floor(secs / 60) || 0
    const seconds = Math.floor(secs - hours * 3600 - minutes * 60) || 0
    if (hours) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }

    return minutes + ':' + String(seconds).padStart(2, '0')
  }

  function formateRate(rate:number) {
    return rate.toFixed(2) + 'x';
  }

  export default defineComponent({
    name: 'AudioPlayer',
    props: {
      list: {
        type: Array<{src:string,}>,
        default: () => []
      },
      src: { type: String, default: '' },
      prevsrc: { type: String, default: '' },
      nextsrc: { type: String, default: '' },
      title: { type: String, default: '' },
      autoplay: { type: Boolean, default: false },
      volume: { type: Number, default: 1 },
      muted: { type: Boolean, default: false },
      loop: { type: Boolean, default: false },
      rate: { type: Number, default: 1 },
    },
    emits: ['update:volume', 'update:muted', 'update:loop', 'update:rate'],
    setup(_props, { emit, slots, expose }) {
      const item = _props.list.filter((it) => it.src === _props.src)[0]
      const current = ref({
        total: item.duration,
        title: item.title
      })

      const state = reactive({
        time: 0,
        playing: false,
        volume: 1,
        // rate: 1,
        loop: 0,
        muted: false,
        src: '',
        prevsrc: '',
        nextsrc: '',
        list: []
      })

      const options = reactive({
        // 循环
        loopList: [
          {
            label: '顺序播放',
            value: '0'
          },
          {
            label: '随机播放',
            value: '1'
          },
          {
            label: '循环播放',
            value: '2'
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

      const player = ref(null)
      onMounted(() => {
        player.value = new Howl({
          src: [_props.src],
          // volume: _props.volume,
          // loop: _props.loop,
          // mute: _props.muted,
          // rate: _props.rate,
          onplay: () => {
            state.playing = true
            step()
          },
          onpause: () => {
            state.playing = false
          },
          onstop: () =>{
            state.playing = false
          },
          onend: () => {
            console.log('end')
          },
          onmute: () => {
            // TODO
          },
          onseek: (id, time) => {
            // TODO
            console.log('onseek', id, time)
          },
          // onvolume : (id, v) =>{
          //   console.log('onvolume',id,v);
          //   state.volume = v
          // },
          // onrate : (v) =>{
          //   state.rate = v;
          // },
        })
        if (_props.autoplay) {
          ;(player.value as any).play()
        }
      })

      let step = () => {
          if (!player.value) {
              return;
          }
          let playing = player.value.playing();
          if (!playing) {
              return;
          }

          let seek = player.value.seek();

          // 时间显示
          state.time = seek;
          // 继续跟进
          requestAnimationFrame(step);
      };


      computed(() => {
        const currentTime = (player.value as any).seek()
        current.value.time = currentTime
        current.value.total = (player.value as any).duration()
        current.value.title = _props.title
      })


      // watch(() => _props.volume, ()=>{
      //   // ;(player.value as any).volume(val)
      //   state.volume = _props.volume
      // })


      watch(
        () => _props.rate,
        (val) => {
          if (player.value) {
            ;(player.value as any).rate(val)
          }
        }
      )

      watch(()=>state.volume, (v)=>{
        console.log('volume', v, state.volume)
        ;(player.value as any).volume(v)
        emit('update:volume', state.volume)
      })

      expose({
        play() {},
        pause() {},
        stop() {},
        mute() {},
        prev() {},
        next() {}
      })

      // const volumePopoverRef = ref()
      // const onVolumeClickOutside = (onVolumeClickOutside = () => {
      //   unref(volumePopoverRef).popperRef?.delayHide?.()
      // })

      return {
        // label: '',
        currentTime: 0,
        currentTotalTime: 0,
        // volumeBtn: ref(),
        // onVolumeClickOutside,
        state,
        current,
        options,
        handleTimeChange(val) {
          player.value?.seek(val);
        },
        handleRateChange(val) {
          // state.rate = val
          player.value?.rate(val);
          emit('update:rate', val);
        },
        handleMutedClick: () => {
          console.log(_props.muted)
          let muted = !_props.muted
          ;(player.value as any).mute(muted)
          emit('update:muted', muted)
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
    background: #fff;
    &-inner {
    }
    &-operate {
      display: flex;
    }
    .operate-seq {
    }
    .operate-time {
      display: flex;
      flex-grow: 1;
    }
    .time-slider {
      margin-left: 10px;
      margin-right: 10px;
    }
  }
</style>

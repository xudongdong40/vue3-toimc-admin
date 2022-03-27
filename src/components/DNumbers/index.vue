<template>
  <div
    :class="['flex items-center', classes]"
    :style="{ 'font-size': typeof size === 'string' ? size : size + 'px', ...style }"
    v-bind="$attrs"
  >
    <slot name="prefix"></slot>
    <div :class="[{ 'break-all': breakAll }]">{{ result }}</div>
    <slot name="suffix"></slot>
  </div>
</template>

<script lang="ts">
  import { CSSProperties, defineComponent } from 'vue'
  import bigInt from 'big-integer'
  import { rand } from '@/utils'

  export default defineComponent({
    props: {
      begin: {
        type: [Number, String],
        default: 0
      },
      end: {
        type: [Number, String],
        default: 0,
        required: true
      },
      duration: {
        type: Number,
        default: 3000
      },
      setupDuration: {
        type: Number,
        default: 10
      },
      dot: {
        type: Number,
        default: 0
      },
      classes: {
        type: String,
        default: 'd-numbers'
      },
      auto: {
        type: Boolean,
        default: true
      },
      breakAll: {
        type: Boolean,
        default: false
      },

      size: {
        type: [Number, String],
        default: '16px'
      },
      style: {
        type: Object as PropType<CSSProperties>,
        default: () => ({})
      }
      // todo
      // 比如，可以由,或者.来分隔数据
      // split: {
      //   type: String,
      //   default: ''
      // },
      // 比如，可以设置单位，千，百，万，亿，兆
      // unit: {
      //   type: String as PropType<>,
      //   default: '',
      // }
      // 比如，用户可以定义format格式
      // format: {
      //   type: String as PropType<>,
      //   default: '',
      // }
    },
    setup(props, { expose }) {
      const { setupDuration } = unref(props)
      const { begin, end, dot, duration } = toRefs(props)

      const status = ref(false)
      const pauseFlag = ref(false)

      const result = ref<string>('')

      let ctrl

      function getTimesNum(number, times) {
        const str = number.toString()
        if (str.indexOf('.') !== -1) {
          return bigInt(str.split('.')[0])
            .multiply(times)
            .add(
              bigInt(str.split('.')[1])
                .multiply(times)
                .divide(bigInt(10).pow(str.split('.')[1].length))
            )
        } else {
          return bigInt(number.toString()).multiply(times)
        }
      }

      function format(number, digits) {
        const str = number.toString()
        if (digits > 0) {
          if (str.indexOf('.') === -1) {
            // number中无"."
            return (str + '.').padEnd(digits + str.length + 1, '0')
          } else {
            // number中无中有".""
            if (str.split('.')[1].length > digits) {
              return str.split('.')[0] + '.' + str.split('.')[1].substr(0, digits)
            } else {
              return str.split('.')[0] + '.' + str.split('.')[1].padEnd(digits, '0')
            }
          }
        } else {
          return str.substr(0, str.length - digits)
        }
      }

      function init() {
        clearInterval(ctrl)

        status.value = true

        // 放大dot的对应的点数
        let times
        let origin
        let target

        // 如果end包含小数点，放大的倍数需要大于小数点的位数
        if (end.value.toString().indexOf('.') !== -1) {
          const dotsPart = end.value.toString().split('.')[1]
          if (dot.value > dotsPart?.length || 0) {
            // 指定的小数点数大于end的小数点数
            times = bigInt(10).pow(dot.value)
          } else {
            times = bigInt(10).pow(dotsPart.length)
          }
        } else {
          // 不包含小数点
          times = bigInt(10).pow(dot.value)
        }

        origin = getTimesNum(begin.value, times)
        target = getTimesNum(end.value, times)

        // 计算定时器的倍率
        const rate = bigInt(duration.value).divide(setupDuration)

        ctrl = setInterval(() => {
          // 计算step, 并加入随机性，这样就不会有很多0
          let step = rate.compareAbs(bigInt.zero) !== 0 ? target.minus(origin).divide(rate) : target
          if (step.compareAbs(bigInt.zero) === 1) {
            const len = step.toString().length
            step = bigInt(rand(len))
          } else {
            step = bigInt(1)
          }
          // 暂停
          if (pauseFlag.value) return
          origin = origin.add(step)

          // format
          let divide = origin.divmod(times)

          result.value =
            divide.quotient.toString() +
            (dot.value > 0 ? '.' : '') +
            (divide.remainder.toString() !== '0'
              ? divide.remainder.toString().length < dot.value
                ? divide.remainder.toString().padEnd(dot.value, '0')
                : divide.remainder.toString()
              : '')

          // 如果达到目标值，则停止
          if (origin.compareAbs(target) === 1) {
            result.value = format(end.value, dot.value)
            status.value = false
            clearInterval(ctrl)
          }
        }, setupDuration)
      }

      onMounted(() => {
        if (props.auto) {
          init()
        } else {
          result.value = format(begin.value, dot.value)
        }
      })

      onBeforeUnmount(() => {
        clearInterval(ctrl)
        status.value = false
        ctrl = null
      })

      function start() {
        init()
      }

      function terminate() {
        status.value = false
        pauseFlag.value = false
        clearInterval(ctrl)
        // result.value =
      }

      async function reset() {
        terminate()
        result.value = format(begin.value, dot.value)
      }

      function pause() {
        pauseFlag.value = true
      }

      function resume() {
        pauseFlag.value = false
      }

      expose({
        status,
        start,
        terminate,
        reset,
        pause,
        resume
      })

      return {
        result
      }
    }
  })
</script>

<style scoped lang="scss">
  .break-all {
    word-break: break-all;
  }
</style>

<template>
  <div class="wrapper">
    <div class="weather-box">
      <div class="weather-icon-wrapper">
        <img :src="weatherIcon" alt="weather icon" />
      </div>
      <div class="weather-text-wrapper">
        <div class="temperature">{{ temperature }}°</div>
        <div class="city">{{ cityName }} | {{ weatherText }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import defaultIcon from '@/assets/svg/weather-animation-icon/rain.svg'
  // import defaultIcon from './weather-static-icon/rain.svg'

  // import { ElNotification } from 'element-plus'
  export default defineComponent({
    name: 'Weather',
    setup() {
      // const positionCSS = computed(() => mapPosition(props.componentSetting.position))
      const cityName = ref('')
      const adcode = ref('')

      const weatherIcon = ref(defaultIcon)
      const temperature = ref('24')
      const weatherText = ref('未知')

      // const getWeather = async () => {
      //   // const res = await fetch(`${apiURL}/tapi/amap/v3/weather/weatherInfo?extensions=base&city=${adcode.value}`)
      //   // const { status, lives } = await res.json()
      //   // if (status === '1') {
      //   //   const { weather, temperature: _temperature } = lives[0]
      //   //   weatherIcon.value = getWeatherIconURL(weather, props.componentSetting.animationIcon)
      //   //   weatherText.value = weatherFormatter(weather)
      //   //   temperature.value = _temperature
      //   // }
      // }

      return {
        // positionCSS,
        cityName,
        adcode,
        weatherIcon,
        weatherText,
        temperature
      }
    }
  })
</script>
<style lang="scss" scoped>
  .wrapper {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
  }

  .weather-box {
    display: flex;

    .weather-icon-wrapper {
      display: flex;
      align-items: center;

      img {
        width: 4.4em;
        height: 4.4em;
      }
    }

    .weather-text-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.4em;
      justify-content: space-around;

      .temperature {
        font-size: 2.8em;
      }

      .city {
        padding-right: 0.8em;
        font-size: 0.8em;
      }
    }
  }
</style>

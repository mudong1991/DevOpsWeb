<template>
  <div class="main-header clearfix">
    <div class="col-sm-12 col-md-6"><strong>位置:</strong> </div>
    <div class="col-sm-12 col-md-6">
      <strong><i class="fa fa-clock-o"></i> 时间：</strong> <span v-text="`${datetime.getFullYear()}年${datetime.getMonth()}月${datetime.getDate()}日 ${datetime.getHours()}:${datetime.getMinutes()}:${datetime.getSeconds() < 10 ? '0' + datetime.getSeconds(): datetime.getSeconds()} 星期${week}`"></span>
      <small class="seg"></small>
      <span v-if="weather !== null">
        <img :src="'/static/images/weather/' + weather.now.cond_code + '.png'" width="22" height="22">
        <strong>天气：</strong><span v-text="`${weather.basic.admin_area}-${weather.basic.location}    ${weather.now.cond_txt}    ${weather.now.wind_sc}   ${weather.now.tmp}°C`"></span>
      </span>
      <span v-else>
        <i class="fa fa-sun-o"></i><strong>天气：</strong> --
      </span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import systemService from '@/services/systemService';
  import {locationIP} from '@/config/config';

  export default {
    props: {

    },
    data () {
      return {
        datetime: new Date(),
        weather: null
      };
    },
    computed: {
      week () {
        let weekDay = this.datetime.getDay();
        let weekDayZh = '一';
        if (weekDay === 0) {
          weekDayZh = '天';
        } else if (weekDay === 1) {
          weekDayZh = '一';
        } else if (weekDay === 2) {
          weekDayZh = '二';
        } else if (weekDay === 3) {
          weekDayZh = '三';
        } else if (weekDay === 4) {
          weekDayZh = '四';
        } else if (weekDay === 5) {
          weekDayZh = '五';
        } else if (weekDay === 6) {
          weekDayZh = '六';
        }
        return weekDayZh;
      }
    },
    methods: {
        getCurrentTime () {
          this.datetime = new Date();
        }
    },
    created () {
      // 获取当前时间
      this.getTimeT = setInterval(this.getCurrentTime, 1000);
      // 获取天气
      systemService.getWeather({'location_ip': locationIP}, false, true).then(({data}) => {
        if (data.HeWeather6 !== undefined) {
          this.weather = data.HeWeather6[0];
        } else {
          this.weather = null;
        }
      });
    },
    destroyed () {
      clearInterval(this.getTimeT);
    },
    mounted () {
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .main-header{
    width: 100%;
    height: auto;
    line-height: 30px;
    text-align: left;
    border-bottom: 1px solid #DDDDDD;
  }
  .seg{
    width: 1px;
    border-right: 1px solid #cccccc;
    margin: 0 6px;
  }
</style>

<template>
  <div class="main-footer clearfix">
    <div class="col-sm-12 col-md-7 text-left">
      <img src="/static/images/jc.png"/>{{ copyright }}
    </div>

    <div class="col-sm-12 col-md-5 text-left">
      <strong><i class="fa fa-clock-o"></i> 时间：</strong> <span v-text="`${datetime.getFullYear()}年${datetime.getMonth()}月${datetime.getDate()}日 ${datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours()}:${datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes()}:${datetime.getSeconds() < 10 ? '0' + datetime.getSeconds(): datetime.getSeconds()} 星期${week}`"></span>
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
  import {copyright, locationIP} from '@/config/config';
  import baseService from '@/services/baseService';

  export default {
    props: {

    },
    data () {
      return {
        copyright,
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
      baseService.getWeather({'location_ip': locationIP}, false, true).then(({data}) => {
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
  .main-footer{
    width: 100%;
    height: 100%;
    padding-top: 8px;
    padding-bottom: 6px;
    text-align: center;
    border-top: 1px solid #DDDDDD;
  }

</style>

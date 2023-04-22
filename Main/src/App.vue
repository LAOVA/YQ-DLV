<template>
  <div class="box">
    <div class="box-left">
      <div class="boxBg">
        <div class="box-left-card" v-if="store.today.adddaily">
          <section>
            <div>新增本土确诊</div>
            <div>{{ store.today.adddaily.addcon_new }}</div>
          </section>
          <section>
            <div>新增确诊</div>
            <div>{{ store.today.adddaily.addcon_new2 }}</div>
          </section>
          <section>
            <div>现存本土确诊</div>
            <div>{{ store.today.localconNum }}</div>
            <div>较昨天<span>{{ store.today.adddaily.addlocIncrNum_new }}</span></div>
          </section>
          <section>
            <div>现存确诊</div>
            <div>{{ store.today.econNum }}</div>
            <div>较昨天<span>{{ store.today.adddaily.addecon_new }}</span></div>
          </section>
          <section>
            <div>现存重症确诊</div>
            <div>{{ store.today.heconNum }}</div>
            <div>较昨天<span>{{ store.today.adddaily.addhecon_new }}</span></div>
          </section>
          <section>
            <div>累计确诊</div>
            <div>{{ store.today.adddaily.addcon }}</div>
            <div>较昨天<span>{{ store.today.adddaily.addcon_new }}</span></div>
          </section>
          <section>
            <div>累计境外输入</div>
            <div>{{ store.today.jwsrNum }}</div>
            <div>较昨天<span>{{ store.today.adddaily.addjwsr_new }}</span></div>
          </section>
          <section>
            <div>累计治愈</div>
            <div>{{ store.today.adddaily.addcure }}</div>
            <div>较昨天<span>{{ store.today.adddaily.addcure_new }}</span></div>
          </section>
          <section>
            <div>累计死亡</div>
            <div>{{ store.today.adddaily.adddeath }}</div>
            <div>较昨天<span>{{ store.today.adddaily.adddeath_new }}</span></div>
          </section>

        </div>
        <div class="box-left-pie">
          <div id="Pie"></div>
        </div>
        <div class="box-left-line">
          <div id="Line"></div>
        </div>
      </div>
    </div>
    <div class="box-center">
      <div id="cnMap"></div>
    </div>
    <div class="box-right">
      <table class="pure-table">
        <thead>
          <tr>
            <th>城 市</th>
            <th>新 增</th>
            <th>现 存</th>
          </tr>
        </thead>
        <transition-group enter-active-class="animate__animated animate__fadeIn" tag="tbody">
          <tr :key="item.city" v-for="item in store.Item">
            <td>{{ item.city }}</td>
            <td>{{ item.conadd }}</td>
            <td>{{ item.econNum }}</td>
          </tr>
        </transition-group>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from './stores'
import { onMounted } from 'vue';
import * as echarts from 'echarts';
import './assets/china'
import { countNum } from './utils/countNum'
import 'animate.css'

const store = useStore()

onMounted(async () => {
  await store.getList()
  await store.getToday()
  await store.getGuangdong()
  const citys = store.list
  const data = countNum(citys)
  initChart(data)
  initPie(data)
  initLine(data)
})


const initChart = (data: {}) => {
  const charts = echarts.init(document.querySelector('#cnMap') as HTMLElement)
  // var option = {};
  charts.setOption({
    geo: {
      map: "china",
      aspectScale: 0.8,
      layoutCenter: ["50%", "50%"],
      layoutSize: "100%",
      itemStyle: {
        areaColor: {
          type: "linear-gradient",
          x: 0,
          y: 1200,
          x2: 1000,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#152E6E", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#0673AD", // 50% 处的颜色
            },
          ],
          global: true, // 缺省为 false
          shadowColor: "#0f5d9d",
          shadowOffsetX: 0,
          shadowOffsetY: 15,
          opacity: 0.5,
        },
      },
      emphasis: {
        areaColor: "#0f5d9d",
      },
      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            areaColor: "rgba(0, 10, 52, 1)",
            borderColor: "rgba(0, 10, 52, 1)",
            opacity: 0,
            label: {
              show: false,
              color: "#009cc9",
            },
          },
          label: {
            show: false,
            color: "#FFFFFF",
            fontSize: 12,
          },
        },
      ],
    },
    series: [
      {
        type: "map",
        // selectedMode: "multiple",
        map: "china",
        aspectScale: 0.8,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: "100%",
        zoom: 1, //当前视角的缩放比例
        // roam: true, //是否开启平游或缩放
        scaleLimit: {
          //滚轮缩放的极限控制
          min: 1,
          max: 1,
        },
        label: {
          show: true, //显示省名
          color: "#FFFFFF",
          fontSize: 12,
        },
        itemStyle: {
          areaColor: "#0c3653",
          borderColor: "#1cccff",
          borderWidth: 1.8,
        },
        emphasis: {
          areaColor: "#56b1da",
          label: {
            show: true,
            color: "#fff",
          },
        },
        data: data,
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        symbol: 'pin', // 角标
        symbolSize: [45, 45],
        label: {
          show: true,
          color: '#FFFFFF',
          formatter: function (value: any) {
            return value.data.econNum
          }
        },
        itemStyle: {
          color: '#1E90FF', //标志颜色
        },
        data: data,
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        zlevel: 1
      },
    ],
  })
  charts.on('click', (e: any) => {
    if (e.data) {
      store.Item = e.data.child;
    } else {
      store.Item = []
    }
  })
}

const initPie = (value: any) => {
  const data = value.sort((a: any, b: any) => b.econNum - a.econNum).splice(0, 10)
  const charts = echarts.init(document.querySelector('#Pie') as HTMLElement)
  charts.setOption({
    backgroundColor: "#223651",
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '现存确诊人数',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 15,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: true
        },
        data: data.map((v: any) => {
          return {
            name: v.name,
            value: v.econNum,
          }
        })
      }
    ]
  })

}

const initLine = (value: any) => {
  const charts = echarts.init(document.querySelector('#Line') as HTMLElement)
  charts.setOption({
    title: {
      text: '广东：最近7天新增确诊人数变化',
      textStyle: {
        fontSize: 14,
        color: '#fff'
      }
    },
    xAxis: {
      type: 'category',
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      },
      data: store.guangdong.map((v: any) => {
        return v.date
      }),
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      },
    },
    series: [
      {
        data: store.guangdong.map((v: any) => {
          return v.conadd
        }),
        type: 'line',
        smooth: true,
        color: '#41b0db'
      }
    ],
    tooltip: {
      trigger: 'axis'
    },

  })
}

</script>

<style lang="less">
@itemColor: #41b0db;
@itemBg: #223651;
@itemBorder: #212028;

*,
#app {
  margin: 0;
  padding: 0;
}

body,
html,
#app {
  width: 100%;
  height: auto;
  background: url(./assets/bg.jpg) no-repeat;
  // background-size: 100%;
  background-size: cover;
}

#app {
  max-width: 100%;
}

.box {
  display: flex;

  height: 100%;

  &-left {
    width: 400px;
    color: #fff;

    .boxBg {
      height: auto;
      background-color: @itemBg;
      border: 2px solid #cbcbcb;
    }

    &-card {
      display: grid;
      grid-template-columns: auto auto auto;
      grid-template-rows: auto auto auto;
      border: 2px solid #cbcbcb;

      section {
        background-color: @itemBg;
        border: 1px solid @itemBorder;
        padding: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        div:nth-child(2) {
          color: @itemColor;
          padding: 10px 0;
          font-size: 20px;
          font-weight: 600;
        }

        span {
          color: #cbcbcb;
          font-size: 14px;
        }
      }
    }

    &-pie {
      height: 300px;
      margin-top: 20px;

      #Pie {
        width: 100%;
        height: 100%;
      }
    }

    &-line {
      height: 300px;
      margin-top: 20px;
      padding-left: 10px;
      margin-bottom: -30px;

      #Line {
        width: 100%;
        height: 100%;
      }
    }
  }

  &-center {
    padding: 0 10px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-self: center;

    #cnMap {
      width: 100%;
      height: 100%;
    }
  }

  &-right {
    height: auto;
    width: 400px;
    color: #fff;
    overflow: hidden;


    table {
      width: 90%;
      border-collapse: collapse;
      border-spacing: 0;
    }

    td,
    th {
      padding: 0;
      text-align: center;
    }

    .pure-table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      empty-cells: show;
      border: 2px solid #cbcbcb;
    }

    .pure-table td,
    .pure-table th {
      border-left: 1px solid @itemBorder;
      font-size: inherit;
      margin: 0;
      overflow: visible;
      padding: .5em 1em;
    }

    .pure-table thead {
      background-color: @itemColor;
      color: #fff;
      text-align: center;
      vertical-align: bottom;

      tr {
        display: table-row;
        vertical-align: inherit;
        border-color: inherit;
      }
    }

    .pure-table td {
      background-color: @itemBg;
      border-top: 1px solid @itemBorder;
    }

    .pure-table-bordered td {
      border-bottom: 1px solid @itemBorder;
    }

    .pure-table-bordered tbody>tr:last-child>td {
      border-bottom-width: 0;
    }
  }
}
</style>
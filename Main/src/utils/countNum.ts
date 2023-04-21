// 统计各个省份的城市的数据
import { geoCoordMap } from '../assets/geoMap'
export const countNum = (citys: any) => {
  let city: any = {}
  citys.map((v: any) => {
    if (!city[v.province]) {
      let obj = {
        name: v.province,
        conadd: 0,
        econNum: 0,
        value: geoCoordMap[v.province],
        child: []
      }
      city[v.province] = obj
    }
    city[v.province].conadd += v.conadd
    city[v.province].econNum += v.econNum
    city[v.province].child.push(v)
  })

  let result: Array<object> = []
  for (let k in city) {
    result.push(city[k])
  }
  return result
}
import { defineStore } from 'pinia'
import { getList, getToday, getGuangdong } from '../server'
import { parseJSONP } from '../utils/parseJSONP'
export const useStore = defineStore({
  id: 'conter',
  state: () => ({
    list: [],  // 接口总数据
    Item: <any>[],  // 存放地图点击省份的数据
    today: <any>{},  // 今日总数统计
    guangdong: <any>[]  // 广东数据
  }),
  actions: {
    async getList() {
      const result = await getList()
      this.list = parseJSONP(result.data).result.data
    },
    async getToday() {
      const result = await getToday()
      this.today = parseJSONP(result.data).data
    },
    async getGuangdong() {
      const result = await getGuangdong()
      this.guangdong = result.data.data.historylist.splice(0, 7)
    }
  }
})

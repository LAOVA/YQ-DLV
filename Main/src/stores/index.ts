import { defineStore } from 'pinia'
import { getList, getToday, getGuangdong } from '../server'
import { parseJSONP } from '../utils/parseJSONP'
export const useStore = defineStore({
  id: 'conter',
  state: () => ({
    list: [],
    Item: <any>[],
    today: <any>{},
    guangdong: <any>[]
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

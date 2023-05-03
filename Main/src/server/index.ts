import axios from 'axios'

const server = axios.create({
  baseURL: "http://localhost:3000"
})


export const getList = () => server.get('/api/list').then(res => res.data)

export const getToday = () => server.get('/api/today').then(res => res.data)

export const getGuangdong = () => server.get('/api/guangdong').then(res => res.data)


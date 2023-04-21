import express, { Express, Router, Request, Response } from 'express'
import axios from 'axios'
const app: Express = express(); //create an Express server object
app.use('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); //allow any domain to access the content 
  next()
})

const router: Router = express.Router(); // create an Express "Router" which can route GET, PUT, PATCH, and HEAD requests to the appropriate methods

app.use('/api', router)

router.get('/list', async (req: Request, res: Response) => {
  const result = await axios.get('https://news.sina.com.cn/project/fymap/ncp2020_feiyan_procity_loc_data.jsonp?callback=callbacklocation')
  res.json({
    data: result.data
  })
})
router.get('/today', async (req: Request, res: Response) => {
  const result = await axios.get('https://news.sina.com.cn/project/fymap/ncp2020_full_data.json')
  res.json({
    data: result.data
  })
})
router.get('/guangdong', async (req: Request, res: Response) => {
  const result = await axios.get('https://gwpre.sina.cn/interface/news/ncp/data.d.json?mod=province&province=guangdong')
  res.json({
    data: result.data
  })
})

app.listen(3000, () => {
  console.log('Example app listening on http://localhost:3000')
});
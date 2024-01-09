



// import express, { ErrorRequestHandler } from 'express'
// import { print } from 'listening-on'
// import { createKnex } from './db'
// import { RequestLog } from './types'
// import { HttpError } from './http.error'
// import { env } from './env'
// import express from 'express'

// let knex = createKnex()
// let app = express()

// app.use((req, res, next) => {
//   console.log(req.method, req.url)
//   let row: RequestLog = {
//     method: req.method,
//     url: req.url,
//     user_agent: req.headers['user-agent'] || null,
//   }
//   knex('request_log')
//     .insert(row)
//     .catch(err => {
//       console.error('failed to insert request_log:', err)
//     })
//   next()
// })

// app.use(express.static('public'))
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

// app.get('/logs', async (req, res, next) => {
//   try {
//     let requests = await knex('request_log')
//       .select('id', 'method', 'url', 'user_agent')
//       .orderBy('id', 'desc')
//       .limit(25)
//     res.json({ requests })
//   } catch (error) {
//     next(error)
//   }
// })

// app.use((req, res, next) =>
//   next(
//     new HttpError(
//       404,
//       `route not found, method: ${req.method}, url: ${req.url}`,
//     ),
//   ),
// )


// let port = env.PORT
// app.listen(port, () => {
//   print(port)
// })
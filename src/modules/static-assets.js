import { join } from 'path'
import express from 'express'

export default async function (app) {
  app.use(express.static(join(__dirname, '..', 'static')))
}

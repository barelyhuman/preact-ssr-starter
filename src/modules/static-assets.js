import { join } from 'path'
import express from 'express'

/** @param {import("../../app").App} app */
export default async function (app) {
  app.use('/static', express.static(join(__dirname, 'static')))
}

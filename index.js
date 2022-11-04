const dotenv = require('dotenv').config()
const express = require('express')
const { Client } = require('@notionhq/client')
const newItem = require('./services/add-item')
const addItem = newItem.addToDatabase;

const app = express()
app.use(express.json())

const databaseId = process.env.NOTION_DATABASE_ID

app.post('/api/v1/add-item', async (req, res) => {
  const username = req.body.username
  const name = req.body.name
  const age = req.body.age
  const status = req.body.status
  const date = req.body.date

  const response = await addItem(databaseId, username, name, age, status, date);
  res.json({ data: "data entered successfully" })
})

app.listen(3200, () => {
  console.log(`notion_db running on http://localhost:${3200}`)
})

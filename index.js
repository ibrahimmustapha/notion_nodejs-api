const dotenv = require('dotenv').config()
const express = require('express')
const { Client } = require('@notionhq/client')

const app = express()
app.use(express.json())

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const databaseId = process.env.NOTION_DATABASE_ID

app.get('/', (req, res) => {
  res.json({ version: 'notion_db 0.0.1' })
})

async function addToDatabase(databaseId, username, name, age, status, date) {
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        ID: {
          type: 'title',
          title: [
            {
              type: 'text',
              text: {
                content: username,
              },
            },
          ],
        },
        Name: {
          type: 'rich_text',
          rich_text: [
            {
              type: 'text',
              text: {
                content: name,
              },
            },
          ],
        },
        Age: {
          type: 'number',
          number: age,
        },
        Status: {
          type: 'checkbox',
          checkbox: status,
        },
        Date: {
          // Date is formatted as YYYY-MM-DD or null
          type: 'date',
          date: date,
        },
      },
    })
    console.log(response)
  } catch (error) {
    console.error(error.body)
  }
}

addToDatabase(databaseId, 'musib581', 'Mustapha Ibrahim', 34, true, {
  start: '2021-05-17',
  end: null,
})

app.listen(3200, () => {
  console.log(`notion_db running on http://localhost:${3200}`)
})

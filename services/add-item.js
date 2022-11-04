const dotenv = require('dotenv').config()
const { Client } = require('@notionhq/client')

const notion = new Client({ auth: process.env.NOTION_TOKEN })

exports.addToDatabase = async (databaseId, username, name, age, status, date) => {
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        id: {
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
        name: {
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
        age: {
          type: 'number',
          number: age,
        },
        status: {
          type: 'checkbox',
          checkbox: status,
        },
        date: {
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

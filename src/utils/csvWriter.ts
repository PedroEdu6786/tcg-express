const createCsvWriter = require('csv-writer').createObjectCsvWriter
const csvWriter = createCsvWriter({
  path: 'decks.csv',
  header: [
    { id: 'id', title: 'Id' },
    { id: 'name', title: 'Name' },
    { id: 'userId', title: 'UserId' },
  ],
})

export const writeOnCsv = async (records: any) => {
  await csvWriter
    .writeRecords(records) // returns a promise
    .then(() => {
      console.log('...Done')
    })
}

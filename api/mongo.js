const mongoose = require('mongoose')

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env
const uri = NODE_ENV === 'test' ? MONGO_DB_URI_TEST : MONGO_DB_URI

// connection to mongoose]
mongoose.connect(uri)
  .then(() => {
    console.log('Data base connected')
  })
  .catch(err => {
    console.error(err)
  })

// process.on('uncaughtException', (err) => {
//     console.error('MongoDB Error: ', err);
//     mongoose.disconnect()
// })

// function closeConnection() {
//     mongoose.connection.close()
// }

// const note = new Note({
//     content: 'MongoDB is awesome',
//     date: new Date(),
//     important: true
// })

// note.save()
//     .then((res) => {
//         console.log(res)
//         mongoose.connection.close()
//     })
//     .catch((err) => {
//         console.error(err);
//     })

// module.exports = Note

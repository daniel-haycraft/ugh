const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
// const { appendFile } = require('fs')

app.use(cors())
app.use(express.json())

var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '953b5cb7f3a846ec80f6be3fbf0dde97',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

app.use(express.static(path.join(__dirname, '/public')))
app.use('/js', express.static(path.join(__dirname, '/public/main.js')))
app.use('/styles', express.static(path.join(__dirname, '/public/main.css')))
app.use("/" ,express.static(path.join(__dirname, "/public")));
// app.use("/public", express.static(path.join(__dirname, "../public")));

const buddies = require('./db.json')

// app.get('/api/test', (req, res) =>{
//     console.log('endpoint test')
//     res.sendStatus(418)
// })
app.get('/api/buddies', (req, res) => {
    rollbar.info('working .(get)')
    res.status(200).send(buddies)
})

app.delete('/api/buddies/:index', (req, res) => {
    const deleteIndex = +req.params.index
    buddies.splice(deleteIndex, 1)
    rollbar.info('termiated fluffer')
    res.status(200).send(buddies)
})
app.post('/api/buddies', (req, res)=> {
    const { dogName } = req.body;
    buddies.push({
        dogName, 
    });
    const index = buddies.findIndex(student => {
        return student === dogName
    })
    try{
        if (index ===  -1 && dogName !== ''){
            rollbar.log('fullys added successfully')
            res.status(200).send(buddies)
        } else if (dogName === ''){
            rollbar.error("no name provided man!")
            res.status(400).send('you need to put in a name bruv')
        } else {
        rollbar.error('fluffers name already provided')
            res.status(400).send('provide a last name, same name already initialize')
        }
    } catch(err){
     console.log(err)
    }
})
const port = process.env.PORT || 5050
// hey matt!
app.listen(port, () => console.log(`Server is partying on port ${port} till it breaks`))
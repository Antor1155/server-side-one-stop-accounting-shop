const express = require("express")
const cors = require("cors")
require("dotenv").config()

const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_KEY);

// for firebase-function upload only 
const functions = require('firebase-functions');

const app = express()
app.use(express.json())
app.use(cors())

// google sheet automation process 
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const creds = require("./gsheet_api_key.json")

const jwt  = new JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.file',
      ],
  });

const spreadsheetId = "1h_VVzALC56PPncpRaGy_CGWZeXrUm2ACPZqKB6-a3co"


// test get for spread sheet update
app.get("/test/testing-for-google-spreadsheets", async (req, res) => {
    const data = { name: "axxxsyksdnf", email: "slfj@dsf.com" }
    try{
        const doc = new GoogleSpreadsheet(spreadsheetId, jwt);
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0]
    
        await sheet.addRow(data)
    }catch(error){
        console.log(error)
    }
    res.json("spreed sheett update working perfect")
})

// edit product 
app.post("/formdata/:section", async (req, res) => {

    try {
        const section = req.params.section
        const data = req.body;

        // updating google speedsheet from the data received
        const doc = new GoogleSpreadsheet(spreadsheetId, jwt);
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0]
        await sheet.addRow(data)
        console.log(sheet.title, data)

        if (section === "indexbig") {
            resend.emails.send({
                from: "OSAS email funnel <email@onestopaccountingshop.com>",
                to: ["Info@onestopaccountingshop.com"],
                subject: "Requested meeting",
                html: `<strong> Email funnel to meeting request<strong>
                        <p> Email: ${data.email} </p>
                        <p> Name: ${data.name} </p>
                        <p> Phone: ${data.phone} </p>
                        <p> Business name: ${data.business} </p>
                        <p> Schedule req time: ${data.dateTime} </P>
                `
            }).then(data => {
                res.status(200).json("received")
            }).catch(error => console.log("indexbig***: ", error))

        } else if (section === "subscription") {
            resend.emails.send({
                from: "OSAS email funnel <email@onestopaccountingshop.com>",
                to: ["Info@onestopaccountingshop.com"],
                subject: "Email subscription",
                html: `<strong> email subscription<strong>
                        <p> Email: ${data.email} </p>
                        
                `
            }).then(data => {
                res.status(200).json("received")
            }).catch(error => console.log("indexbig***: ", error))

        } else if (section === "cform") {
            resend.emails.send({
                from: "OSAS email funnel <email@onestopaccountingshop.com>",
                to: ["Info@onestopaccountingshop.com"],
                subject: "Contact Email",
                html: `<strong>Contact email<strong>
                    <p> Email: ${data.email} </p>
                    <p> Name: ${data.name} </p>
                    <p> Phone: ${data.phone} </p>
                    <p> Message: ${data.message} </p>
                        
                `
            }).then(data => {
                res.status(200).json("received")
            }).catch(error => console.log("indexbig***: ", error))

        }

        res.json(data)

    } catch (error) {
        console.log("error*** : ", error)
    }

})

// this part for node.js 
//delete this for firebase
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//     console.log("server is runnign on port", port)
// })

// this part is for firebase
exports.app = functions.https.onRequest(app)
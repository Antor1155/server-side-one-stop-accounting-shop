const express = require("express")
const cors = require("cors")
const { Resend } = require('resend');

// for firebase upload only 
const functions = require('firebase-functions');

const resend = new Resend('re_CH2fsfpz_Hwc5FBhZFK9ALSZUaSXxY5dX');

const app = express()

//delete this for firebase
// const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())

// edit product 
app.post("/formdata/:section", (req, res) => {

    try {
        const section = req.params.section

        const data = req.body;

        if (section === "indexbig") {
            resend.emails.send({
                from: "OSAS email funnel <email@onestopaccountingshop.com>",
                to: ["antor@socialengagementgroup.com"],
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
                to: ["antor@socialengagementgroup.com"],
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
                to: ["antor@socialengagementgroup.com"],
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

    } catch (error) {
        console.log("error*** : ", error)
    }

})

// this part for node.js 
// app.listen(port, () => {
//     console.log("server is runnign on port", port)
// })

// this part is for firebase
exports.app = functions.https.onRequest(app)
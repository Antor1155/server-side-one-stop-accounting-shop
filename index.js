const express = require("express")
const cors = require("cors")

const app = express()

//delete this for firebase
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())

// edit product 
app.patch("/product/:id", (req, res)=>{
    connectToDb()
    const id = req.params.id
    const update = req.body;

    SingleVariation.findByIdAndUpdate(id, update)
    .then(result => res.status(200).json(result))
    .catch(error => console.log(error))
})



app.listen(port, ()=>{
    console.log("server is runnign on port", port)
})
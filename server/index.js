const express = require('express')
const Stripe = require('stripe')
const cors = require('cors')

const app = express()
const stripe = new Stripe('sk_test_51NSJ1MEqVxv7pAKJ0U8f7kuyQJBwBMVsOdwoOA5zxVpwYPTcRwJU2CWUSCmZmbmG90mw8Ay5f0zOfxupWLpMR92200lgQ51Weo')

app.use(cors({origin: 'http://localhost:5173'}))
app.use(express.json())

app.post('/api/checkout', async (req,res) => { 
    try {
        const {id,amount} = req.body
    
    const payment = await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: 'Description',
        payment_method:id,
        confirm:true
    })
    console.log(payment)
    res.send({message: 'successfull payment'})
    } catch (error) {
        res.json({message:error.raw.message})
    }

})

app.listen(3001, () =>{ 
console.log('server on port 3001')
})
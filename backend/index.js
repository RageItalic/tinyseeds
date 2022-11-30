const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51M9GvcJYmNxO345SdKOJFgFm1WvIV7A8rwzRTrSnQCsvfrG44YDS9kdwGqAwQopjPqRGeDzkxak8JQ4VnQyPOFT900k95HAA75"
);
const PORT = 8080;

//this allows us to access JSON data sent from frontend to the backend
app.use(bodyParser.json());

//this allows the frontend to talk to the backend
app.use(cors());

//Stripe
app.post("/create-checkout-session", async (req, res) => {
  //let orderDetails = req.body;
  let orderDetails = [
    {
      price: "price_1M9hkMJYmNxO345SESnrsx1x",
      quantity: 1,
    },
    {
      price: "price_1M9hlaJYmNxO345SAPMAk955",
      quantity: 3,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    line_items: orderDetails,
    mode: "payment",
    success_url: `http://127.0.0.1:5173/checkout/success`,
    cancel_url: `http://127.0.0.1:5173/checkout/error`,
  });

  console.log(session.url);
  res.status(200).json({ url: session.url });
});

app.get("/", (request, response) => {
  console.log("pinged: ", request.url, " the path is: ", request.path);
  console.log("params if any: ", request.params);
  response.status(200).json({
    message: "Backend working! Message to front end being sent!",
  });
});

app.post("/sendData", (request, response) => {
  console.log("Data should be in ", request.body);
  //accessing data example
  let dataHolder = request.body;

  //manipulating data example (if necessary)
  dataHolder["received"] = true;
  dataHolder["message"] = "Data received and manipulated and sent back.";
  dataHolder["favFoods"].push("Thai Green Curry");

  //sending data back to frontend example
  response.status(200).json(dataHolder);
});

app.listen(PORT, () => {
  console.log(`Server started. Listening on http://localhost:${PORT}`);
});

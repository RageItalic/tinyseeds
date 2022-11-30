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

// app.use(express.static("public"));

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1M9hnaJYmNxO345SLhLn5Lto",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:8080/success`, //NEEDS TO BE UPDATED
    cancel_url: `http://localhost:8080/error`,
  });

  console.log(session.url);
  res.status(200).json({ url: session.url });
});

app.get("/success", (req, res) => {
  console.log("Stripe succeeded, Poop\n");
});
app.get("/error", (req, res) => {
  console.log("Stripe failed, Poop\n");
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

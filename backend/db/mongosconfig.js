const mongoose = require("mongoose");

mongoose
  .connect(
  //  "mongodb+srv://naveedkapoorkhan:1wwgDAJUCLCegm8n@cluster0.sccr1tc.mongodb.net/Farmer?retryWrites=true&w=majority",
     "mongodb+srv://kaushaki1771be22:dSgaxQWZRhdMR1k2@cluster0.bzj9h.mongodb.net/Farmer?retryWrites=true&w=majority",
     { useNewUrlParser: true, useUnifiedTopology: true, } //yeah object pura isi tarha se ay ga bydefault
  )
  .then(() => {
    console.warn("DB connected done");
  }).catch((e)=>{
    console.error("Error: ", e);
  });

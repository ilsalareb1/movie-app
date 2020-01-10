const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://IlsaSITHS:MongoDB1@cluster0-ciknh.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  }
);

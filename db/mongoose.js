//framework that lets us talk to the database 

const mongoose = require("mongoose");
{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true    
});
mongoose.connect(
    "mongodb+srv://mike:siths1234@cluster0-ls6pq.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: true
    }
  );
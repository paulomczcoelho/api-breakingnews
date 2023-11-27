import mongoose from "mongoose";

const connectDatabase = () => {
  console.log("Wait connecting to the database...");

  mongoose
    .connect(
      process.env.MONGODB_URI

      // { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("MongoDb Atlas Connected"))
    .catch((error) =>
      console.log(`Error connectiong to MongoDB Atlas: ${error}`)
    );
};

export default connectDatabase;

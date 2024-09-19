import mongoose from "mongoose"

const connect = async () => {
    try {
        await mongoose.connect("mongodb+srv://test:nJDej20x8U2tmTUt@cluster0.swbsx.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0");
      } catch (error) {
        throw new Error("Connection failed! ");
      }
}

export default connect;

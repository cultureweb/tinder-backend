import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
  name: String,
  imgUrl: String,
});
// Collection inside the database
export default mongoose.model("Cards", cardSchema);

import mongoose from "mongoose";

const CareerSchema = new mongoose.Schema({ // Add more parameters if needed.
    title : {
        type : String,
        required : true
    },
});

const CareerModel = mongoose.model("careers", CareerSchema);

module.exports = CareerModel;

export { }
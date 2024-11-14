const mongoose = require("mongoose");
const { connection1 } = require("../config/db");

// Course Schema
const couponSchema = mongoose.Schema({
  coupon :String,
  studentDiscount : String,
  promoterCommission :String,  
  promoterId : String,
  promoterAmount : Number,
  studentsCount : Number                                
});

// Course Model
const CouponModel = connection1.model("coupon", couponSchema);

// export
module.exports = {
    CouponModel,
};

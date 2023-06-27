import mongoose from "mongoose";

const Schema = mongoose.Schema;


const CreditSchema = new Schema(
  {
    member_id: String,
    emp_title: String,
    emp_length: String,
    home_ownership: String,
    annual_inc: Number,
    dti: Number,
    inq_last_6mths: Number,
    revol_bal: Number,
    total_acc: Number,
    chargeoff_within_12_mths: Number,
    mort_acc: Number,
    num_accts_ever_120_pd:Number,
    percent_bc_gt_75: Number,
    pub_rec_bankruptcies: Number,
    earliest_cr_line: String,
    issue_d: String,
    last_pymnt_d:String,
    addr_state: String,
    open_acc: Number
  }
);

const Credit = mongoose.model("Credit", CreditSchema);

export default Credit;
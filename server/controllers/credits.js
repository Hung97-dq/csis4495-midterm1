import express from 'express';
import mongoose from 'mongoose';
import {PythonShell} from 'python-shell';
import Credit from '../models/ccredit.js';
import PostMessage from '../models/postMessage.js';
import moment from 'moment';
const router = express.Router();
export const getCredit = async (req, res) => { 
    const { id,memberid } = req.params;

    try {
        console.log("memberId:",memberid);
        const post = await PostMessage.findById(id);
        const credit = await Credit.find({member_id: memberid});
        const info =[];
        info.push(post,credit[0]);
        if(credit[0]){
        const term = post.loanLength;
        const loanAmount = post.loanAmount;
        const interestRate = post.interestRate;
        const instalment = loanAmount*((interestRate/1200)*((1+interestRate/1200)**term)/(((1+interestRate/1200)**term)-1));
        const annualIncome = credit[0].annual_inc;
        const dti = (instalment/(annualIncome/12))*100;
        const inq_last_6mths = credit[0].inq_last_6mths;
        const revol_bal = credit[0].revol_bal;
        const total_acc = credit[0].total_acc;
        const chargeoff_within_12_mths= credit[0].chargeoff_within_12_mths;
        const mort_acc = credit[0].mort_acc;
        const num_accts_ever_120_pd = credit[0].num_accts_ever_120_pd;
        const percent_bc_gt_75 = credit[0].percent_bc_gt_75;
        const pub_rec_bankruptcies = credit[0].pub_rec_bankruptcies;
        var currentTime = new Date();
        var earliest_cr_line_year;
        var earliest_cr_line_month;
        if(credit[0].earliest_cr_line.split('-')[0].length == 2){
            earliest_cr_line_year = moment(credit[0].earliest_cr_line.split('-')[0], "YY").format("YYYY");
            earliest_cr_line_month = moment(credit[0].earliest_cr_line.split('-')[1], "MMM").format("M");
        }
        if(credit[0].earliest_cr_line.split('-')[0].length == 3){
            earliest_cr_line_year = moment(credit[0].earliest_cr_line.split('-')[1], "YY").format("YYYY");
            earliest_cr_line_month = moment(credit[0].earliest_cr_line.split('-')[0], "MMM").format("M");
        }
        
        var earliest_cr_line = new Date(earliest_cr_line_year,earliest_cr_line_month-1);
        const earliest_cr_line_format = moment(earliest_cr_line).format('MMM-YYYY')
        const num_hist_cre = parseInt(currentTime.getFullYear() - earliest_cr_line_year);
        const emp_title = post.emp_length;
        const home_ownership = credit[0].home_ownership;
        const emp_length = credit[0].emp_length;
        const loanPurpose = post.loanPurpose;
        const grade = post.loanGrade
        console.log(credit[0]);
        console.log(post);
        let options = {
            mode: 'text',
            // pythonOptions: ['-u'], // get print results in real-time
            args: [term, loanAmount, interestRate, instalment, annualIncome,dti,inq_last_6mths,revol_bal,total_acc,chargeoff_within_12_mths,mort_acc, num_accts_ever_120_pd, percent_bc_gt_75,pub_rec_bankruptcies, grade, num_hist_cre, emp_title, home_ownership, emp_length, loanPurpose]
          };
           
          const resultss = await PythonShell.run('controllers/predict.py', options, function (err, results) {
            if (err) {
                console.log(err)};
            // results is an array consisting of messages collected during execution
            console.log(results);
            return results;
          }); 
        info.push(resultss);
        info.push(earliest_cr_line_format);
        info.push(dti);
        info.push(instalment);
    }
        res.status(200).json({data: info});
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}
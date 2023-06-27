import sys;
import pickle;
# import subprocess
# subprocess.check_call(["pip", "install", "scikit-learn"])

term = sys.argv[1]
loanAmount = sys.argv[2]
interestRate = sys.argv[3]
instalment = sys.argv[4]
annualIncome = sys.argv[5]
dti = sys.argv[6]
inq_last_6mths = sys.argv[7]
revol_bal = sys.argv[8]
total_acc = sys.argv[9]
chargeoff_within_12_mths = sys.argv[10]
mort_acc = sys.argv[11]
num_accts_ever_120_pd = sys.argv[12]
percent_bc_gt_75 = sys.argv[13]
pub_rec_bankruptcies = sys.argv[14]
grade = sys.argv[15]
grade_High_Quality =0
grade_Low_Quality= 0
grade_Medium_Quality =0

if grade == 'A':
    grade_High_Quality = 1
elif grade == 'B':
    grade_High_Quality = 1
elif grade == 'C':
    grade_Medium_Quality = 1
elif grade == 'D':
    grade_Medium_Quality = 1
else:
    grade_Low_Quality= 1

num_hist_cre = sys.argv[16]
emp_title = sys.argv[17]
emp_title_Driver = 0
emp_title_General_Manager = 0
emp_title_Manager = 0
emp_title_Office_Manager = 0
emp_title_Owner = 0
emp_title_Project_Manager = 0
emp_title_RN = 0
emp_title_Registered_Nurse = 0
emp_title_Sales = 0
emp_title_Supervisor = 0
emp_title_Teacher = 0
emp_title_other = 0

if emp_title == 'Driver':
    emp_title_Driver = 1
elif emp_title == "General Manager":
    emp_title_General_Manager = 1
elif emp_title == "Manager":
    emp_title_Manager = 1
elif emp_title == "Office Manager":
    emp_title_Office_Manager = 1
elif emp_title == "Owner":
    emp_title_Owner =1
elif emp_title == "Project Manager":
    emp_title_Project_Manager =1
elif emp_title == "RN":
    emp_title_RN = 1
elif emp_title == "Registered Nurse":
    emp_title_Registered_Nurse = 1
elif emp_title == "Sales":
    emp_title_Sales = 1
elif emp_title == "Supervisor":
    emp_title_Supervisor =1
elif emp_title == "Teacher":
    emp_title_Teacher = 1
else:
    emp_title_other = 1

home_ownership = sys.argv[18]
home_ownership_MORTGAGE =0
home_ownership_OWN =0
home_ownership_RENT=0
home_ownership_OTHER =0

if home_ownership == 'MORTGAGE':
    home_ownership_MORTGAGE =1
elif home_ownership == 'OWN':
    home_ownership_OWN = 1
elif home_ownership == 'RENT':
    home_ownership_RENT= 1
else:
    home_ownership_OTHER = 1


emp_length = sys.argv[19]
emp_length_Greater_10_years = 0
emp_length_Lower_1_year =0
emp_length_between_1_3_years =0
emp_length_between_4_10_years = 0

if emp_length == 'Lower than 1 year':
    emp_length_Lower_1_year = 1
elif emp_length == 'Between 1 to 3 years':
    emp_length_between_1_3_years = 1
elif emp_length == 'Greater than 10 years':
    emp_length_Greater_10_years = 1
else:
    emp_length_between_4_10_years = 1


loan_purpose = sys.argv[20]
purpose_credit_card =0
purpose_debt_consolidation=0
purpose_other=0

if loan_purpose == 'Credit Card':
    purpose_credit_card = 1
elif loan_purpose == 'Debt Consolidation':
    purpose_debt_consolidation = 1
else:
    purpose_other = 1

# Loading up the trained model
model = pickle.load(open('controllers/defaultRate.pkl', 'rb'))
scaler = pickle.load(open('controllers/standardscaler.pkl', 'rb'))
log = pickle.load(open('controllers/powerTransforme.pkl', 'rb'))
sample = [[int(term),float(loanAmount),float(interestRate),float(instalment),float(annualIncome),float(dti),int(inq_last_6mths),float(revol_bal),int(total_acc),int(chargeoff_within_12_mths),int(mort_acc),int(num_accts_ever_120_pd),float(percent_bc_gt_75),int(pub_rec_bankruptcies),int(num_hist_cre),int(grade_High_Quality),grade_Low_Quality,grade_Medium_Quality,emp_title_Driver,emp_title_General_Manager,emp_title_Manager,emp_title_Office_Manager,emp_title_Owner,emp_title_Project_Manager,emp_title_RN,emp_title_Registered_Nurse,emp_title_Sales,emp_title_Supervisor,emp_title_Teacher,emp_title_other,emp_length_Greater_10_years,emp_length_Lower_1_year,emp_length_between_1_3_years,emp_length_between_4_10_years,home_ownership_MORTGAGE,home_ownership_OTHER,home_ownership_OWN,home_ownership_RENT,purpose_credit_card,purpose_debt_consolidation,purpose_other]]
# print(sample)

sample1= scaler.transform(sample)

sample2= log.transform(sample1)

# print(sample2)
default = model.predict(sample2).tolist()[0]
default_percent = model.predict_proba(sample2).tolist()[0]
print(default)
print(default_percent[0])
print(default_percent[1])
const salary = document.querySelector('#salary');
const outputSalary = document.querySelector('.salary-range');
salary.addEventListener('input', function(){
    outputSalary.textContent = salary.value; 
});

window.addEventListener('DOMContentLoaded',(event) =>{
    const  NAME = document.querySelector('#name');
    const ERROR_OP = document.querySelector('.error-output');
    NAME.addEventListener('input',function(){
        if(NAME.value.length == 0){
            ERROR_OP.textContent = "";
            return;
        }
        try{
            (new PayrollClass()).empName = NAME.value;
            ERROR_OP.textContent = "";
        }
        catch(e){
            ERROR_OP.textContent = e;
        }
    });
});

const save = () =>{
    try{
        let employeePayrollData = createEmployeePayroll();
    }
    catch(e){
        return;
    }
}

const createEmployeePayroll = () =>{
    let employeePayrollData = new PayrollClass();
    try{
        employeePayrollData.empName = getInputValueById('#name');
    }
    catch(e){
        setTextValue('.error-output',e);
        throw e;
    }
    employeePayrollData.empProfile = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.dept = getSelectedValues('[name=dept]').pop();
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
    employeePayrollData.startDate = Date.parse(date);
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

const getInputValueById = (id) =>{
    let value = document.querySelector(id).value;
    return value;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItem = [];
    allItems.forEach(item => {
        if(item.checked){
            selItem.push(item.value);
        }
    });
    return selItem;
}





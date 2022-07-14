let isUpdate = false;
let empPayrollObj = {};

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
    checkForUpdate();
});

const save = () =>{
    try{
        let employeePayrollData = createEmployeePayroll();
        storeDataInLocalStorage(employeePayrollData);
    }
    catch(e){
        return;
    }
}

function storeDataInLocalStorage(employeePayrollData){
    //localStorage.clear();
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList != undefined){
        employeePayrollList.push(employeePayrollData);
    }
    else{
        employeePayrollList = [employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
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
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
    employeePayrollData.startDate = new Date(Date.parse(date)).toLocaleDateString();
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

const resetValues = () => {
    setValue('#name','');
    unSelectValue('[name=profile]');
    unSelectValue('[name=gender]');
    unSelectValue('[name=department]');
    setValue('#salary','20000');
    setTextValue('#day','Day');
    setTextValue('#month','Month');
    setTextValue('#year','Year');
    setValue('#notes','');
}

const setValue = (id, value) =>{
    const element = document.querySelector(id);
    element.value = value;
}

const setTextValue = (id, value) =>{
    const element = document.querySelector(id);
    element.textContent = value;
}

const unSelectValue = (propertyValue) => {
    let allItems = document.querySelector(propertyValue);
    allItems.forEach(item => item.checked = false);
}

/*const setSelectedValue = (propertyValue, value) => {
    let allItems = document.querySelector(propertyValue);
    allItems.forEach(item => {
        if(Array.isArray(value)){
            if(value.includes(item.value)){
                item.checked = true;
            }
        }
        else if(item.value === value){
            item.checked = true;
        }
    });
}*/

const setSelectedValue =(propertyValue, value) =>{
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item =>{
        if(Array.isArray(value))
        {
            if(value.includes(item.value))
            {
                item.checked = true;
            }
        }
        else
        {
            if(item.value ===value)
            {
                item.checked = true;
            }
        }
    });
}

const checkForUpdate = () => {
    const empPayrollJson = localStorage.getItem('editEmp');
    isUpdate = empPayrollJson ? true : false;
    if(!isUpdate) return;
    empPayrollObj = JSON.parse(empPayrollJson);
    setForm();
}

const setForm = () => {
    setValue('#name', empPayrollObj._empName);
    setSelectedValue('[name=profile]', empPayrollObj._empProfile);
    setSelectedValue('[name=gender]', empPayrollObj._gender);
    setSelectedValue('[name=department]', empPayrollObj._department);
    setValue('#salary',empPayrollObj._salary);
    setTextValue('.salary-range',empPayrollObj._salary);
    let date = (empPayrollObj._startDate).split('/');
    setValue('#day',date[1]);
    setValue('#month',date[0]);
    setValue('#year',date[2]);
    setValue('#notes', empPayrollObj._note);
}



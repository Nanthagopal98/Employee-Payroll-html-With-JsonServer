let isUpdate = false;
let empPayrollObj = {};

window.addEventListener('DOMContentLoaded',(event) =>{
    const  NAME = document.querySelector('#name');
    NAME.addEventListener('input',function(){
        if(NAME.value.length == 0){
            setTextValue('error-output','');
            return;
        }
        try{
            (new PayrollClass()).empName = NAME.value;
            setTextValue('error-output','');
        }
        catch(e){
            setTextValue('error-output',e);
        }
        const salary = document.querySelector('#salary');
        const outputSalary = document.querySelector('#salaryRange');
        salary.addEventListener('input', function(){
        outputSalary.textContent = salary.value; 
        });
    });
    const date = document.querySelector('#date');
    date.addEventListener('input', function(){
        let startDate = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
        try{
            (new PayrollClass()).startDate = new Date(Date.parse(startDate));
            setTextValue('.error-dateoutput', "");
        }
        catch(ex){
            setTextValue('.error-dateoutput', ex);
        }
    });
    checkForUpdate();
});
const save = (event) =>{
    //event.preventDefault();
    //event.stopPropagation();
    try{
        //localStorage.clear();
        setEmployeePayrollObject();
        storeDataInLocalStorage();
        resetValues();
        window.location.href = "../pages/home_page.html";
    }
    catch(e){
        return;
    }
}

const setEmployeePayrollObject = () => {
    //empPayrollObj._id = getInputValueById('#id');
    empPayrollObj._empName = getInputValueById('#name');
    empPayrollObj._empProfile = getSelectedValues('[name=profile]').pop();
    empPayrollObj._gender = getSelectedValues('[name=gender]').pop();
    empPayrollObj._department = getSelectedValues('[name=department]');
    empPayrollObj._salary = getInputValueById('#salary');
    empPayrollObj._note = getInputValueById('#notes');
    let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
    empPayrollObj._startDate = date;
}

const createEmployeePayrollData = (id) =>{
    let employeePayrollData = new PayrollClass();
    if(!id) employeePayrollData.id = createNewEmployeeId();
    else employeePayrollData.id = id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
}

const storeDataInLocalStorage =(employeePayrollData) => {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList){
        let empPayrollData = employeePayrollList.find(empData => empData._id == empPayrollObj._id);
        if(!empPayrollData){
        employeePayrollList.push(createEmployeePayrollData());
        }
        else{
            const index = employeePayrollList.map(empData => empData._id).indexOf(empPayrollData.id);
            employeePayrollList.splice(index, 1, createEmployeePayrollData(empPayrollData._id));
        }
    }
    else{
        employeePayrollList = [employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

/*const storeDataInLocalStorage = (employeePayrollData) =>{
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList){
        let empPayrollData = employeePayrollList.find(empDate => empDate._id == employeePayrollObject._id);
        if(!empPayrollData){
            employeePayrollList.push(createEmployeePayrollData());
        }
        else{
            const index = employeePayrollList.map(empDate => empDate._id).indexOf(empPayrollData._id);
            employeePayrollList.splice(index, 1, createEmployeePayrollData(empPayrollData._id));
        }
    }
    else{
        employeePayrollList = [employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}*/

const setEmployeePayrollData = (employeePayrollData) =>{
    try{
        employeePayrollData.empName = empPayrollObj._empName;
    }
    catch(e){
        setTextValue('.error-output',e);
        throw e;
    }
    //employeePayrollData.id = empPayrollObj._id;
    employeePayrollData.empProfile = empPayrollObj._empProfile;
    employeePayrollData.gender = empPayrollObj._gender;
    employeePayrollData.department = empPayrollObj._department;
    employeePayrollData.salary = empPayrollObj._salary;
    employeePayrollData.note = empPayrollObj._note;
    try{
        employeePayrollData.startDate = new Date(Date.parse(empPayrollObj._startDate));
    }
    catch(e){
        setTextValue('.error-dateoutput', e);
        throw e;
    }
    alert(employeePayrollData.toString());
    //localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const createNewEmployeeId = () =>{
    let empId = localStorage.getItem("EmployeeID");
    empId = !empId ? 1 : (parseInt(empId)+1).toString();
    localStorage.setItem("EmployeeID", empId);
    return empId;
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

const resetValues = (event) => {
    setValue('#name','');
    unSelectValue('[name=profile]');
    unSelectValue('[name=gender]');
    unSelectValue('[name=department]');
    setValue('#salary',"40000");
    setTextValue('#salaryRange', 40000);
    setSelectedIndex('#day', 0);
    setSelectedIndex('#month', 0);
    setSelectedIndex('#year', 0);
    setValue('#notes','');
}

const setValue = (id, value) =>{
    const element = document.querySelector(id);
    element.value = value;
}

const setSelectedIndex = (id, index) =>{
    const element = document.querySelector(id);
    element.selectIndex = index;
}

const setTextValue = (id, value) =>{
    const element = document.querySelector(id);
    element.textContent = value;
}

const unSelectValue = (propertyValue) => {
    let allItems = document.querySelector(propertyValue);
    allItems.forEach(item => {item.checked = false});
}

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
    setTextValue('#salaryRange',empPayrollObj._salary);
    let date = stringifyDateForm(empPayrollObj._startDate).split(' ');
    setValue('#day',date[0]);
    setValue('#month',date[1]);
    setValue('#year',date[2]);
    setValue('#notes', empPayrollObj._note);
}

const stringifyDateForm = (date) =>{
    const options ={day:'numeric', month:'short', year:'numeric'};
    const newDate = !date ? "undefined" :new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
    return newDate;
}



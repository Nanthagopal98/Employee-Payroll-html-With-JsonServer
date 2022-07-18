let getData;
window.addEventListener("DOMContentLoaded", (event) =>{
    if(site_properties.useLocalStorage.match("true")){
        getEmpDataFromLocalStorage();
    }
    else{
        getEmpDataFromJsonServer();
    }
});

function getEmpDataFromJsonServer(){
    makePromiseCall("GET",site_properties.serverURL, true)
    .then(responseText => {
        getData = JSON.parse(responseText);
        processEmpPayrollDataResponse();
    })
    .catch(error => { 
        console.log("Get Error Status: " + JSON.stringify(error)); 
        getData = [];
        processEmpPayrollDataResponse();
    });

}
function processEmpPayrollDataResponse(){
    document.querySelector(".emp_Detail_count").textContent = getData.length;
    createInnetHtml();
    localStorage.removeItem('editEmp');
}

const getEmpDataFromLocalStorage = () => {
    getData = localStorage.getItem('EmployeePayrollList') ?
        JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}
const createInnetHtml = () => {
    const tableheader = "<th>Profile</th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th>" +
        "<th>Start Date</th><th>Action</th>";
    if(getData.length == 0) {return;}
    let innerHtlm = `${tableheader}`;
    for (const employeePayrollData of getData) {
        innerHtlm = `${innerHtlm}
     <tr>
        <td><img class="profile" alt="Profile Photo" src="${employeePayrollData._empProfile}"></td>
        <td>${employeePayrollData._empName}</td>
        <td>${employeePayrollData._gender}</td>
        <td>${getDeptHtml(employeePayrollData._department)}</td>
        <td>${employeePayrollData._salary}</td>
        <td>${stringifyDate(employeePayrollData._startDate)}</td>
        <td>
            <img id="${employeePayrollData.id}" onclick="remove(this)" class="action_img" src="../assets/trashbin.jpeg">
            <img id="${employeePayrollData.id}" onclick="update(this)" class="action_img" src="../assets/add.jpeg">
        </td>
    </tr>
    `;
    }
    document.querySelector('#table-display').innerHTML = innerHtlm;
}

const getDeptHtml = (deptList) =>{
    let deptHtml = '';
    for (const dept of deptList){
        deptHtml = `${deptHtml} <div class="dept">${dept}</div>`
    }
    return deptHtml
}

const remove = (node) =>{
    let empPayrollData = getData.find(empData => empData.id == node.id)
    if(!empPayrollData) return;
    const index = getData.map(empData => empData.id).indexOf(empPayrollData.id);
    getData.splice(index,1);
    if(site_properties.useLocalStorage.match("true")){
        localStorage.setItem('EmployeePayrollList', JSON.stringify(getData));
        document.querySelector(".emp_Detail_count").textContent = getData.length;
        createInnetHtml();
    }
    else{
        const deleteURL = site_properties.serverURL + empPayrollData.id.toString();
        makePromiseCall("DELETE", deleteURL, false)
        .then(responseText => {
            createInnetHtml();
        })
        .catch(error => { 
            console.log("Delete Error Status" + JSON.stringify(error)); 
        });
    }
    
}

const update = (node) => {
    let empPayrollData = getData.find(empData => empData.id == node.id);
    if(!empPayrollData) return;
    localStorage.setItem('editEmp', JSON.stringify(empPayrollData));
    window.location.replace(site_properties.add_emp_page);
}


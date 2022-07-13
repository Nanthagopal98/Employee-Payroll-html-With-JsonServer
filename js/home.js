window.addEventListener("DOMContentLoaded", (event) =>{
    createInnetHtml();
});

const createInnetHtml = () =>{
    const tableheader = "<tr><th>Profile</th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th>"+
        "<th>Start Date</th><th>Action</th></tr>";
    let employeePayrollData = createEmployeePayrollJSON()[1];
    const innerHtlm = `${tableheader}
     <tr>
        <td><img class="profile" alt="Profile Photo" src="${employeePayrollData._empProfile}"></td>
        <td>${employeePayrollData._empName}</td>
        <td>${employeePayrollData._gender}</td>
        <td><div class="dept">${employeePayrollData._dept[0]}</div>
            <div class="dept">${employeePayrollData._dept[1]}</div>
        </td>
            <td>${employeePayrollData._salary}</td>
            <td>${employeePayrollData._startDate}</td>
        <td>
            <img id="delete" onclick="remove(this)" class="action_img" src="../assets/trashbin.jpeg">
            <img id="update" onclick="update(this)" class="action_img" src="../assets/add.jpeg">
        </td>
    </tr>
`;
document.querySelector('#table-display').innerHTML = innerHtlm;
}

const createEmployeePayrollJSON = () => {
    let employeePayrollList = [
        {
            _empProfile : '../assets/pro1.jpg',
            _empName : 'Nantha',
            _gender : 'Male',
            _dept : ['Engineering','HR'],
            _salary : '30000',
            _startDate : '01 Jan 2022',
            _note : '',
            _id : new Date().getTime(),
        },
        {
            _empProfile : '../assets/pro1.jpg',
            _empName : 'Ela',
            _gender : 'Male',
            _dept : ['Engineering'],
            _salary : '35000',
            _startDate : '01 Jan 2022',
            _note : '',
            _id : new Date().getTime(),
        }
    ];
    return employeePayrollList;
}
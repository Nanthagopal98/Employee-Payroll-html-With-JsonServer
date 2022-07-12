const salary = document.querySelector('#salary');
const outputSalary = document.querySelector('.salary-range');
salary.addEventListener('input', function(){
    outputSalary.textContent = salary.value; 
});

let nameRegex = RegExp('^[A-Z]{1}[A-Za-z]{2,}$')
const  empName = document.querySelector('#name');
const ERROR_OP = document.querySelector('.error-output');
empName.addEventListener('input', function(){
    if(nameRegex.test(empName.value)){
        ERROR_OP.textContent = "Valid";
}
else{
    ERROR_OP.textContent = "Invalid Name";
}
});



function save(){
    const  getname = document.querySelector('#name');
    getname.addEventListener('input', function(){
        let myname=getname.value;
        console.log(myname);
    });
    }
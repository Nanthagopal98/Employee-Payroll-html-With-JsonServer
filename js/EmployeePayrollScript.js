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






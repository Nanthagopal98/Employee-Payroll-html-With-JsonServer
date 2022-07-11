const salary = document.querySelector('#salary');
const outputSalary = document.querySelector('.salary-range');
salary.addEventListener('input', function(){
    outputSalary.textContent = salary.value; 
})
const stringifyDate = (date) =>{
    const options ={day:'numeric', month:'short', year:'numeric'};
    const newDate = !date ? "undefined" :new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
    return newDate;
}

function Namecheck(name){
    let nameRegex = RegExp('^[A-Z]{1}[A-Za-z]{2,}$');
        if(!nameRegex.test(name)){
            throw "Incorrect Name";
        }
} 

function DateCheck(startDate){
    let now = new Date();
        if(startDate > now)
        {
            throw "Start Date is a Future Date";
        }
        var diff = Math.abs(now.getTime() - startDate.getTime());
        if(diff/(1000 * 60 * 60 * 24) > 30)
        {
            throw "Start Date is beyond 30 Days";
        }
}
class PayrollClass{

    get  id(){
        return this._id
    }
    set id(id){
        this._id = id;
    }

    get empName(){
        return this._empName;
    }
    set empName(empName){
        let nameRegex = RegExp('^[A-Z]{1}[A-Za-z]{2,}$');
        if(nameRegex.test(empName)){
            this._empName = empName;
    }
    else{
        throw "Incorrect Name";
    }
    }

    get  empProfile(){
        return this._empProfile;
    }
    set empProfile(empProfile){
        this._empProfile = empProfile;
    }

    get  gender(){
        return this._gender;
    }
    set gender(gender){
        this._gender = gender;
    }

    get  department(){
        return this._department;
    }
    set department(department){
        this._department = department;
    }

    get  salary(){
        return this._salary;
    }
    set salary(salary){
        this._salary = salary;
    }

    get startDate(){
        return this._startDate;
    }
    set startDate(startDate){
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
        this._startDate = startDate;
    }

    get  note(){
        return this._note;
    }
    set note(note){
        this._note = note;
    }

    toString(){
        const options ={day:'numeric', month:'short', year:'numeric'};
        const empDate = !this.startDate ? "undefined" : this.startDate.toLocaleDateString('en-GB', options);
        return "Id: " + this.id + "\nName: " + this.empName + "\nProfile Path: " + this.empProfile +
            "\nGender: " + this.gender + "\nDepartment: "+ this.department +"\nSalary: " + this.salary +
            "\nStart Date: " + empDate +"\nNote: "+this.note;
    }
    }
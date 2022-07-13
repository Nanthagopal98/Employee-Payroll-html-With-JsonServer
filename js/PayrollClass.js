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

    get  startDate(){
        return this._startDate;
    }
    set startDate(startDate){
        this._startDate = startDate;
    }

    get  note(){
        return this._note;
    }
    set note(note){
        this._note = note;
    }

    toString(){
        return "Id: " + this.id + "\nName: " + this.empName + "\nProfile Path: " + this.empProfile +
            "\nGender: " + this.gender + "\nDepartment: "+ this.department +"\nSalary: " + this.salary +
            "\nStart Date: " + this.startDate +"\nNote: "+this.note;
    }
    }
// Create a "class" to store data to related to employees working for one or more different
// companies
function Employee(data) {

    // Represent an employee's ID within an organisation
    this.employeeId = data.employeeId || 0;

    // Represent an employee's social security number
    this.ssId = data.ssId || "0000-000-0000";

    // Represent an employee's name
    this.name = data.name || "";

    // Represent an employee's occupation
    this.occupation = data.occupation || "";

    // Represent an employee's company name, address and country
    this.companyName = data.companyName || "";
    this.companyAddress = data.companyAddress || "";
    this.companyCountry = data.companyCountry || "";
}

// Create three methods to get the employee's name, occupation and company details from the
// stored object
Employee.prototype.getName = function() {
    return this.name;
};

Employee.prototype.getOccupation = function() {
    return this.occupation;
};

Employee.prototype.getCompany = function() {
    return [this.companyName, this.companyAddress, this.companyCountry].join(", ");
};

// Create four employee objects - note that two share the same company information, and two
// share the same ssId and name. As more objects are created, the amount of data repeated will
// grow, consuming more memory due to inefficiency
var denOdell = new Employee({
        employeeId: 1456,
        ssId: "1234-567-8901",
        name: "Den Odell",
        occupation: "Head of Web Development",
        companyName: "AKQA",
        companyAddress: "1 St. John's Lane, London",
        companyCountry: "GB"
    }),
    steveBallmer = new Employee({
        employeeId: 3,
        ssId: "8376-940-1673",
        name: "Steve Ballmer",
        occupation: "Ex-CEO",
        companyName: "Microsoft",
        companyAddress: "1 Microsoft Way, Redmond, WA",
        companyCountry: "US"
    }),
    billGates = new Employee({
        employeeId: 1,
        ssId: "7754-342-7584",
        name: "Bill Gates",
        occupation: "Founder",
        companyName: "Microsoft",
        companyAddress: "1 Microsoft Way, Redmond, WA",
        companyCountry: "US"
    }),
    billGatesPhilanthropist = new Employee({
        employeeId: 2,
        ssId: "7754-342-7584",
        name: "Bill Gates",
        occupation: "Philanthropist",
        companyName: "Gates Foundation",
        companyAddress: "500 Fifth Avenue North, Seattle, WA",
        companyCountry: "US"
    });
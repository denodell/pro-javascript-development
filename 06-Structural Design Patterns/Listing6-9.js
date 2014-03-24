// Create four employee objects - note that two share the same company information, and two
// share the same ssId and name. Behind the scenes, the flyweight pattern from Listing 6-8
// ensures that repeated person and company data is stored in the most efficient way possible.
var denOdell = employee.add({
        employeeId: 1456,
        ssId: "1234-567-8901",
        name: "Den Odell",
        occupation: "Head of Web Development",
        companyName: "AKQA",
        companyAddress: "1 St. John's Lane, London",
        companyCountry: "GB"
    }),
    steveBallmer = employee.add({
        employeeId: 3,
        ssId: "8376-940-1673",
        name: "Steve Ballmer",
        occupation: "Ex-CEO",
        companyName: "Microsoft",
        companyAddress: "1 Microsoft Way, Redmond, WA",
        companyCountry: "US"
    }),
    billGates = employee.add({
        employeeId: 1,
        ssId: "7754-342-7584",
        name: "Bill Gates",
        occupation: "Founder",
        companyName: "Microsoft",
        companyAddress: "1 Microsoft Way, Redmond, WA",
        companyCountry: "US"
    }),
    billGatesPhilanthropist = employee.add({
        employeeId: 2,
        ssId: "7754-342-7584",
        name: "Bill Gates",
        occupation: "Philanthropist",
        companyName: "Gates Foundation",
        companyAddress: "500 Fifth Avenue North, Seattle, WA",
        companyCountry: "US"
    });

// We've created three objects representing people by ssId and name - Den Odell, Steve Ballmer
// and Bill Gates
alert(personFactory.getPersonCount()); // 3

// We've created three objects representing companies by name, address and country - AKQA,
// Microsoft and the Gates Foundation
alert(companyFactory.getCompanyCount()); // 3

// We've created four objects representing employees, with two unique properties and two
// properties linking to existing person and company objects. The more employee objects we
// create with shared person and company data, the less data we're storing in our application
// and the more effective the flyweight pattern becomes
alert(employee.getTotalCount()); // 4
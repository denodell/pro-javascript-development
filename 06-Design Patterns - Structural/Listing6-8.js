// The first stage of applying the flyweight pattern is to extract intrinsic data from
// extrinsic data in the objects we wish to make more memory-efficient
//
// There are two sets of extrinsic data in an Employee object from Listing 6-7 - people data
// and company data. Let's create two "classes" to represent those types of data
//
// A Person object represents an individual's social security number and their name
function Person(data) {
    this.ssId = data.ssId || "";
    this.name = data.name || "";
}

// A Company object represents a company's name, address and country details
function Company(data) {
    this.name = data.name || "";
    this.address = data.address || "";
    this.country = data.country || "";
}

// The second stage of the flyweight pattern is to ensure any objects representing unique
// extrinsic data are only created once and stored for use in future. This is achieved by
// harnessing the factory pattern for each of the new extrinsic data "classes" to abstract
// away the creation of the object instance so that if a previously-existing object is found,
// that can be returned instead of creating a new instance
var personFactory = (function() {

        // Create a variable to store all instances of the People "class" by their ssId
        var people = {},
            personCount = 0;

        return {

            // Provide a method to create an instance of the People "class" if one does not
            // already exist by the given ssId provided in the data input. If one exists,
            // return that object rather than creating a new one
            createPerson: function(data) {
                var person = people[data.ssId],
                    newPerson;

                // If the person by the given ssId exists in our local data store, return their
                // object instance, otherwise create a new one using the provided data
                if (person) {
                    return person;
                } else {
                    newPerson = new Person(data);
                    people[newPerson.ssId] = newPerson;
                    personCount++;

                    return newPerson;
                }
            },

            // Provide a method to let us know how many Person objects have been created
            getPersonCount: function() {
                return personCount;
            }
        };
    }()),

    // Create a similar factory for Company objects, storing company data by name
    companyFactory = (function() {
        var companies = {},
            companyCount = 0;

        return {
            createCompany: function(data) {
                var company = companies[data.name],
                    newCompany;

                if (company) {
                    return company;
                } else {
                    newCompany = new Company(data);
                    companies[newCompany.name] = newCompany;
                    companyCount++;

                    return newCompany;
                }
            },

            getCompanyCount: function() {
                return companyCount;
            }
        };
    }()),

    // The third stage of the flyweight pattern is to allow the creation of objects in a
    // simliar way to that in Listing 6-7, providing all the handling of data storage in the
    // most efficient way in a transparent way to the end user
    //
    // Create an object with methods to store employee data and to return data from each
    // object by their employeeId. This simplifies the end user's code as they do not need to
    // access methods on underlying objects directly, they only need interface with this handler
    employee = (function() {

        // Create a data store for all employee objects created
        var employees = {},
            employeeCount = 0;

        return {

            // Provide a method to add employees to the data store, passing the provided data
            // to the Person and Company factories and storing the resulting object, consisting
            // of the enployeeId, occupation, person object reference, and company object
            // reference in the local data store
            add: function(data) {

                // Create or locate Person or Company objects that correspond to the provided
                // data, as appropriate
                var person = personFactory.createPerson({
                        ssId: data.ssId,
                        name: data.name
                    }),
                    company = companyFactory.createCompany({
                        name: data.companyName,
                        address: data.companyAddress,
                        country: data.companyCountry
                    });

                // Store a new object in the local data store, containing the employeeId,
                // their occupation, and references to the company they work for and their
                // unique personal data, including their name and social security number
                employees[data.employeeId] = {
                    employeeId: data.employeeId,
                    occupation: data.occupation,
                    person: person,
                    company: company
                };

                employeeCount++;
            },

            // Provide a method to return the name of an employee by their employeeId - the
            // data is looked up from the associated Person object
            getName: function(employeeId) {
                return employees[employeeId].person.name;
            },

            // Provide a method to return the occupation of an employee by their employeeId
            getOccupation: function(employeeId) {
                return employees[employeeId].occupation;
            },

            // Provide a method to return the address of the company an employee works for -
            // the data is looked up from the associated Company object
            getCountry: function(employeeId) {
                var company = employees[employeeId].company;
                return [company.name, company.address, company.country].join(", ");
            },

            // Provide a utlility method to tell us how many employees have been created
            getTotalCount: function() {
                return employeeCount;
            }
        };
    }());
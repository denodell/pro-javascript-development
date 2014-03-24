// Use EmailModel from Listing 8-1
var emailModel = new EmailModel([
        "denodell@me.com",
        "denodell@gmail.com",
        "den.odell@akqa.com"
    ]),

    // Now our View is a HTML document, we can get a reference to the whole page and use that
    emailView = document.body,

    // Create an instance of our ViewModel as we would do with either Controller or Presenter in
    // MVC and MVP patterns, respectively. Pass in the Model data and View (HTML document).
    emailViewModel = new EmailViewModel(emailModel, emailView);

emailViewModel.initialize();
// Use EmailModel from Listing 8-1
var emailModel = new EmailModel([
        "denodell@me.com",
        "denodell@gmail.com",
        "den.odell@akqa.com"
    ]),
    emailFormView = new EmailFormView(),
    emailListView = new EmailListView(),
    emailView = new EmailView([emailFormView, emailListView]),

    // Create the Presenter as you would the Controller in the MVC pattern
    emailPresenter = new EmailPresenter(emailModel, emailView);

emailPresenter.initialize();
Feature: Login smoke test with page-object model


   Background:
      Given I am on the SF login page

   @login
   Scenario: Login with page-object model

      When I login with the correct credentials
      Then I have access to SF

   @login
   Scenario: In-correct login with page-object model

      When I login with the wrong credentials
      Then I see the SF login error
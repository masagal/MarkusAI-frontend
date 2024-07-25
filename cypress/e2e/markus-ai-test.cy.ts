const testUser = Cypress.env("testing_user");

describe("a logged in admin", () => {
  it("can access the menu", () => {
    cy.visit(`/`);
    cy.clerkLoaded();
    cy.clerkSignIn({
      strategy: "email_code",
      identifier: testUser,
    });

    cy.get("#burger_menu").click();
    cy.contains("CHAT");
    cy.contains("Requests");
    cy.contains("Inventory");
    cy.contains("Order Status");
  });

  it("can make a request", () => {
    cy.visit(`/requests`);
    cy.clerkLoaded();
    cy.clerkSignIn({
      strategy: "email_code",
      identifier: testUser,
    });

    cy.get("form").contains("Submit").click();

    cy.contains("Submit Requests").click();

    cy.contains("Request filed!");
  });

  it("can approve requests", () => {});

  it("can see the inventory", () => {
    cy.visit("/inventory");
    cy.clerkLoaded();
    cy.clerkSignIn({
      strategy: "email_code",
      identifier: testUser,
    });

    cy.get(".inventoryCard");
  });
});

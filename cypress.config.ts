import { clerkSetup } from "@clerk/testing/cypress";
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return clerkSetup({ config });
      // implement node event listeners here
    },
    baseUrl: "http://localhost:5173",
  },
});

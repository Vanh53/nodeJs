"use strict";

class ValidationError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = "ValidationError";
    this.details = details;
  }
}

function createUser(input) {
  if (!input.email || !input.email.includes("@")) {
    throw new ValidationError("email is invalid", { field: "email" });
  }

  return { id: crypto.randomUUID(), email: input.email };
}

async function saveUser(input) {
  try {
    const user = createUser(input);
    await Promise.resolve();
    return user;
  } catch (error) {
    if (error instanceof ValidationError) {
      return { ok: false, reason: error.message, details: error.details };
    }

    throw error;
  } finally {
    console.log("cleanup always runs");
  }
}

saveUser({ email: "invalid" }).then(console.log);

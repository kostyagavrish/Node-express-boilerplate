export const loginDataSchema = {
  id: "/LoginData",
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string" },
  },
  required: ["email", "password"],
};

export default [loginDataSchema];

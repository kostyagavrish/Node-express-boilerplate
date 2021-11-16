const createUserDataSchema = {
  id: "/CreateUserData",
  type: "object",
  properties: {
    first_name: { type: "string" },
    last_name: { type: "string" },
    email: { type: "string", format: "email" },
    password: { type: "string" },
    birthdate: { type: "number" },
    phone_number: { type: "string" },
    description: { type: "string" },
  },
  required: [
    "email",
    "password",
    "phone_number",
    "birthdate",
    "last_name",
    "first_name",
  ],
};
const findUserSchema = {
  id: "/FindUser",
  type: "object",
  minProperties: 1,
  properties: {
    fullName: { type: "string" },
    email: { type: "string", format: "email" },
    id: { type: "string" },
  },
};
const updateUserDataSchema = {
  id: "/UpdateUserData",
  type: "object",
  minProperties: 1,
  properties: {
    first_name: { type: "string" },
    last_name: { type: "string" },
    email: { type: "string", format: "email" },
    birthdate: { type: "number" },
    phone_number: { type: "string" },
    description: { type: "string" },
  },
};

export default [createUserDataSchema, updateUserDataSchema, findUserSchema];

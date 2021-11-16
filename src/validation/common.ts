export const findById = {
  id: "/FindById",
  type: "object",
  minProperties: 1,
  properties: {
    id: { type: "string" },
  },
};

export default [findById];

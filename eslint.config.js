module.exports = {
  env: {
    jest: true,
    browser: true,
    es2021: true
  },
  globals: {
    describe: "readonly",
    it: "readonly", 
    expect: "readonly",
    beforeEach: "readonly",
    afterEach: "readonly",
    beforeAll: "readonly",
    afterAll: "readonly",
    jest: "readonly"
  }
};

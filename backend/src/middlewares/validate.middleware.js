const { ZodError } = require("zod");

const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body); 
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      const errors = err.errors.map(e => e.message);
      return res.status(400).json({ message: errors.join(", ") });
    }
    next(err);
  }
};

module.exports = { validate };

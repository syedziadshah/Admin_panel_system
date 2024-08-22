const { z } = require('zod');
const loginSchema=z.object({
  email: z.string({ required_error: "Email is required." })
    .trim()
    .email({ message: "Invalid email address." })
    .min(10, { message: "Email must be at least 10 characters." })
    .max(40, { message: "Email must not be more than 40 characters." }),
    password: z.string({ required_error: "Password is required." })
    .trim()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(40, { message: "Password must not be more than 40 characters." }),
  })
const signupSchema = loginSchema.extend({
  username: z.string({ required_error: "Name is required." })
    .trim()
    .min(3, { message: "Name must be at least 3 characters." })
    .max(255, { message: "Name must not be more than 255 characters." }),

  phone: z.string({ required_error: "Phone number is required." })
    .trim()
    .min(10, { message: "Phone number must be at least 10 characters." })
    .max(15, { message: "Phone number must not be more than 15 characters." }),

 
});

module.exports = {signupSchema,loginSchema};

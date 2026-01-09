/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful with JWT token
 *       400:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get logged-in user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 64fa1c...
 *                     name:
 *                       type: string
 *                       example: Dev
 *                     email:
 *                       type: string
 *                       example: dev@email.com
 *                     role:
 *                       type: string
 *                       example: user
 *       401:
 *         description: Unauthorized (missing or invalid token)
 */

const express = require("express");
const router = express.Router();
const { register, login, getProfile } = require("./auth.controller");
const { validate } = require("../../middlewares/validate.middleware");
const { registerSchema, loginSchema } = require("../../schemas/auth.schema");
const { protect } = require("../../middlewares/auth.middleware");

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/profile", protect, getProfile);

module.exports = router;

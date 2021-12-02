"use strict";
const express = require("express");
const router = express.Router();
const validate = require("../../middlewares/validate");
const userAccountController = require("../../controllers/user_financial_info_controller");
const userAccountValidation = require("../../validations/user_financial_info_validation");

router
  .route("/:id")
  .post(
    validate(userAccountValidation.createUserAccount),
    userAccountController.createUserAccount,
    (req, res) => {
      console.log("post userAccount");
    }
  )
  .get(
    validate(userAccountValidation.getUserAccount),
    userAccountController.getUserAccount,
    (req, res) => {
      console.log("get userAccount");
    }
  )
  .put(
    validate(userAccountValidation.updateUserAccount),
    userAccountController.updateUserAccount,
    (req, res) => {
      console.log("put userAccount");
    }
  );

module.exports = router;

/**
 * @swagger
 * /user/financial/info/{id}:
 *   post:
 *     summary: Add Financial Info
 *     description: Add Financial Info
 *     tags: [Financial Info]
 *     security:
 *       - bearerAuth: []
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
 *               - role
 *             properties:
 *               bankCode:
 *                 type: string
 *               transitNumber:
 *                 type: string
 *               accountNumber:
 *                 type: string
 *             example:
 *               bankCode: 010
 *               transitNumber: 22222
 *               accountNumber: 223232323
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/UserAccount'
 *       "400":
 *         $ref: '#/components/responses/DuplicateId'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *   get:
 *     summary: Get Financial Info
 *     description: Logged in users can fetch only their own user information.
 *     tags: [Financial Info]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/UserAccount'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   put:
 *     summary: Update Financial Info
 *     description: Logged in users can only update their own information.
 *     tags: [Financial Info]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bankCode:
 *                 type: string
 *               transitNumber:
 *                 type: string
 *               accountNumber:
 *                 type: string
 *             example:
 *               bankCode: 010
 *               transitNumber: 22222
 *               accountNumber: 223232323
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/UserAccount'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

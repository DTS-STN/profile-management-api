"use strict";
const express = require("express");
const router = express.Router();
const validate = require("../../middlewares/validate");
const userFinancialInfoController = require("../../controllers/user_financial_info_controller");
const userFinancialInfoValidation = require("../../validations/user_financial_info_validation");

router
  .route("/:id")
  .post(
    validate(userFinancialInfoValidation.createUserFinancialInfo),
    userFinancialInfoController.createUserFinancialInfo,
    (req, res) => {
      console.log("post userAccount");
    }
  )
  .get(
    validate(userFinancialInfoValidation.getUserFinancialInfo),
    userFinancialInfoController.getUserFinancialInfo,
    (req, res) => {
      console.log("get userAccount");
    }
  )
  .put(
    validate(userFinancialInfoValidation.updateUserFinancialInfo),
    userFinancialInfoController.updateUserFinancialInfo,
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
 *               institutionNumber:
 *                 type: string
 *               transitNumber:
 *                 type: number
 *               accountNumber:
 *                 type: number
 *             example:
 *               institutionNumber: "010"
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
 *               institutionNumber:
 *                 type: string
 *               transitNumber:
 *                 type: number
 *               accountNumber:
 *                 type: number
 *             example:
 *               institutionNumber: "010"
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

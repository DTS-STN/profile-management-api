"use strict";
const express = require("express");
const router = express.Router();
const validate = require("../../middlewares/validate");
const userPersonalInfoController = require("../../controllers/user_personal_info_controller");
const userPersonalInfoValidation = require("../../validations/user_personal_info_validation");

router
  .route("/")
  .get(userPersonalInfoController.getAllUserPersonalInfo, (req, res) => {
    console.log("get all userinfo");
  })
  .post(
    validate(userPersonalInfoValidation.createUserPersonalInfo),
    userPersonalInfoController.createUserPersonalInfo,
    (req, res) => {
      console.log("create userinfo");
    }
  );

router
  .route("/:id")
  .get(
    validate(userPersonalInfoValidation.getUserPersonalInfo),
    userPersonalInfoController.getUserPersonalInfo,
    (req, res) => {
      console.log("get userinfo");
    }
  )
  .put(
    validate(userPersonalInfoValidation.updateUserPersonalInfo),
    userPersonalInfoController.updateUserPersonalInfo,
    (req, res) => {
      console.log("update userinfo");
    }
  );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: User Profile Management
 *   description: User Profile management and retrieval
 */

/**
 * @swagger
 * /user/personal/Info:
 *   get:
 *     summary: get all users info
 *     description: get all users
 *     tags: [Personal Info]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/UserInfos'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *   post:
 *     summary: Create a user
 *     description: create user through signup process
 *     tags: [Personal Info]
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
 *               firstname:
 *                 type: string
 *               middlename:
 *                 type: string
 *               lastname:
 *                 type: string
 *               dob:
 *                 type: date
 *               sinNumber:
 *                 type: number
 *               maritalStatusCode:
 *                 type: string
 *             example:
 *               firstname: John
 *               middlename: J
 *               lastname: Smith
 *               dob: 1990-11-20
 *               sinNumber: 123456789
 *               maritalStatusCode: 1
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/UserInfo'
 *       "400":
 *         $ref: '#/components/responses/DuplicateId'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /user/personal/info/{id}:
 *   get:
 *     summary: Get a user
 *     description: Logged in users can fetch only their own user information. Only admins can fetch other users.
 *     tags: [Personal Info]
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
 *                $ref: '#/components/schemas/UserInfo'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   put:
 *     summary: Update a user
 *     description: Logged in users can only update their own information.
 *     tags: [Personal Info]
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
 *               firstname:
 *                 type: string
 *               middlename:
 *                 type: string
 *               lastname:
 *                 type: string
 *               dob:
 *                 type: date
 *               sinNumber:
 *                 type: number
 *               maritalStatusCode:
 *                 type: string
 *             example:
 *               firstname: John
 *               middlename: J
 *               lastname: Smith
 *               dob: 1990-11-20
 *               sinNumber: 123456789
 *               maritalStatusCode: 1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/UserInfo'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

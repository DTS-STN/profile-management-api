"use strict";
const express = require("express");
const router = express.Router();
const validate = require("../../middlewares/validate");
const userPrefController = require("../../controllers/user_pref_controller");
const userPrefValidation = require("../../validations/user_pref_validation");

router
  .route("/:id")
  .post(
    validate(userPrefValidation.createUserPref),
    userPrefController.createUserPref,
    (req, res) => {
      console.log("post userPref");
    }
  )
  .get(
    validate(userPrefValidation.getUserPref),
    userPrefController.getUserPref,
    (req, res) => {
      console.log("get userPref");
    }
  )
  .put(
    validate(userPrefValidation.updateUserPref),
    userPrefController.updateUserPref,
    (req, res) => {
      console.log("put userPref");
    }
  );

module.exports = router;

/**
 * @swagger
 * /user/pref/{id}:
 *   post:
 *     summary: Create user preference
 *     description: Create user preference
 *     tags: [User Pref]
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
 *               webLanguageCode:
 *                 type: number
 *               correspondenceLanguageCode:
 *                 type: number
 *               brailleTtyKeyboard:
 *                 type: boolean
 *               preferredCurrencyCode:
 *                 type: number
 *               timeZoneCode:
 *                 type: number
 *               timeFormatCode:
 *                 type: number
 *             example:
 *               webLanguageCode: 1
 *               correspondenceLanguageCode: 2
 *               brailleTtyKeyboard: true
 *               preferredCurrencyCode: 1
 *               timeZoneCode: 2
 *               timeFormatCode: 1
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/UserPref'
 *       "400":
 *         $ref: '#/components/responses/DuplicateId'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *   get:
 *     summary: Get user preference
 *     description: Logged in users can fetch only their own user information.
 *     tags: [User Pref]
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
 *                $ref: '#/components/schemas/UserPref'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   put:
 *     summary: Update user preference
 *     description: Logged in users can only update their own information.
 *     tags: [User Pref]
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
 *               webLanguageCode:
 *                 type: number
 *               correspondenceLanguageCode:
 *                 type: number
 *               brailleTtyKeyboard:
 *                 type: boolean
 *               preferredCurrencyCode:
 *                 type: number
 *               timeZoneCode:
 *                 type: number
 *               timeFormatCode:
 *                 type: number
 *             example:
 *               webLanguageCode: 1
 *               correspondenceLanguageCode: 2
 *               brailleTtyKeyboard: true
 *               preferredCurrencyCode: 1
 *               timeZoneCode: 2
 *               timeFormatCode: 1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/UserPref'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

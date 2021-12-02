"use strict";
const express = require("express");
const router = express.Router();
const validate = require("../../middlewares/validate");
const userContactController = require("../../controllers/user_contact_info_controller");
const userContactValidation = require("../../validations/user_contact_info_validation");

router
  .route("/:id")
  .post(
    validate(userContactValidation.createUserContact),
    userContactController.createUserContact,
    (req, res) => {
      console.log("post userContact");
    }
  )
  .get(
    validate(userContactValidation.getUserContact),
    userContactController.getUserContact,
    (req, res) => {
      console.log("get userContact");
    }
  )
  .put(
    validate(userContactValidation.updateUserContact),
    userContactController.updateUserContact,
    (req, res) => {
      console.log("put userContact");
    }
  );

module.exports = router;

/**
 * @swagger
 * /user/contact/info/{id}:
 *   get:
 *     summary: Get user contact
 *     description: Logged in users can fetch only their own user information.
 *     tags: [User Contact]
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
 *                $ref: '#/components/schemas/UserContact'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   put:
 *     summary: Update user contact
 *     description: Logged in users can only update their own information.
 *     tags: [User Contact]
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
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               data:
 *                 type: object
 *                 properties:
 *                  streetNumber:
 *                    type: number
 *                  streetName:
 *                    type: date
 *                  aptNumber:
 *                    type: number
 *                  postalCode:
 *                    type: string
 *                  city:
 *                    type: string
 *                  country:
 *                    type: number
 *             example:
 *               phone: 6132223333
 *               email: name@example.com
 *               userAddress:
 *                streetNumber: 121
 *                streetName: Main st
 *                aptNumber: 121
 *                postalCode: K2Y3P2
 *                city: Ottawa
 *                country: 124
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/UserContact'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

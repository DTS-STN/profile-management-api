"use strict";
const express = require("express");
const router = express.Router();
const validate = require("../../middlewares/validate");
const userBenefitController = require("../../controllers/user_benefit_controller");
const userBenefitValidation = require("../../validations/user_benefit_validation");

router
  .route("/:id")
  .post(
    validate(userBenefitValidation.createUserBenefit),
    userBenefitController.createUserBenefit,
    (req, res) => {
      console.log("post UserBenefit");
    }
  )
  .get(
    validate(userBenefitValidation.getUserBenefit),
    userBenefitController.getUserBenefit,
    (req, res) => {
      console.log("get UserBenefit");
    }
  )
  .put(
    validate(userBenefitValidation.updateUserBenefit),
    userBenefitController.updateUserBenefit,
    (req, res) => {
      console.log("put UserBenefit");
    }
  );

module.exports = router;

/**
 * @swagger
 * /user/benefit/info/{id}:
 *   get:
 *     summary: Get user benefit
 *     description: Logged in users can fetch only their own user information.
 *     tags: [Benefit Info]
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
 *                $ref: '#/components/schemas/BenefitInfo'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   post:
 *     summary: create user benefit
 *     description: Logged in users can only create their own benefit.
 *     tags: [Benefit Info]
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
 *               benefits:
 *                 type: array
 *                 items:
 *                  type: object
 *                  properties:
 *                    benefitType:
 *                      type: string
 *                    applicationStatus:
 *                      type: string
 *                    paymentAmount:
 *                      type: string
 *                    paymentDate:
 *                      type: Date
 *             example:
 *               benefits:
 *                - benefitType: OAQ
 *                  applicationStatus: Approved
 *                  paymentAmount: 300
 *                  paymentDate: Jan 11, 2022
 *                - benefitType: OAQ
 *                  applicationStatus: Denied
 *                  paymentAmount: null
 *                  paymentDate: Jan 11, 2021
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
 *   put:
 *     summary: Update user benefit
 *     description: Logged in users can only update their own information.
 *     tags: [Benefit Info]
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
 *               benefits:
 *                 type: array
 *                 items:
 *                  type: object
 *                  properties:
 *                    benefitType:
 *                      type: string
 *                    applicationStatus:
 *                      type: string
 *                    paymentAmount:
 *                      type: string
 *                    paymentDate:
 *                      type: Date
 *             example:
 *               benefits:
 *                - benefitType: OAQ
 *                  applicationStatus: Approved
 *                  paymentAmount: 300
 *                  paymentDate: Jan 11, 2022
 *                - benefitType: OAQ
 *                  applicationStatus: Denied
 *                  paymentAmount: null
 *                  paymentDate: Jan 11, 2021
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/UserContact'
 *       "400":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

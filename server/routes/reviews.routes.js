import { Router } from "express";
import { getReviews, getPlaceReviews, createReview, updateReview, deleteReview, getPlaceUserReview } from "../controllers/reviews.controller.js";

const router = Router();

router.get('/reviews', getReviews);

router.get('/reviews/:id_lugar', getPlaceReviews);

router.get('/reviews/:id_lugar/:id_usuario', getPlaceUserReview);

router.post('/reviews/:id_lugar', createReview);

router.patch('/reviews/:id_lugar', updateReview);

router.delete('/reviews/:id_lugar', deleteReview);

export default router;
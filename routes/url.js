const express=require("express");
const {handleGenerateNewSortURL, handleGetAnalytics,handlePostNew}=require("../controllers/url");
const router=express.Router();

router.post("/",handleGenerateNewSortURL);
router.get('/:sortId',handlePostNew)
router.get('/analytics/:sortId',handleGetAnalytics)


module.exports={router};

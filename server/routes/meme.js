const router = require('express').Router();
const axios = require('axios'); 
const { Meme } = require('../models');
const { authMiddleware } = require("../utils/auth");


router.post('/', async (req, res) => {
    const { template_id, text0, text1 } = req.body;

    console.log('hello world');

    const params = new URLSearchParams();
    params.append('template_id', template_id);
    params.append('username', process.env.IMGFLIP_USERNAME);
    params.append('password', process.env.IMGFLIP_PASSWORD);
    params.append('text0', text0);
    params.append('text1', text1);

    console.log('hello world 2');
    
    try {
        const response = await axios.post('https://api.imgflip.com/caption_image', params);
       if (response.data.success) {
        
        await Meme.create({
            url: response.data.data.url,
            text0: text0,
            text1: text1,
            postedBy: 5
        });

        console.log(response);
    }
        res.json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to connect to Imgflip' });
    }
});

module.exports = router;
const { Router } =require('express');
const router=Router();

router.get('/test', (req,res)=> {
    const data= {
        "name":"David",
        "banda":"Disillumination", 
        "rol": "Bajista"
    }
    res.json({data});
});

module.exports = router;
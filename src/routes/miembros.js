const { Router } =require('express');
const router=Router();

const miembros=require('../miembros.json');
console.log(miembros);

router.get('/',(req,res) => {
    res.json(miembros);
})



module.exports = router;
import concert from '../models/concert.js';

export const createConcert =async (req,res) => {
    const { name, date, location, city, state_province, country, description } = req.body;
    try {
       
          
         
          const newConcert = new concert({
            
            name,
            date,
            location
,city,state_province, country, description,
            
            flyer_url:'/uploads/'+req.file.filename
        
      
          }
          
      
          );
         
         
          await newConcert.save(); 
       res.json(
          {
              newConcert

          }
        );
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
 
    
}



export const getConcertById = async  (req, res) => {
    const concertFound= await concert.findById(req.params.id) 

    
    if(!concertFound) return res.status(400).json({message:'User not found'});
 
    return res.json(
        concertFound
    )
    
    
    
 }
 

 export const deleteConcertById = async (req,res)=>{
    const concertFound= await concert.findByIdAndDelete(req.params.id) 
    console.log(concertFound)
    
    if(!concertFound) return res.status(400).json({message:'User not found'});
 
    return res.json(
        concertFound
    )
    

}


export const getAllConcerts = async (req,res)=>{
    const allConcerts = await concert.find();

return res.json(allConcerts);

}
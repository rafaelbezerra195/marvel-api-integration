const getMarvelApiParams = require('../util/marvelApiParams');
const exportCsv = require('../util/parseCsv');
const MarvelApiController = require('./MarvelApiController');

class HqController{
  async list(req, res){
    try{
      const defaultLimit = 15;
      const params = getMarvelApiParams();
      const defaultOptions = { limit : defaultLimit };  
      const comicsOptions = { ...defaultOptions };
                
      if(req.query){                
        if(req.query.character_id){
          comicsOptions.characters = req.query.character_id;                                    
        }else if(req.query.character_name){
          const characterOptions = {name: req.query.character_name};
          const charactersResult = await MarvelApiController.getCharacter(params, characterOptions);                       
          comicsOptions.characters = charactersResult.count == 0 ? [0] : charactersResult.results; 
        }     
      }
      
      const result = await MarvelApiController.getComics(params, comicsOptions);
      const csv = result.count > 0 ? exportCsv(result.results) : null;

      if(result.count > 0){
        res.header('Content-Type', 'text/csv');
        res.attachment('file.csv');
        res.status(200).send(csv);           
      }else{
        res.status(404).json(result);           
      } 
    }catch(error){
      console.log(error);
      res.status(500);
    }         
  }
}

module.exports = new HqController();
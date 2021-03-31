const axios = require('axios');
const querystring = require('querystring');

class MarvelApiController{
  async getCharacter(params, options){
    const endpoint = '/v1/public/characters?';      
    const query = {
      ts: params.ts,
      apikey: params.apiPublicKey,
      hash: params.hash,
      ...options
    };
    const qs = querystring.stringify(query);  
    const url = params.gateway + endpoint + qs;

    return await axios.get(url)
      .then(function(res){
        const {count, results} =  res.data.data;
        return {count: count, results: results.map(value => value.id)};
      })
      .catch(function(error){
        console.log(error);
        return {count: 0, results: []};
      })    
  }
  
  async getComics(params, options, done){      
    const endpoint = '/v1/public/comics?';    
    const query = {
      ts: params.ts,
      apikey: params.apiPublicKey,
      hash: params.hash,
      ...options
    };
    const qs = querystring.stringify(query);  
    const url = params.gateway + endpoint + qs;

    return await axios.get(url)
      .then(function(res){
        const {count, results} = res.data.data;
        const resultFilteres = results.map(value => {
          return {
            id: value.id,
            title: value.title,
            page_count: value.pageCount,
            isbn: value.isbn,
            release_date: value.dates[0].date,
            prices: value.prices[0].price
          }
        });

        return {
          count: count, 
          results: resultFilteres
        };
      })
      .catch(function(error){
        console.log(error);
        return {count: 0, results: []};
      })
  }
}

module.exports = new MarvelApiController();
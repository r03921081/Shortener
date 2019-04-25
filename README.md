# Shortener
     * A basic tiny URL service.  
 
     * Javascript, Nodejs, Express, JSON, Redis, MongoDB
  
## Functions
     1. longURL to ShortURL
        * Check if the longURL is not converted, give the automatically generated shortURL and store it in MongoDB.  
         
     2. ShortURL to LongURL
        * Get the longURL corresponding to shortURL from MongoDB and redirect to longURL.

## Screenshot
     1. Postman: longURL to ShortURL
![](https://github.com/r03921081/Shortener/blob/master/Images/redis_post.PNG)

     2. Postman: ShortURL to LongURL
![](https://github.com/r03921081/Shortener/blob/master/Images/redis_get.PNG)

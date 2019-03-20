# Shortener
 * The backend implementation of tiny URLs.
 * Provide bidirectional conversion of long URLs and short URLs.
  
## Functions
 * longURL to ShortURL
    * Check if the longURL is not converted, given the automatically generated shortURL and store it in MongoDB.
 * ShortURL to LongURL
    * Get the longURL corresponding to shortURL from MongoDB and redirect to longURL.

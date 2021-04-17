/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: API - Sprint 1
This is where the error response is so
the response can be used all throughout the APIs
 ***/

// The BaseResponse class provides a response object for requests.

class BaseResponse {
  constructor(httpCode,message,data,timestamp)
  {
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
    this.timestamp = new Date().toLocaleDateString('en-US')
  }

  toObject()
  {
    return {
      'httpCode' : this.httpCode,
      'message' : this.message,
      'data' : this.data,
      'timestamp' : this.timestamp
    }
  }
}

module.exports = BaseResponse;

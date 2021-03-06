import {ErrorRequestHandler, response} from 'express'

import {ValidationError} from 'yup';

interface ValidationErrors {
  [key: string]: string[];
}

// {
//   "name" : ['obrigatorio', 'minimo de caracteres'],
//   "latitude" : ['obrigatprio' , 'minimo de caracteres']
// }

const errorHandler: ErrorRequestHandler = (error, request, response, next ) =>{
  if (error instanceof ValidationError){
    let errors: ValidationErrors = {};
    
    error.inner.forEach(err => {
      errors[err.path] = err.errors;
    });

    return response.status(400).json({message: 'status fails', errors})
  }

  
  
  return response.status(500).json({message: 'internal server error'})
}

export default errorHandler;
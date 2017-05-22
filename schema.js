  const createUserSchema = {
      type: 'object',
      properties: {
          supplier_email: {
              type: 'string',
              required: true
          },
          supplier_name: {
              type: 'string',
              required: true
          },
          password: {
              type: 'string',
              required: true 
          }
      }
  };

  const updateUserSchema = {
      type: 'object',
      properties: {
          id: {
              type: 'integer',
              required: true
          },
          supplier_email: {
              type: 'string',
              required: true
          },
          supplier_name: {
              type: 'string',
              required: true
          },
          password: {
              type: 'string',
              required: true 
          }
      }
  };

  const deleteUserSchema = {
      type: 'object',
      properties: {
          id: {
              type: 'integer',
              required: true
          } 
      }
  };



   const createProductSchema = {
      type: 'object',
      properties: {
          supplier_id: {
              type: 'integer',
              required: true
          },
          product_name: {
              type: 'string',
              required: true
          },
          product_description: {
              type: 'string',
              required: true 
          },
          status: {
              type: 'string',
              required: true,
              enum: ['Acive', 'Inactive'] 
          }
      }
  };
  
  const searchProductSchema = {
      type: 'object',
      properties: {  
          product_name: {
              type: 'string',
              required: true
          } 
      }
  };

  const updateProductSchema = {
      type: 'object',
      properties: {
         supplier_id: {
              type: 'integer',
              required: true
          },
          product_name: {
              type: 'string',
              required: true
          },
          product_description: {
              type: 'string',
              required: true 
          },
          status: {
              type: 'string',
              required: true,
              enum: ['Acive', 'Inactive'] 
          }
      }
  };

   const deleteProductSchema = {
      type: 'object',
      properties: {
          id: {
              type: 'integer',
              required: true
          } 
      }
  };

    module.exports ={
      "createUserSchema" : createUserSchema,
      "updateUserSchema" : updateUserSchema,
      "deleteUserSchema" : deleteUserSchema,
      "createProductSchema" : createProductSchema,
      "searchProductSchema" : searchProductSchema,
      "updateProductSchema" : updateProductSchema,
      "deleteProductSchema" : deleteProductSchema
    }
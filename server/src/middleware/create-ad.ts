// export const createAd = (JSONSchema: CustomJSONS)(err, req, res, next ) {
//   let responseData;
//   if (err.name === 'JsonSchemaValidation') {
//     console.log(err.message);

//     res.status(400);
//     responseData = {
//       statusText: 'Bad Request',
//       jsonSchemaValidation: true,
//       validations: err.validations, // All of your validation information
//     };

//     if (req.xhr || req.get('Content-Type') === 'application/json') {
//       res.json(responseData);
//     } else {
//       res.render('badrequestTemplate', responseData);
//     }
//   } else {
//     next(err);
//   }
// }

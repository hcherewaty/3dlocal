'use strict';

  
exports.sanitize = function(data) {
    if (data instanceof Object) {
      for (let key in data) {
        if (/^\$/.test(key)) {
          delete data[key];
        }
      }
    }
    return data;
  };


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// let req = {
//     params: {
//         $gt: 123456, 
//         somethingElse: 'blahblahblah', 
//         anotherThing: 'whatever'
//     },
//     body: {
//         modeling: 'Yes',
//         description: 'Stuff goes here.', 
//         $gt: 1111100000
//     } 
// }

// let req = {
//     body: {
//         email: 'meow@meow.com',
//         $gt: '$1234%skfejef'
//     }
// }
// function sanitize(data) {
//     if (data instanceof Object) {
//       for (let key in data) {
//         if (/^\$/.test(key)) {
//           delete data[key];
//         }
//       }
//     }
//     return data;
//   };

//   function findingStuff(req, res, next){
//     let sanitizedUser = sanitize(req);
//     let user = {
//         email: sanitizedUser.body.email,
//         password: sanitizedUser.body.password,
//     }
//     console.log('sanitized user:', user);
//   }

//   findingStuff(req);



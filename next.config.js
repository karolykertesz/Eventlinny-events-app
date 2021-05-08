module.exports = {
  future: {
    webpack5: true,
  },
};

// module.exports = {
//   async headers() {
//     return [
//       {
//         source: '/api/users/loger',
//         headers: [
//           {
//             key: 'CSRF-Token',
//             value: process.env.SESSION_SECRET,
//           },
//         ],
//       },
//     ];
//   },
// };

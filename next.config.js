module.exports = {
  future: {
    webpack5: true,
  },
};

// module.exports = {
//   webpack: {
//     node: {
//       fs: "empty",
//       child_process: "empty",
//     },
//   },
// };
// const config = {
//   fs: "empty",
//   child_process: "empty",
// };
// module.exports = {
//   webpack(config, { dev }) {
//     // modify it!
//     return config;
//   },
// };

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

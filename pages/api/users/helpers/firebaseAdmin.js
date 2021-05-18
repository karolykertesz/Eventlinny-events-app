const admin = require("firebase-admin");
const serviceAccount = require("../../../../service/next-events-309cd-firebase-adminsdk-5vizw-f25b60cc6e.json");

export default fireAdmin = () => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DB_URL,
    });
  }
};
fireAdmin();
// export const fireAdmin = () => {
//   if (!admin.apps.length) {
//     return admin.initializeApp({
//       projectId: "next-events-309cd",
//       privateKey:
//         "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCxYVE4oSjbrex6\nxxmvA2osf73Cdh+ugjGbQtCKKGx+bdXlI/LQNdw++5Ac/ISQVtPNfC47GX1QRzqT\n/0BrwHQrtBKG1hyMDk7yUUnRs2l9Dsc8/QihLxNUO8ETzlRuKh1/J0sKXAH2J9Zh\nSqSHNF9MryFK7wyk2hRMwPA9Lo3Bpm0jegdpAHBfVOUliE7/DZcVt8eO/jETIblW\nT/jDnSm5JrT3MO2EchQc2crGbyq2kp4iBrUdm02eabwPnKNArZuVvojfAUyu4bAK\nhmXtWFNZq7xk1qQKDhqQcixZPNvxfor31MfI0nV28C9kGG9dSd6hASGJxmgWGibr\nC6BdDcMBAgMBAAECggEABYJ1HeRB5Ec5pSAUNaaFSdD78pNttlpKMuHAezavOb5j\nyBbH+lynopxULbErsKfFM21nYVq01NMpkUcfV8cvNJLiPd05+nyQt+kgCzjMMzuV\nENllxybFG9ufAXazSWGRpo1eQNVWEowTg9SMx5cwEuTpaC4W0aqcJ88Gq9xm0mDo\nayqqk+JmQ/hJBDzfEXZtvNSEiaEdGY0acVnzSLL8+tOeA3bGHNjJ6VrrjW5IZ0kI\n6Nd9ZGnq+0y2zjf2vbmiPhFJmtmLRaKnBai8mOZ0bTZtgJUokKTaNz6/w2MnvI5A\nB4lGLi/2gl1AjT2ZW0RVyKRNa3tzbD2pzCluZpYdqwKBgQD00KPDFzJE1BD8gxTj\nwNJYk0fPJXNLRWdATQgTL0DPOYk+RkFnH8EcNnhwIxi9C4myh86ZfzdpyMe1JZK/\n/X5B4sgGC2WYskEnl0YoZdzalGkpgwluJJWLkOhFLlSPDL+ZooAOtDiITh6shckv\ntAREgn4X/FOsSbWz4CRRuwPcvwKBgQC5e/VaOyvwu3XfY27O5p9y4ej8I7yEQcc6\npcrJI6WKZBayf0mjtPb5exNHR+w1wn8i03hVDHiSjtePYUTdXSt961N4U5Eo8me7\nrPpEq9jVYTy8IS6JyxlSqqfp08s1InDz237Q4XQMXEG+WB+6AWVOCbucrnVJo6K9\ndbvbzdGQPwKBgHq+3UzkpXyjAz1ID8I9nHlyps9yjIMR8jnoJYNQ7uK3i1tg6Evn\nPPCDUxGOV0n5rfmIZArMISF13MOzage+9n3cUcPOFQthXI+YJkH9CKXDQZLhs2m5\nCA3pArwlBZqPnsVOF3zH2Yxl9rUzgvLbBETBVK18AwvgDS151VvxM3eLAoGAKV3T\n4kPAEPg92Yw7cjlM5jor08/Eg1qILDQ9fY5NpQedaEGrEq+RRSKFsigALh0qbYHs\nHEujuEvTF08CJLxarsKE4xkADrnBGMIDLr2EplIBUZO05VY+V4ln2WY6s6byufAB\n4GPnlbodj23n5XvaNAVHqjHeRoYQDWDsfKDyU9ECgYBG5ZfbGYLCbR6K6OrrPV36\n08q4Cp+HN3OMJI9ORdSpRFAu1tOq4C0gpVZtJKmcrYF9NGZo62s/Y82yWtOylpve\n6dymR0Q3k+kq7qnmaHb5R+xqprzQLjYhbbMnRSc373Zc9G/j+CcZ3jJsGc4lZBJq\nO43nY5yCqWZyUs/Hq6B7+Q==\n-----END PRIVATE KEY-----\n",
//       clientEmail:
//         "firebase-adminsdk-5vizw@next-events-309cd.iam.gserviceaccount.com",
//       databaseURL: process.env.FIREBASE_DB_URL,
//     });
//   }
// };

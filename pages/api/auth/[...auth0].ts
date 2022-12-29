import { handleAuth } from '@auth0/nextjs-auth0';

export default handleAuth();

// export default handleAuth({
//     async login(req, res) {
//         try {
//             console.error("Login");
//             await handleLogin(req, res, {
//                 authorizationParams: {
//                     audience: 'https://apigw.vulkaza-testing.com/relay',
//                     scope: 'openid profile email offline_access'
//                 }
//             })
//         } catch (error: any) {
//             res.status(error.status || 400).end(error.message)
//         }
//     },
//     async callback(req, res) {
//         try {
//             console.error("CALLBACK");

//             await handleCallback(req, res, {
//                 async afterCallback(req, res, session, state) {
//                     return session;
//                 },
//             });
//         } catch (error: any) {
//             res.status(error.status || 500).end(error.message);
//         }
//     }
// });
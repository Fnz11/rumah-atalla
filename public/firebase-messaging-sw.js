/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
console.log("THIS IS FROM SW PUBLIC");

importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const defaultConfig = {
  apiKey: true,
  projectId: true,
  messagingSenderId: true,
  appId: true,
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// import { getToken, getMessaging } from "firebase/messaging";
// import { registerMessaging } from "firebase/messaging";

// const messaging = getMessaging();

// getToken(messaging, {
//   vapidKey:
//     "BFn7WimjcSHwWnLjW0ff-DJG2r9ecuEs7GNNjw7sOcs1Zn_LIkS7DemsBNuECqBZScUbNLXXdFpvRNY2e1yXNV0",
// })
//   .then((currentToken) => {
//     if (currentToken) {
//       console.log("Got registration token:", currentToken);
//       // Send the token to your server and update the UI if it's new
//     } else {
//       // Show permission request UI
//       console.log(
//         "No registration token available. Request permission to generate one."
//       );
//       // ...
//     }
//   })
//   .catch((err) => {
//     console.log("An error occurred while retrieving token. ", err);
//     // ...
//   });

// messaging.setBackgroundMessageHandler(function (payload) {
//   const title = "Hello World";
//   const option = { body: payload.data.status };
//   return self.registration.showNotification(title, option);
// });

// registerMessaging(messaging);

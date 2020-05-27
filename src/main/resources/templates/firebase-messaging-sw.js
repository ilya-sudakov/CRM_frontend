importScripts('https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js')
firebase.initializeApp({
  // Project Settings => Add Firebase to your web app
  messagingSenderId: '735601754535',
})
const messaging = firebase.messaging()
// messaging.setBackgroundMessageHandler(function (payload) {
//   const promiseChain = clients
//     .matchAll({
//       type: 'window',
//       includeUncontrolled: true,
//     })
//     .then((windowClients) => {
//       for (let i = 0; i < windowClients.length; i++) {
//         const windowClient = windowClients[i]
//         windowClient.postMessage(payload)
//       }
//     })
//     .then(() => {
//       return registration.showNotification('my notification title')
//     })
//   return promiseChain
// })
// self.addEventListener('notificationclick', function (event) {
//   // do what you want
//   // ...
// })

messaging.setBackgroundMessageHandler(function (payload) {
  console.log('Handling background message ', payload)

  return self.registration.showNotification(payload.data.title, {
    body: payload.data.body,
    icon: payload.data.icon,
    tag: payload.data.tag,
    data: payload.data.link,
  })
})

self.addEventListener('notificationclick', function (event) {
  event.notification.close()
  event.waitUntil(self.clients.openWindow(event.notification.data))
})

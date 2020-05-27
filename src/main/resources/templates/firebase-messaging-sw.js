importScripts('https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js')

firebase.initializeApp({
  // Project Settings => Add Firebase to your web app
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
})
const messaging = firebase.messaging()

if (firebase.messaging.isSupported()) {
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
} else {
  console.log('browser not supported for firebase')
}

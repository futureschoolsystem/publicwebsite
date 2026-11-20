// src/lib/pushNotification.js
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";
import path from "path";
import fs from "fs";

function getFirebaseMessaging() {
  if (getApps().length > 0) {
    return getMessaging();
  }

  try {
    let credentialData = null;

    // 1. Check for service-account.json in the project root
    const keyPath = path.join(process.cwd(), "service-account.json");
    const altKeyPath = path.join(process.cwd(), "firebase-service-account.json");

    if (fs.existsSync(keyPath)) {
      credentialData = JSON.parse(fs.readFileSync(keyPath, "utf-8"));
    } else if (fs.existsSync(altKeyPath)) {
      credentialData = JSON.parse(fs.readFileSync(altKeyPath, "utf-8"));
    } else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      try {
        credentialData = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      } catch (parseErr) {
        console.error("Error parsing FIREBASE_SERVICE_ACCOUNT env var:", parseErr);
      }
    } else if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
      credentialData = {
        projectId: process.env.FIREBASE_PROJECT_ID || "futureschoolsystem",
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      };
    }

    if (credentialData) {
      initializeApp({
        credential: cert(credentialData),
        projectId: "futureschoolsystem",
      });
      console.log("Firebase Admin successfully initialized for Push Notifications.");
      return getMessaging();
    } else {
      console.warn("⚠️ Firebase service-account.json not found in website root. Push notifications won't send until key is added.");
      return null;
    }
  } catch (err) {
    console.error("Error initializing Firebase Admin:", err);
    return null;
  }
}

/**
 * Sends a real-time high-priority push notification to all parents via Firebase Cloud Messaging.
 * Works even when the mobile app is completely closed or in deep sleep.
 */
export async function sendPushNotification({
  title,
  body,
  topic = "notices",
  data = {},
}) {
  const messaging = getFirebaseMessaging();
  if (!messaging) {
    console.warn("Skipping push notification: Firebase Messaging not initialized.");
    return false;
  }

  try {
    const stringData = {};
    for (const [key, value] of Object.entries(data)) {
      stringData[key] = String(value);
    }
    stringData["title"] = String(title);
    stringData["body"] = String(body);
    stringData["click_action"] = "FLUTTER_NOTIFICATION_CLICK";

    const message = {
      topic: topic,
      notification: {
        title: title,
        body: body,
      },
      data: stringData,
      android: {
        priority: "high",
        notification: {
          channelId: "fss_alerts_channel",
          sound: "default",
          priority: "max",
          defaultSound: true,
          defaultVibrateTimings: true,
          visibility: "public",
        },
      },
    };

    const response = await messaging.send(message);
    console.log("Push notification successfully sent via Firebase:", response);
    return true;
  } catch (error) {
    console.error("Failed to send push notification via Firebase:", error);
    return false;
  }
}

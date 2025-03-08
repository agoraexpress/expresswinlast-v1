const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Create a new order
exports.createOrder = functions.https.onCall(async (data, context) => {
  // Check if user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be authenticated",
    );
  }

  const userId = context.auth.uid;
  const {
    items,
    total,
    address,
    phone,
    paymentMethod,
    usedCoins,
    earnedCoins,
  } = data;

  try {
    // Create order in Firestore
    const orderRef = await admin
      .firestore()
      .collection("orders")
      .add({
        userId,
        items,
        total,
        status: "new",
        address,
        phone,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        paymentMethod,
        usedCoins: usedCoins || 0,
        earnedCoins: earnedCoins || 0,
      });

    // Update user coins if needed
    if (usedCoins > 0 || earnedCoins > 0) {
      const userRef = admin.firestore().collection("users").doc(userId);
      const userDoc = await userRef.get();

      if (userDoc.exists) {
        const userData = userDoc.data();
        const currentCoins = userData.coins || 0;
        const newCoins = currentCoins - (usedCoins || 0) + (earnedCoins || 0);

        await userRef.update({ coins: newCoins });

        // Record coin transaction
        await admin
          .firestore()
          .collection("coinTransactions")
          .add({
            userId,
            orderId: orderRef.id,
            earnedCoins: earnedCoins || 0,
            usedCoins: usedCoins || 0,
            balance: newCoins,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
          });
      }
    }

    return { success: true, orderId: orderRef.id };
  } catch (error) {
    console.error("Error creating order:", error);
    throw new functions.https.HttpsError("internal", "Error creating order");
  }
});

// Process payment (mock implementation)
exports.processPayment = functions.https.onCall(async (data, context) => {
  // Check if user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be authenticated",
    );
  }

  const { orderId, paymentMethod, amount } = data;

  try {
    // In a real implementation, you would integrate with a payment gateway
    // This is a mock implementation
    const paymentResult = {
      success: true,
      transactionId: `txn_${Date.now()}`,
      amount,
      currency: "MAD",
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Update order with payment information
    await admin.firestore().collection("orders").doc(orderId).update({
      paymentStatus: "paid",
      paymentDetails: paymentResult,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return paymentResult;
  } catch (error) {
    console.error("Error processing payment:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Error processing payment",
    );
  }
});

// Add loyalty points/stamps
exports.addLoyaltyPoints = functions.https.onCall(async (data, context) => {
  // Check if user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be authenticated",
    );
  }

  const userId = context.auth.uid;
  const { cardId, stampCode } = data;

  try {
    // Verify stamp code (in a real implementation, you would validate against issued codes)
    if (!stampCode || !stampCode.startsWith("*")) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Invalid stamp code",
      );
    }

    // Get the stamp card
    const cardRef = admin.firestore().collection("stampCards").doc(cardId);
    const cardDoc = await cardRef.get();

    if (!cardDoc.exists) {
      throw new functions.https.HttpsError("not-found", "Stamp card not found");
    }

    const cardData = cardDoc.data();

    // Check if card belongs to user
    if (cardData.userId !== userId) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Card does not belong to this user",
      );
    }

    // Add stamp
    const newStampCount = (cardData.collectedStamps || 0) + 1;
    await cardRef.update({
      collectedStamps: newStampCount,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Check if any rewards are unlocked
    let unlockedReward = null;
    if (cardData.rewardStages) {
      for (const stage of cardData.rewardStages) {
        if (stage.stamps === newStampCount) {
          unlockedReward = stage.reward;
          break;
        }
      }
    }

    return {
      success: true,
      newStampCount,
      totalStamps: cardData.totalStamps,
      unlockedReward,
    };
  } catch (error) {
    console.error("Error adding loyalty points:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Error adding loyalty points",
    );
  }
});

const { db } = require("./config/firebaseAdmin");

async function test() {
  try {
    const snapshot = await db.collection("students").get();

    console.log("Students Found:", snapshot.size);

    snapshot.forEach((doc) => {
      console.log(doc.data());
    });

    process.exit();
  } catch (err) {
    console.error(err);
  }
}

test();
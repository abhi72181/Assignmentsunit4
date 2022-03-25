const { createClient } = require("redis");


const client = createClient({ url: "redis://127.0.0.1:6379" });


client.on("error", function (err) {
  console.error({ message: err.message });
});

module.exports = client;

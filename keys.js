let Twitter = require("twitter");
let Spotify = require("node-spotify-api");

let keys = {
  twitter: new Twitter({
    consumer_key: "4TeFkUWmS9TpOXP5f1rmfX133",
    consumer_secret: "c9wclHoEvz2wtIi82JIWpPf8nZ63nkIU1SeQPp3fiVAEm2pS9p",
    access_token_key: "911635076483391488-1gBIP4PZDUyAFNrXAvhyGpcdFPheKm3",
    access_token_secret: "e5k8C7uVsIyHKKpFUt21dMN0Cq30u3xjAL3vmQpd1kkFN"
  }),
  spotify: new Spotify({
    id: "1cc854576b604874a9427c3f135a2b0f",
    secret: "d595a9bb0a304f419238baf4d01de63e"
  })
}

module.exports = keys;
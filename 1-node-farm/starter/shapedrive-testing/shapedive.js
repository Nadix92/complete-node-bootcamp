const request = require("request");
const options = {
  method: "POST",
  url:
    "https://sdtest.us-east-1.shapediver.com/ticket/d3955f5d8dd7b6f2d3ef4ac5b2d2006634855d67912a9247b8058d84d28463cedd18580f4f2d5ee874f69f08d14ad103ca7c375d3b176bbd2a4991b65b0af9b228a051c6009400941bc89c98cb8c8921b1b24bc395fbbe4ff1ae537c3ef711f7ff64152cc30f770dd91c3faa4db02c556fd70e46a7f62cc9cd411718c8992d93e9e918e61a46d1-be8b72d44689b80b5a38a44d1010c1f1",
  headers: {
    "Content-Type": "application/json"
  }
};
request(options, function(error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

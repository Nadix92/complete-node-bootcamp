const fetchBtn = document.getElementById("fetch-btn");

const fetchHandler = () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = "";

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch(
    "https://sdtest.us-east-1.shapediver.com/ticket/4369f8089012c5f45040143e5db383ea5b23fb715483d58667d662fe58901469d583d72e27e75f2095514a468ae21a01c639e465d553e9b5b1a239d75427ceaa66a069727d3bfee0437b45a1387d17fdf17c5da52ca5e82e27958b860521f80b0a971fda6b6cdd3981041bee6f068682b0ab572af516-11a12f8a6d394e7d049744b8dff5a626",
    requestOptions
  )
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log("error", error));
};

fetchBtn.addEventListener("click", fetchHandler);

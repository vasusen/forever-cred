const fetch = require("node-fetch");

// credsString must contain a credentials token at the end of the string. the following examples work:
// "https://www.coursera.org/account/accomplishments/records/TOKEN"
// "www.coursera.org/account/accomplishments/certificate/TOKEN"
// "TOKEN"

export const getCredentials = async (credsString) => {
  const token = credsString.split("/").slice(-1)[0];
  const api = `https://0sx1faywpd.execute-api.us-east-1.amazonaws.com/default/scrapeCredentials?id=${token}`

  const response = await fetch(api)
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    });

  return response;
}


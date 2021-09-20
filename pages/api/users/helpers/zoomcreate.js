import { v4 as uuidv4 } from "uuid";
const jwt = require("jsonwebtoken");

const axios = require("axios");
const handler = (fn) => async (req, res) => {
  const { email, start, description, category } = req.body;
  const key = process.env.NEXT_PUBLIC_ZOOM_KEY;
  const secret = process.env.NEXT_PUBLIC_ZOOM_SECRET;
  const password = uuidv4();
  const token = jwt.sign(
    {
      iss: key,
      exp: 1496091964000,
    },
    secret
  );
  const userOptions = {
    topic: `${category} EVENT`,
    type: 2,
    start_time: start,
    password: password.slice(0, 9).replace("-", ""),
    duration: 120,
    agenda: description,
    timezone: "Europe/Berlin",
    settings: {
      host_video: false,
      participant_video: false,
      join_before_host: true,
      mute_upon_entry: true,
      use_pmi: false,
      approval_type: 0,
      alternative_hosts: email,
      close_registration: true,
    },
  };
  const userconfig = {
    method: "POST",
    url: "https://api.zoom.us/v2/users/me/meetings",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    data: userOptions,
    json: true,
  };
  const user = await axios(userconfig);
  const response = await user;
  return fn(response, token, req, res, password);
};

export default handler(async function create(
  response,
  token,
  req,
  res,
  password
) {
  if (response.status !== 201) {
    return res.status(400).json({
      message: "Error while creating meeting",
    });
  }
  const { data } = response;
  res.status(200).json(data);
});

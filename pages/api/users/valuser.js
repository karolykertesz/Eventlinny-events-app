import { authChecker } from "./validate";
export default authChecker(async function validate(req, res) {
  return res.status(200).json({ message: "valid user" });
});

import { updateMembership } from "../db/query.js";
import { updateAdmin } from "../db/query.js";
function memberLogin(req, res) {
  console.log(req.body);
  if (req.body.secret === "club") {
    if (req.body.admin || false) {
      updateAdmin(req.user.user_id);
    }
    updateMembership(req.user.user_id);
    res.redirect("/");
  } else {
    res.locals.error = "Wrong secret key";
    res.render("member");
  }
}

export default memberLogin;

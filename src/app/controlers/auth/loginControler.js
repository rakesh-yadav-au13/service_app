const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const layout = path.join("layout");
const UserSchema = require("../../../models/userSchema");

const LoginControler = {
  getLogin(req, res) {
    res.render("auth/login", {
      layout,
    });
  },

  async postLogin(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        req.flash("error", "All fields required");
        return res.redirect("/login");
      }

      let user = await UserSchema.findOne({ email: email });
      if (!user) {
        req.flash("error", "Invalid Email");
        return res.redirect("/login");
      }

      let isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        req.flash("error", "Invalid Password");
        return res.redirect("/login");
      }

      const token = jwt.sign({ id: user._id }, "jwt_Secret", {
        expiresIn: 3600,
      });
      if (!token) {
        req.flash("error", "Something went wrong");
        res.render("auth/login", {
          layout,
        });
      }
      const decoded = jwt.verify(token, "jwt_Secret");
      if (decoded) {
        req.session.token = decoded;
        req.session.name = user.name;
        if (user.profile) {
          req.session.role = user.profile.role;
        }
        res.redirect("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  postLogout(req, res) {
    delete req.session.token;
    delete req.session.name;
    delete req.session.role;
    res.redirect("/");
  },
};

module.exports = LoginControler;

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs")

module.exports = function (app) {
    app.post("/api/user", createUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/login", passport.authenticate('local'), login);
    app.post("/api/logout", logout);
    app.post("/api/register", register);
    app.post("/api/loggedIn", loggedIn);

    var userModel = require("../models/user/user.model.server");

    //===============================
    // PASSPORT CONFIG
    //===============================

    passport.use(new LocalStrategy(localStrategy));

    function localStrategy(username, password, done) {
        userModel.findUserByUsername(username).then(
            function (user) {
                if (user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        );
    }

    passport.serializeUser(serializeUser);

    function serializeUser(user, done) {
        done(null, user);
    }

    passport.deserializeUser(deserializeUser);

    function deserializeUser(user, done) {
        userModel.findUserById(user._id).then(
            function (user) {
                done(null, user);
            },
            function (err) {
                done(err, null);
            }
        );
    }

    //=================================
    // BACKEND API
    //=================================

    function loggedIn(req, res) {
        res.json(req.isAuthenticated() ? req.user : '0');
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logout();
        req.session.destroy(function (err) {
            res.json(true);
        });
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.password = bcrypt.hashSync(newUser.password);
        userModel.findUserByUsername(newUser.username).then(
            function (user) {
                if (user) {
                    res.sendStatus(400).json("Username is in use!");
                    return;
                } else {
                    userModel.createUser(newUser).then(
                        function (user) {
                            if (user) {
                                req.login(user, function (err) {
                                    if (err) {
                                        res.sendStatus(400).send(err);
                                    } else {
                                        res.json(user);
                                    }
                                });
                            }
                        }
                    )
                }
            }
        )
    }

    function createUser(req, res) {
        var newUser = req.body;
        userModel.createUser(newUser).then(
            function (user) {
                if (user) {
                    res.json(user);
                } else {
                    res.sendStatus(400).send("Cannot create user.");
                }
            },
            function (err) {
                res.sendStatus(400).send(err)
            }
        );
    }

    function findUserById(req, res) {
        var userId = req.params["userId"];
        userModel.findUserById(userId).then(
            function (user) {
                if (user) {
                    res.json(user);
                } else {
                    res.sendStatus(400).send("Cannot find user with the ID");
                }
            },
            function (err) {
                res.sendStatus(400).send(err);
            }
        );
    }

    function updateUser(req, res) {
        var userId = req.params["userId"];
        var updatedUser = req.body;
        userModel.updateUser(userId, updatedUser).then(
            function (user) {
                if (user) {
                    res.json(user);
                } else {
                    res.sendStatus(400).send("Cannof find user");
                }
            },
            function (err) {
                res.sendStatus(400).send(err);
            }
        );
    }

    function deleteUser(req, res) {
        var userId = req.params["userId"];
        userModel.deleteUser(userId).then(
            function (stats) {
                res.json(stats);
            },
            function (err) {
                res.sendStatus(400).send(err);
            }
        );
    }
}
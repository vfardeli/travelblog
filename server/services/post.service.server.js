module.exports = function (app) {
    app.post("/api/user/:userId/post", createPost);
    app.get("/api/user/:userId/post", findAllPostsForUser);
    app.get("/api/post", findAllPosts);
    app.get("/api/post/:postId", findPostById);
    app.put("/api/post/:postId", updatePost);
    app.delete("/api/post/:postId", deletePost);

    var postModel = require("../models/post/post.model.server");
    var geocoder = require('geocoder');

    function createPost(req, res) {
        var newPost = req.body;

        geocoder.geocode(newPost.location, function (err, data) {
            newPost.lat = data.results[0].geometry.location.lat;
            newPost.lng = data.results[0].geometry.location.lng;
            newPost.location = data.results[0].formatted_address;
            
            postModel.createPost(newPost).then(
                function (post) {
                    if (post) {
                        res.json(post);
                    } else {
                        res.sendStatus(400).send("Cannot create post.");
                    }
                },
                function (err) {
                    res.sendStatus(400).send(err)
                }
            );
        });
    }

    function findAllPosts(req, res) {
        postModel.findAllPosts().then(
            function (posts) {
                if (posts) {
                    res.json(posts);
                }
            },
            function (err) {
                res.sendStatus(400).send(err);
            }
        );
    }

    function findAllPostsForUser(req, res) {
        var userId = req.params["userId"];
        postModel.findAllPostsForUser(userId).then(
            function (posts) {
                if (posts) {
                    res.json(posts);
                } else {
                    res.sendStatus(400).send("Cannot find posts with the userID");
                }
            },
            function (err) {
                res.sendStatus(400).send(err);
            }
        );
    }

    function findPostById(req, res) {
        var postId = req.params["postId"];
        postModel.findPostById(postId).then(
            function (post) {
                if (post) {
                    res.json(post);
                } else {
                    res.sendStatus(400).send("Cannot find post with the ID");
                }
            },
            function (err) {
                res.sendStatus(400).send(err);
            }
        );
    }

    function updatePost(req, res) {
        var postId = req.params["postId"];
        var updatedPost = req.body;
        postModel.updatePost(postId, updatedPost).then(
            function (post) {
                if (post) {
                    res.json(post);
                } else {
                    res.sendStatus(400).send("Cannot find post");
                }
            },
            function (err) {
                res.sendStatus(400).send(err);
            }
        );
    }

    function deletePost(req, res) {
        var postId = req.params["postId"];
        postModel.deletePost(postId).then(
            function (stats) {
                res.json(stats);
            },
            function (err) {
                res.sendStatus(400).send(err);
            }
        );
    }
}
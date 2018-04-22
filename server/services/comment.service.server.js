module.exports = function (app) {
    app.post("/api/user/:userId/comment", createComment);
    app.get("/api/comment/:commentId", findCommentById);
    app.put("/api/comment/:commentId", updateComment);
    app.delete("/api/comment/:commentId", deleteComment);

    var commentModel = require("../models/comment/comment.model.server");

    function createComment(req, res) {
        var newComment = req.body;
        commentModel.createComment(newComment).then(
            function (comment) {
                if (comment) {
                    res.json(comment);
                } else {
                    res.sendStatus(400).send("Cannot create comment.");
                }
            },
            function (err) {
                res.sendStatus(400).send(err)
            }
        );
    }

    function findCommentById(req, res) {
        var commentId = req.params["commentId"];
        commentModel.findCommentById(commentId).then(
            function (comment) {
                if (comment) {
                    res.json(comment);
                } else {
                    res.sendStatus(400).send("Cannot find comment with the ID");
                }
            },
            function (err) {
                res.sendStatus(400).send(err);
            }
        );
    }

    function updateComment(req, res) {
        var commentId = req.params["commentId"];
        var updatedComment = req.body;
        commentModel.updateComment(commentId, updatedComment).then(
            function (comment) {
                if (comment) {
                    res.json(comment);
                } else {
                    res.sendStatus(400).send("Cannot find comment");
                }
            },
            function (err) {
                res.sendStatus(400).send(err);
            }
        );
    }

    function deleteComment(req, res) {
        var commentId = req.params["commentId"];
        commentModel.deleteComment(commentId).then(
            function (stats) {
                res.json(stats);
            },
            function (err) {
                res.sendStatus(400).send(err);
            }
        );
    }
}
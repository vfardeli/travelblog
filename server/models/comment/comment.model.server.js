var mongoose = require('mongoose');
var CommentSchema = require('./comment.schema.server');
var Comment = mongoose.model('Comment', CommentSchema);

Comment.createComment = createComment;
Comment.findCommentById = findCommentById;
Comment.updateComment = updateComment;
Comment.deleteComment = deleteComment;

module.exports = Comment;

function createComment(comment) {
    return Comment.create(comment);
}

function findCommentById(commentId) {
    return Comment.findById(commentId);
}

function updateComment(commentId, comment) {
    return Comment.findByIdAndUpdate(commentId, comment);
}

function deleteComment(commentId) {
    return Comment.findByIdAndRemove(commentId);
}
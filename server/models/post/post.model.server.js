var mongoose = require('mongoose');
var PostSchema = require('./post.schema.server');
var Post = mongoose.model('Post', PostSchema);

Post.createPost = createPost;
Post.findPostById = findPostById;
Post.findAllPostsForUser = findAllPostsForUser;
Post.findAllPosts = findAllPosts;
Post.updatePost = updatePost;
Post.deletePost = deletePost;

module.exports = Post;

function createPost(post) {
    return Post.create(post);
}

function findAllPosts() {
    return Post.find();
}

function findPostById(postId) {
    return Post.findById(postId).populate("comments").exec();
}

// function findPostByIdWithComments(postId) {
//     return Post.findById(postId).populate("comments").exec(function (err, foundPost) {
//         return foundPost;
//     });
// }

function findAllPostsForUser(userId) {
    return Post.find().where('author.id').equals(userId);
}

function updatePost(postId, post) {
    return Post.findByIdAndUpdate(postId, post);
}

function deletePost(postId) {
    return Post.findByIdAndRemove(postId);
}
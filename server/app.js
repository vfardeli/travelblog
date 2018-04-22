module.exports = function(app) {
    require("./services/user.service.server.js")(app);
    require("./services/comment.service.server.js")(app);
    require("./services/post.service.server.js")(app);
    var db = require("./models/models.server");
};
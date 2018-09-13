/* eslint-disable */

module.exports = {
  apps: [{
    "name"       : "projects-dashboard",
    "watch"      : ["bin", "public", "routes", "utils", "views", "app.js"],
    "ignore_watch" : [],
    "merge_logs" : true,
    "script"     : "bin/www",
    "env"        : {
      "NODE_ENV"    : "development"
    },
    "error_file" : "logs/errors.log",
    "out_file"   : "logs/access.log",
    "pid_file"   : "logs/project.pid",
    "exec_mode"  : "fork"
  }]
};
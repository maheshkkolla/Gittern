var config = {
  git: {
    logs: {
      colSeparator: "##SPLIT@HERE##",
      newLineSeparator: "##SPLIT@NEW@LINE##",
      command: function(offset, limit) {
        return `git log --skip ` + offset + ` -n ` + limit +
        ` --pretty=format:'%H`+ this.colSeparator + `%an`+ this.colSeparator +
            `%s`+ this.colSeparator + `%ad` + this.newLineSeparator + `'`;
      },
      countCmd: "git rev-list --count HEAD"
    },
    urlCmd: "git config --get remote.origin.url",
    behindAndAheadCmd: "git rev-list --left-right --count origin/master...head",
    stashCmd: "git stash"
  },
  errors: {
    gitPull: "Error occurred during git pull",
    gitStash: "Error occurred during git stash"
},
  success: {
    gitPull: "Pull success"
  }
};

module.exports = config;
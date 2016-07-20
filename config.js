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
    urlCmd: "git config --get remote.origin.url"
  }
};

module.exports = config;
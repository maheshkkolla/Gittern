var config = {
  git: {
    logs: {
      colSeparator: "##SPLIT@HERE##",
      newLineSeparator: "##SPLIT@NEW@LINE##",
      command: function(offset, limit) {
        return `git log --skip ` + offset + ` -n ` + limit +
        ` --pretty=format:'%H`+ this.colSeparator + `%an`+ this.colSeparator +
            `%s`+ this.newLineSeparator + `'`;
      },
      countCmd: "git rev-list --count HEAD"
    }
  }
};

module.exports = config;
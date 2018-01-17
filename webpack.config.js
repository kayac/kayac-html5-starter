import { SRC } from './config'

module.exports = {
  entry: {
    script: `${SRC}/js/script.js`,
  },
  output: {
    filename: "[name].js"
  },
};

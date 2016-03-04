# gulp-stylelint-checkstyle-reporter

[![NPM version](http://img.shields.io/npm/v/gulp-stylelint-checkstyle-reporter.svg)](https://www.npmjs.org/package/gulp-stylelint-checkstyle-reporter)
[![Build Status](https://travis-ci.org/olegskl/gulp-stylelint-checkstyle-reporter.svg?branch=master)](https://travis-ci.org/olegskl/gulp-stylelint-checkstyle-reporter)
[![Join the chat at https://gitter.im/olegskl/gulp-stylelint](https://badges.gitter.im/olegskl/gulp-stylelint.svg)](https://gitter.im/olegskl/gulp-stylelint?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A [gulp-stylelint](https://github.com/olegskl/gulp-stylelint) reporter to display [stylelint](https://github.com/stylelint/stylelint) results in checkstyle.

## Installation

```bash
npm install gulp-stylelint-checkstyle-reporter --save-dev
```

## Quick start

```js
import gulpStylelint from 'gulp-stylelint';
import checkstyleReporter from 'gulp-stylelint-checkstyle-reporter';

gulp.task('lint-css', function lintCssTask() {
  return gulp
    .src('src/**/*.css')
    .pipe(gulpStylelint({
      reporters: [
        checkstyleReporter({output: 'reports/css-lint-checkstyle.xml'})
      ]
    }));
});
```

Note that if you're using ES5, you will have to access the library via the `default` property due to [the way exports are handled in Babel 6](https://phabricator.babeljs.io/T2212):

```js
var checkstyleReporter = require('gulp-stylelint-checkstyle-reporter').default;
```

## License

[MIT License](http://opensource.org/licenses/MIT)

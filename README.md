# gulp-stylelint-checkstyle-reporter

[![Build Status](https://travis-ci.org/olegskl/gulp-stylelint-checkstyle-reporter.svg?branch=master)](https://travis-ci.org/olegskl/gulp-stylelint-checkstyle-reporter)
[![Code Climate](https://codeclimate.com/github/olegskl/gulp-stylelint-checkstyle-reporter/badges/gpa.svg)](https://codeclimate.com/github/olegskl/gulp-stylelint-checkstyle-reporter)

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

## License

http://opensource.org/licenses/mit-license.html

/**
 * gulp-stylelint checkstyle reporter.
 * @module gulp-stylelint-checkstyle-reporter
 */

import fsp from 'fs-promise';
import path from 'path';
import mkdirp from 'mkdirp-promise';
import checkstyleFormatter from 'checkstyle-formatter';

/**
 * Adapts a Stylelint message to Checkstyle format.
 * @param  {Object} message Stylelint message.
 * @return {Object}         Checkstyle message.
 */
function stylelintToCheckstyleMessageAdapter(message) {
  return {
    line: message.line,
    column: message.column,
    severity: message.severity,
    message: message.text
  };
}

/**
 * Takes Stylelint messages and adapts them to Checkstyle format.
 * @param  {Array<Object>} messageList List of messages in Stylelint format.
 * @return {Array<Object>}             List of messages in Checkstyle format.
 */
function stylelintToCheckstyleMessageListAdapter(messageList) {
  return messageList.map(stylelintToCheckstyleMessageAdapter);
}

/**
 * Adapts a Stylelint processed file result to Checkstyle format.
 * @param  {Object} result Stylelint result.
 * @return {Object}        Checkstyle result.
 */
function stylelineToCheckstyleResultAdapter(result) {
  const filename = result.source || result.opts.from;
  const messages = result.warnings || result.messages;
  return {
    filename,
    messages: stylelintToCheckstyleMessageListAdapter(messages)
  };
}

/**
 * Takes Stylelint results (with messages) and adapts them to Checkstyle format.
 * @param  {Array<Object>} resultList List of results in Stylelint format.
 * @return {Array<Object>}            List of results in Checkstyle format.
 */
function stylelintToCheckstyleResultListAdapter(resultList) {
  return resultList
    .filter(result => (result.warnings || result.messages).length > 0)
    .map(stylelineToCheckstyleResultAdapter);
}

/**
 * Reporter initialization function.
 * @return {Function} Reporter function.
 */
export default function gulpStylelintCheckstyleReporterInit(options = {}) {
  const outputFile = path.resolve(process.cwd(), options.output || 'stylelint-checkstyle-report.xml');
  const outputDir = path.dirname(outputFile);

  /**
   * Writes the Checkstyle report to a file.
   * @param  {String}  xmlString Checkstyle report.
   * @return {Promise}           Resolved if file has been successfully written.
  */
  function outputWriter(xmlString) {
    return mkdirp(outputDir)
      .then(() => fsp.writeFile(outputFile, xmlString));
  }

  /**
   * Reports Stylelint results in Checkstyle format.
   * @param  {Array<Object>} resultList List of results in Stylelint format.
   * @return {Promise}                  Resolved when report has been written to file system.
   */
  return function gulpStylelintCheckstyleReporter(resultList) {
    return Promise.resolve(resultList)
      .then(stylelintToCheckstyleResultListAdapter)
      .then(checkstyleFormatter)
      .then(outputWriter);
  };
}

/**
 * @desc Returns the resulting json of a generic success
 * @param payload the payload of data that is being returned
 * @returns success result as a json with payload
 */
function generic_success(payload) {
  const result_json = {
    status: 200,
    data: payload
  };
  return result_json
}

/**
 * @desc Sets the results as a json, with either the payload if there is no
 * error, if there is, a generic failure is sent
 * @param err This is the variable that errors are passed into and determines
 * a success or a failure
 * @param payload data to be sent back provided there are no errors
 * @param res result object that has resulting json attached to it in the end
 */
function generic_error_handling(err, payload, res) {
  generic_success_wrapper = function () { return generic_success(payload); };
  result_json = generic_callback_error_handling(err, generic_success_wrapper)
  res.json(result_json);
}

/**
 * @desc Returns the resulting json of a generic fail
 * @returns Fail result as a json
 */
function generic_fail () {
  const result_json = {
    status: 500,
    message: err.message,
  };
  return result_json;
}

/**
 * @desc Returns the resulting json of a generic fail if there is an error, or
 * calls a callback_function with no arguments otherwise.
 * @returns the result as a json
 * @param err error that determines success or failure
 * @param callback_function function that is called if no error is found
 */
function generic_callback_error_handling (err, callback_function) {
  if (err) {
    result_json = generic_fail()
  } else {
    result_json = callback_function();
  }
  return result_json
}

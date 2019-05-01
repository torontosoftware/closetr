function return_success(payload) {
  const result_json = {
    status: 200,
    data: payload
  };
  return result_json
}

function return_failure(err) {
  const result_json = {
    status: 500,
    message: err.message
  };
  return result_json
}

function generic_error_conditional(err, payload, res) {
  if (err) {
    const result_json = return_failure(err);
    res.json(result_json);
  } else {
    const result_json = return_success(payload);
    res.json(result_json);
  }
}

var result_handling_module = {
  return_success: return_success,
  return_failure: return_failure
}

module.exports = result_handling_module

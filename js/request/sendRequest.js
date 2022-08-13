const sendRequest = async (url, method = 'GET', config = null) => {
<<<<<<< Updated upstream
    const request = await fetch (url, {
      method: method,
      ...config
    });
    let result = await request;
    if (method === "GET") {
      return result.json();
    } else {
      return result;
    } 
  };
  
=======
  const request = await fetch(url, {
    method: method,
    ...config
  });
  let result = await request;
  if (method === "GET") {
    return result.json();
  } else {
    return result;
  } 
}

>>>>>>> Stashed changes
export default sendRequest;
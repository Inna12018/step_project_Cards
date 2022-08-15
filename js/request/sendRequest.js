const sendRequest = async (url, method = 'GET', config = null) => {
// HEAD
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
  
export default sendRequest;


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

export default sendRequest;
>>>>>>> 086cf7fd4e51091ba20da5579b7134e229a14e88

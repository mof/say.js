const shouldReturnError = true;

class CustomError extends Error {
  constructor(message, data) {
    const { status } = data;
    const errorMessage = `Status: ${status}, message: ${message}`;
    super(errorMessage);
  }
}

export const getStockPrice = (url, token, stockSymbol) => {
  if (!url) {
    throw new CustomError("Route Not Found", { status: 404 });
  }
  if (!stockSymbol) {
    throw new CustomError("Bad Request", { status: 400 });
  }
  if (!token) {
    throw new CustomError("Forbidden", { status: 403 });
  }

  const result = { status: 200, data: { stockSymbol: "news", price: 123.23 } };
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (!shouldReturnError) {
        res(result);
      } else {
        rej(new Error("Status code: 500"));
      }
    }, 2000);
  });
};

(async () => {
    let result;
    try {
        result = await getStockPrice('url', 'token', 'stockSymbol');
    } catch (e) {
        console.log(e);
    }
    
    console.log(result);

})()

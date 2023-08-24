const pipe =
  (...fns) =>
  (x) => {
    const pipeFn = async (v, f) => {
      return f(await v);
    };
    return fns.reduce(pipeFn, Promise.resolve(x));
  };

export { pipe };

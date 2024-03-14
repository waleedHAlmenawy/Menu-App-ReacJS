const sleep = (delay = 1000) => new Promise(resolve => {
    setTimeout(() => {
        resolve();
    }, delay);
});

export default sleep;
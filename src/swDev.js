const swDev = () => {
    let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
    navigator.serviceWorker.register(swUrl).then(response => console.log(`This is a response: ${response}`));
}

export default swDev;
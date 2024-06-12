const processData = (data) => {
    const dataArray = JSON.parse(data);
    return dataArray.map(str => str.trim());
}


export default processData;
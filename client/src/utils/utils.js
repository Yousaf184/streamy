export const removeStreamById = (id, streamsObj) => {
    // convert id to string as key in filter method is a string
    // their types should be same for correct comparison of !==
    id = id.toString();

    const keys = Object.keys(streamsObj).filter(key => key !== id);
    const arr = keys.map(key => streamsObj[key]);

    streamsObj = arr.reduce((acc, curr) => {
        return {...acc, [curr.id]: curr};
    }, {});

    return streamsObj;
};

// example output of mapKeys function
/*
    {
        stream1-id: stream1Object,
        stream2-id: stream2Object
    }
*/
export const mapKeys = (arr, key) => {
    const result = arr.reduce((acc, curr) => {
      return {...acc, [curr[key]]: curr};
    }, {});

    return result;
};
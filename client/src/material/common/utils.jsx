export const getKeyFromUniqueId = (uniqueId = '#') => {
    const arr = uniqueId.split('/');
    return arr[arr.length - 1];
};
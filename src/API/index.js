export const getComments=()=>{
    return fetch('https://dummyjson.com/comments').then(res => res.json())
};
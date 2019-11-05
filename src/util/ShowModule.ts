export default function(code){
    return JSON.parse(localStorage.getItem('modules')).includes(code);
}
export default function(code){
    return JSON.parse(localStorage.getItem(`${location.hostname}_modules`)).includes(code);
}
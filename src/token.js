import jwtDecode from 'jwt-decode';
function validateToken(token) {
    const decoded = jwtDecode(token);
    const userId = decoded.id;
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        return {
            userId,
            auth:false
        };
    }
    return {
        userId,
        auth:true
    };
}
export function IsLogged(){
    const token = sessionStorage.getItem("token");
    if(!token){
        return {
            userId:0,
            auth:false
        }
    }
    const data = validateToken(token);
    const { userId, auth} = data;
    if (token && auth) {
        return {
            userId,
            auth:true,
            token
        }
    }
    return {
        userId,
        auth:false
    }
}
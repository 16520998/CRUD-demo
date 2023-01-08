const authHeader = () => {
    let user = JSON.parse(localStorage.getItem("userDetails"));
    if (user && user.token) {
            return {
                headers: { Authorization: `Bearer ${user.token}` }
            };
    } else {
        return {};
    }
}
export { authHeader };
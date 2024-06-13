export const passwordValidation = (password) => {
    //at least 8 char, 1 upper, 1 number, and 1 special
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
    
}
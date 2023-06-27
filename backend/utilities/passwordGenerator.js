const generatePassword = (length) => {
  const stringSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$&';
  let password = '';
  let i = 1;
  for (i; i <= length; i += 1) {
    const char = Math.floor(Math.random() * stringSet.length + 1);
    password += stringSet.charAt(char);
  }
  return password;
};

module.exports = { generatePassword };

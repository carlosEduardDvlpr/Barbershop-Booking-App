const verifyDataLogin = (
  name: string,
  email: string,
  pass1: string,
  pass2: string,
) => {
  const rexep_email = new RegExp(
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
  );

  if (name.length < 3) {
    return 'O nome deve ter no mínimo 3 caracteres!';
  }

  if (!rexep_email.test(email)) {
    return 'O email não é válido!';
  }

  if (pass1.length < 6) {
    return 'A senha deve ter no mínimo 6 caracteres!';
  }

  if (pass1 !== pass2) {
    return 'As senhas não conferem!';
  }

  return 'success';
};

export default verifyDataLogin;

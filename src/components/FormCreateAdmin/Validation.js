export default function Validation(form) {
  const errors = {};
  const regex = /.*\d.*/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!form.name) {
    errors.name = "Campo vacio";
  } else if (form.name.length < 4 || form.name.length > 30) {
    errors.name = "El nombre debe tener entre 4 y 30 caracteres";
  }
  if (regex.test(form.name)) {
    errors.name = "El nombre no puede contener numeros";
  }

  if (!form.email) {
    errors.email = "Campo Vacio";
  } else if (emailRegex.test(form.email)) {
    errors.email = "";
  } else {
    errors.email = "El mail es invalido";
  }

  if (!form.lastName) {
    errors.lastName = "Campo vacio";
  } else if (form.lastName.length < 4 || form.lastName.length > 30) {
    errors.lastName = "El nombre debe tener entre 4 y 30 caracteres";
  }

  if (!form.nickname) {
    errors.nickname = "Campo vacio";
  } else if (form.nickname.length < 4 || form.nickname.length > 30) {
    errors.nickname = "El nombre debe tener entre 4 y 30 caracteres";
  }

  const hasLetter = /[a-zA-Z]/.test(form.password);
  const hasNumber = /[0-9]/.test(form.password);

  if (!hasLetter || !hasNumber) {
    errors.password =
      "La contraseña debe contener al menos una letra y un número";
  }
  if (!form.password) {
    errors.password = "Campo vacio";
  } else if (form.password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres";
  }

  if (!form.passwordRepit) {
    errors.passwordRepit = "Campo vacio";
  } else if (form.passwordRepit !== form.password) {
    errors.passwordRepit = "Las contraseñas no coinciden";
  }

  const date = new Date(form.birthDate);
  if (isNaN(date.getTime())) {
    errors.birthDate = "Fecha inválida";
  }

  if (!form.address) {
    errors.address = "Campo vacio";
  }

  return errors;
}

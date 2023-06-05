export default function Validation(input, setErrors, errors, e) {
  let isValid = true;
  switch (e?.target.name) {
    case "name":
      const regex = /.*\d.*/;
      if (!input.name) setErrors({ ...errors, name: "Campo Vacio" });
      else {
        if (input.name.length < 4 || input.name.length > 30) {
          setErrors({
            ...errors,
            name: "El nombre debe tener entre 4 y 30 caracteres",
          });
          isValid = false;
        }
        if (regex.test(input.name)) {
          setErrors({ ...errors, name: "El nombre no puede contener numeros" });
          isValid = false;
        }
        if (isValid) {
          setErrors({ ...errors, name: "" });
        }
      }
      break;

    case "email":
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!input.email) setErrors({ ...errors, email: "Campo Vacio" });
      else {
        if (emailRegex.test(input.email)) {
          setErrors({ ...errors, email: "" });
        } else {
          setErrors({ ...errors, email: "El mail es invalido" });
        }
      }

      break;

    case "lastName":
      if (!input.lastName) setErrors({ ...errors, lastName: "Campo Vacio" });
      else {
        if (input.lastName.length < 4 || input.lastName.length > 30) {
          setErrors({
            ...errors,
            lastName: "El apellido debe tener entre 4 y 30 caracteres",
          });
          isValid = false;
        }
        if (isValid) {
          setErrors({ ...errors, lastName: "" });
        }
      }
      break;

    case "nickname":
      if (!input.nickname) setErrors({ ...errors, nickname: "Campo Vacio" });
      else {
        if (input.nickname.length < 4 || input.nickname.length > 30) {
          setErrors({
            ...errors,
            nickname: "El nombre de usuario debe tener entre 4 y 30 caracteres",
          });
          isValid = false;
        }
        if (isValid) {
          setErrors({ ...errors, nickname: "" });
        }
      }
      break;

    case "password":
      if (!input.password) setErrors({ ...errors, password: "Campo Vacio" });
      else {
        if (input.password.length < 8) {
          setErrors({
            ...errors,
            password: "La contraseña debe tener al menos 8 caracteres",
          });
          isValid = false;
        }
        const hasLetter = /[a-zA-Z]/.test(input.password);
        const hasNumber = /[0-9]/.test(input.password);
        if (!hasLetter || !hasNumber) {
          setErrors({
            ...errors,
            password:
              "La contraseña debe contener al menos una letra y un número",
          });
          isValid = false;
        }
        if (isValid) {
          setErrors({ ...errors, password: "" });
        }
      }
      break;
    case "passwordRepit":
      if (!input.passwordRepit)
        setErrors({ ...errors, passwordRepit: "Campo Vacio" });
      else {
        if (input.passwordRepit !== input.password) {
          setErrors({
            ...errors,
            passwordRepit: "las contraseñas no coinciden",
          });
          isValid = false;
        }
        if (isValid) {
          setErrors({ ...errors, passwordRepit: "" });
        }
      }
      break;

    case "birthDate":
      const date = new Date(input.birthDate);
      if (isNaN(date.getTime())) {
        setErrors({ ...errors, birthDate: "Fecha inválida" });
      } else {
        setErrors({ ...errors, birthDate: "" });
      }
      break;

    case "number":
      if (!input.number) setErrors({ ...errors, number: "Campo Vacio" });
      else {
        if (isNaN(input.number)) {
          setErrors({ ...errors, number: "Solo se puede ingrasar numeros" });
          isValid = false;
        }
        if (isValid) {
          setErrors({ ...errors, number: "" });
        }
      }
      break;

    case "street":
      if (!input.street) setErrors({ ...errors, street: "Campo Vacio" });
      else {
        if (isValid) {
          setErrors({ ...errors, street: "" });
        }
      }
      break;

    default:
      break;
  }
}

export default function Validation(form) {
  const errors = {};
  const regex = /.*\d.*/;

  if (!form.name) {
    errors.name = "Campo vacio";
  }

  // } else if (form.name.length < 4 || form.name.length > 30) {
  //   errors.name = "El nombre debe tener entre 4 y 30 caracteres";
  // }
  // if (regex.test(form.name)) {
  //   errors.name = "El nombre no puede contener numeros";
  // }
  if (!form.stock) {
    errors.stock = "Campo Vacio";
  }

  if (!form.description) {
    errors.description = "Campo vacio";
  }

  if (!form.price) {
    errors.price = "Campo vacio";
  } else if (form.price.length < 4 || form.price.length > 30) {
    errors.price = "El nombre debe tener entre 4 y 30 caracteres";
  }

  if (!form.status) {
    errors.status = "Campo vacio";
  }

  if (!form.salePrice) {
    errors.salePrice = "Campo vacio";
  }
  if (!form.isOnSale) {
    errors.isOnSale = "Campo vacio";
  }

  return errors;
}

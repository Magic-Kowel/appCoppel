import TextField from '@mui/material/TextField';

const NumberTextField = ({valor,actualizador,keyProp,objeto,label}) => {
  const handleKeyPress = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);

    // Permite solo números (0-9) y la tecla de retroceso (8)
    if (!/^[0-9\b]+$/.test(keyValue)) {
      event.preventDefault();
    }
  };

  return (
    <TextField
      label={label}
      value={valor}
      variant="outlined"
      onKeyPress={handleKeyPress}
      onChange={(e)=>{
        actualizador({
          ...objeto,
          [keyProp]:e.target.value
        })
      }}
      inputProps={{
        pattern: "[0-9]*", // Admite solo números en dispositivos móviles
        inputMode: "numeric", // Muestra el teclado numérico en dispositivos móviles
      }}
    />
  );
};

export default NumberTextField;
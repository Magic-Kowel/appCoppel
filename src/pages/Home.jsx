import { useState } from "react";
import Swal from 'sweetalert2'
import axios from 'axios';
import NavBar from "../components/NavBar";
import NumberTextField from "../components/NumberTextField";
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
function Home() {
    const [selectedPais, setSelectedPais] = useState(null);
    const [selectedEstado, setSelectedEstado] = useState(null);
    const [reclamo, setReclamo] = useState({
      empresa:"",
      nombre:"",
      correo:"",
      numeroCentro:"",
      numeroTelefonico:"",
      descripcion:"",
      fecha:""
    });
    const empresas =[
      {name:"Afore Coppel"},
      {name:"BanCoppel"},
      {name:"Coppel"}
    ]
    const direccion = [
        { pais: 'Argentina', estado: ['Buenos Aires'] },
        { pais: 'Estados Unidos', estado: ['California'] },
        { pais: 'Mexico', estado: ['Aguas calientes','Campeche', 'Cdmx'] },
    ];

    const handleFruitChange = (event, newValue) => {
        setSelectedPais(newValue);
        setSelectedEstado(null);
      };
    
    const handleColorChange = (event, newValue) => {
      setSelectedEstado(newValue);
    };

    const [isAnonimo, setIsAnonimo] = useState(true);
  
    const handleAnonimoChange = (event) => {
      setIsAnonimo(event.target.value === "true");
    };
    const handleSubmid = (e) =>{
      e.preventDefault();
      console.log(selectedPais);
      if(
          selectedPais == null ||
          selectedEstado == null||
          reclamo.numeroCentro.trim() == ""||
          reclamo.descripcion.trim() == "" ||
          reclamo.fecha.trim() == ""
        ){
        Swal.fire({
          icon: 'error',
          title: 'Rellene todos los datos',
        })
        return false;
      }
      if(
        isAnonimo==false &&(
          reclamo.nombre.trim() == ""||
          reclamo.correo.trim() == "" ||
          reclamo.numeroTelefonico.trim() == ""
        )
      ){
        Swal.fire({
          icon: 'error',
          title: 'Rellene todos los datos',
        });
        return false;
      }
      const postData = {
        empresa:reclamo.empresa,
        pais:selectedPais.pais,
        estado:selectedEstado,
        numeroCentro:reclamo.numeroCentro,
        nombreCompleto:reclamo.nombre,
        correo:reclamo.correo,
        telefono:reclamo.numeroTelefonico,
        descripcion:reclamo.descripcion,
        fecha:reclamo.fecha
      };
      axios.post('http://localhost:3000/api/denuncia', postData)
      .then(response => {
        console.log(response.data);
        Swal.fire(
          'Denuncia creada con exito',
          `clabe de segimiento: ${response.data.password}`,
          'success'
        )
      })
      .catch(error => {
        console.error(error);
      });
      
      // console.log(selectedPais.pais);
      // console.log(selectedEstado);
      // console.log(reclamo);
    }
    return (
      <>
        <NavBar />
        <Box sx={{ flexGrow: 1 }}>
            <form
              onSubmit={handleSubmid}
            >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Autocomplete
                        onChange={(event, value) => {
                          setReclamo({
                            ...reclamo,
                            empresa: value.name
                          });
                        }}
                        options={empresas}
                        getOptionLabel={(empresa) => empresa.name}
                        renderInput={(params) => (
                        <TextField {...params} label="Empresa" variant="outlined" />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Autocomplete
                        options={direccion}
                        value={selectedPais}
                        onChange={handleFruitChange}
                        getOptionLabel={(fruit) => fruit.pais}
                        renderInput={(params) => (
                        <TextField {...params} label="Pais" variant="outlined" />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <NumberTextField
                      valor={reclamo.numeroCentro}
                      actualizador={setReclamo}
                      objeto={reclamo}
                      keyProp="numeroCentro"
                      label="Número centro"
                    />
                  </Grid>
                {selectedPais && (
                    <Grid item xs={12}>
                        <Autocomplete
                        options={selectedPais.estado}
                        value={selectedEstado}
                        onChange={handleColorChange}
                        renderInput={(params) => (
                            <TextField {...params} label="Estado" variant="outlined" />
                        )}
                        />
                    </Grid>
                )}
                <Grid item xs={8}>
                  <FormControl>
                    <FormLabel>Anonimo</FormLabel>
                    <RadioGroup
                      value={isAnonimo.toString()}
                      onChange={handleAnonimoChange}
                    >
                      <FormControlLabel value="true" control={<Radio />} label="si" />
                      <FormControlLabel value="false" control={<Radio />} label="no" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                {!isAnonimo && (
                    <>
                        <Grid item xs={12}>
                            <TextField
                            value={reclamo.nombre}
                            onChange={(e)=>{
                              setReclamo({
                                ...reclamo,
                                nombre:e.target.value
                              })
                            }}
                            fullWidth 
                            label="Nombre Completo" 
                            variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                            fullWidth
                            value={reclamo.correo}
                            onChange={(e)=>{
                              setReclamo({
                                ...reclamo,
                                correo:e.target.value
                              })
                            }}
                            type="email" 
                            label="Correo" 
                            variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <NumberTextField
                              valor={reclamo.numeroTelefonico}
                              actualizador={setReclamo}
                              objeto={reclamo}
                              keyProp="numeroTelefonico"
                              label="Número telefonico"
                            />
                        </Grid>
                        
                    </>
                )}
                <Grid item xs={12}>
                  <TextField
                   value={reclamo.descripcion}
                   onChange={(e)=>{
                     setReclamo({
                       ...reclamo,
                       descripcion:e.target.value
                     })
                   }}
                    fullWidth 
                    label="Descripcion" 
                    variant="outlined"
                    multiline
                    maxRows={4}  
                  />
                </Grid>
                <Grid item xs={12}>
                  <input
                    value={reclamo.fecha}
                    onChange={(e)=>{
                      setReclamo({
                        ...reclamo,
                        fecha:e.target.value
                      })
                    }}
                    type="date"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    type="submit"
                    variant="contained">
                    Reclamar
                  </Button>
                </Grid>
            </Grid>
            </form>
        </Box>
      </>
    );
  }
  
  export default Home;
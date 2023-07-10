import { useState } from 'react';
import { useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Swal from 'sweetalert2'
import GoBackButton from '../components/GoBackButton';
import NavBar from "../components/NavBar";
function Capturar(){
    const { idDenuncia } = useParams();
    const [comentario,setComentario] = useState("");
    const handleSubmid = (e) =>{
        console.log(idDenuncia);
        e.preventDefault();
        if(comentario.trim() ==""){
            Swal.fire({
                icon: 'error',
                title: 'Rellene todos los datos',
            })
            return false;
        }
        axios.post('http://localhost:3000/api/comentar', {
            idDenuncia:idDenuncia,
            comentario:comentario
        })
        .then(response => {
            console.log(response.data);
            Swal.fire(
            'Comentario creada con exito',
            ``,
            'success'
            )
        })
        .catch(error => {
            console.error(error);
        });
    }
    return(

        <>
        <NavBar />
                <form
                    onSubmit={handleSubmid}
                >
                    <Typography
                            component='h1'
                            mt={2} 
                            sx={{
                                fontSize:'2rem',
                                fontWeight:'400',
                                textAlign:'center'
                            }}
                        >
                        Crear Comentario
                    </Typography>
                    <GoBackButton />
                    <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    value={comentario}
                                    onChange={(e)=>{
                                        setComentario(e.target.value)
                                    }}
                                    fullWidth
                                    multiline
                                    rows={4}
                                    label="Comentario" 
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    type="submit"
                                    variant="contained">
                                    Guardar
                                </Button>
                            </Grid>
                    </Grid>
                </form>
        </>
    )
}
export default Capturar;
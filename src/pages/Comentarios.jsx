import { useState } from "react";
import axios from 'axios';
import NavBar from "../components/NavBar";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
function Comentarios(){
    const [comentarios,setComentarios] = useState([]);
    const [comenttario,setComentario] = useState("");
    const handleSearchComentarios = () => {
        axios.get(`http://localhost:3000/api/comentarios/${comenttario}`)
        .then(response => {
          console.log(response.data);
          setComentarios(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
    return(
        <>
            <NavBar />
            <Typography
                    component='h1'
                    mt={2} 
                    sx={{
                        fontSize:'2rem',
                        fontWeight:'400',
                        textAlign:'center'
                    }}
                >
                Comentarios
            </Typography>
            <TextField
                value={comenttario}
                onChange={(e)=>{
                    setComentario(e.target.value);
                }}
                fullWidth
                label="Clave de la denuncia"
                variant="outlined" 
            />
            <Button 
                fullWidth 
                variant="contained"
                onClick={handleSearchComentarios}
            >
                Buscar comentarios
            </Button>
            {
                comentarios.map((comentario, index) => (
                    <Card key={index} sx={{ marginTop: 3, minWidth: 275 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} gutterBottom>
                            {comentario.descripcion}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
            }
            {comentarios.length === 0 && (
                <Card sx={{ marginTop: 3, minWidth: 275 }}>
                    <CardContent>
                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                        No hay comentarios
                    </Typography>
                    </CardContent>
                </Card>
            )}
            
        </>
    )
}
export default Comentarios;
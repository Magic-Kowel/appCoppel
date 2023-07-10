import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import NavBar from "../components/NavBar";

function Denuncia(){
    const [denuncias, setDenuncias] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:3000/api/denuncia')
        .then(response => {
          console.log(response.data);
          setDenuncias(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    },[])
    return(
        <>
        <NavBar />
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">Capturar Comenario</TableCell>
                    <TableCell align="right">Empresa</TableCell>
                    <TableCell align="right">Pais</TableCell>
                    <TableCell align="right">estado</TableCell>
                    <TableCell align="right">Numero Centro</TableCell>
                    <TableCell align="right">Nombre</TableCell>
                    <TableCell align="right">Correo</TableCell>
                    <TableCell align="right">Descripcion</TableCell>
                    <TableCell align="right">Fecha</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {denuncias.map((row) => (
                    <TableRow
                        key={row.idDenuncia}
                    >
                        <TableCell align="right">{row.idDenuncia}</TableCell>
                        <TableCell align="right">
                        <Link 
                            style={{ textDecoration: 'none', color: 'inherit' }}
                            to={`/capturar/${row.idDenuncia}`}
                        >
                            <Button size="small">
                                Comentar
                            </Button>
                        </Link>
                        </TableCell>
                        <TableCell align="right">{row.empresa}</TableCell>
                        <TableCell align="right">{row.pais}</TableCell>
                        <TableCell align="right">{row.estado}</TableCell>
                        <TableCell align="right">{row.numeroCentro}</TableCell>
                        <TableCell align="right">{row.nombreCompleto}</TableCell>
                        <TableCell align="right">{row.correo}</TableCell>
                        <TableCell align="right">{row.descripcion}</TableCell>
                        <TableCell align="right">{row.fecha}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </>
    )
}
export default Denuncia;
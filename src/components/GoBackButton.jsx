import { useNavigate } from "react-router-dom";import { 
    IconButton,
    Tooltip
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
function GoBackButton(){
    const navigate  = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    };
    return(
        <Tooltip title="Regresar">
            <IconButton onClick={handleGoBack}>
                    <ArrowBackIcon />
            </IconButton>
        </Tooltip>
    )
}
export default GoBackButton;
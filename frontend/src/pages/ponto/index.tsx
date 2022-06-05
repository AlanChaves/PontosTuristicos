import { ErrorMessage } from "@hookform/error-message";
import { LocalActivity } from "@mui/icons-material";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
    Slide,
    Backdrop,
    CircularProgress,
    Snackbar,
    Alert,
} from "@mui/material";
import { green } from "@mui/material/colors";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ICity from "../../interfaces/city";
import IState from "../../interfaces/state";
import api from "../../services/api";
import apiCidades from "../../services/api-cidades";

const NewPontoPage: React.FC = () => {
    const Navigation = useNavigate();

    const [animationState, setAnimationState] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);

    const [states, setStates] = React.useState<IState[]>([]);
    const [cities, setCities] = React.useState<ICity[]>([]);

    const { register, watch, handleSubmit, formState: { errors }, } = useForm<{
        name: string;
        description: string;
        reference: string;
        state: string;
        city: string;
    }>();

    const watchState = watch("state");

    React.useEffect(() => {
        setAnimationState(true);
        getStates();
        return () => setAnimationState(false);
    }, []);

    const getStates = async () => {
        setLoading(true);
        try {
            const url = `/estados?orderBy=nome`;
            const response = await apiCidades.get(url);
            setStates(response.data);
        } finally {
            setLoading(false);
        }
    }

    const getCities = async (stateId: number) => {
        setLoading(true);
        try {
            const url = `/estados/${stateId}/municipios`;
            const response = await apiCidades.get(url);
            setCities(response.data);
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        if (watchState && watchState !== null && watchState !== "" && states.length > 0) {
            let cityId = 0;
            states.map((item) => {
                if (item.sigla === watchState) {
                    cityId = item.id;
                }
            });
            if (cityId > 0) {
                getCities(cityId);
            }
        }
    }, [watchState]);

    const Submit = async (data: any) => {
        setLoading(true);
        setError(false);
        setSuccess(false);
        try {
            const response = await api.post('/ponto', data);
            console.log(response);
            setSuccess(true);
        } catch (e) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Box
                sx={{
                    width: "95%",
                    margin: "0 auto",
                    height: "100vh",
                    mt: { xs: 5, sm: 5 },
                }}
            >
                <Slide direction="up" in={animationState} mountOnEnter unmountOnExit>
                    <Box
                        component={Paper}
                        py={5}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            flexBasis: 1,
                            alignItems: "center",
                            width: "80%",
                            margin: "0 auto",
                        }}
                    >
                        <Box
                            py={2}
                            sx={{ display: "flex", flexDirection: "column" }}
                            alignItems={"center"}
                            justifyContent={"center"}
                        >
                            <LocalActivity sx={{ fontSize: "3.5em", color: green[500] }} />
                            <Typography variant="h5">Cadastro de Ponto Tusrístico</Typography>
                        </Box>
                        <Stack
                            component={"form"}
                            noValidate
                            direction={"column"}
                            spacing={2}
                            sx={{ width: "80%" }}
                            onSubmit={handleSubmit(Submit)}
                        >
                            <Stack
                                direction={"column"}
                                spacing={0}
                            >
                                <TextField
                                    type="text"
                                    label="Nome"
                                    {...register("name", { required: "Nome obrigatório" })}
                                    fullWidth
                                    inputProps={{
                                        maxLength: 100,
                                    }}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="name"
                                    render={({ message }) => <p style={{ color: "red" }}>{message}</p>}
                                />
                            </Stack>

                            <Stack direction={"row"} spacing={2}>
                                <Stack
                                    direction={"column"}
                                    spacing={0}
                                    sx={{ width: "100%" }}
                                >
                                    <FormControl fullWidth>
                                        <InputLabel id="uf-select-label">
                                            Estado
                                        </InputLabel>
                                        <Select
                                            labelId="uf-select-label"
                                            id="uf-select"
                                            label="Estado"
                                            {...register("state", { required: "Estado obrigatório" })}
                                        >
                                            {states.map((item) => (<MenuItem value={item.sigla}>{item.nome}</MenuItem>))}
                                        </Select>
                                    </FormControl>
                                    <ErrorMessage
                                        errors={errors}
                                        name="state"
                                        render={({ message }) => <p style={{ color: "red" }}>{message}</p>}
                                    />
                                </Stack>
                                <Stack
                                    direction={"column"}
                                    spacing={0}
                                    sx={{ width: "100%" }}
                                >
                                    <FormControl fullWidth>
                                        <InputLabel id="cidade-select-label">
                                            Cidade
                                        </InputLabel>
                                        <Select
                                            labelId="cidade-select-label"
                                            id="cidade-select"
                                            label="Cidade"
                                            {...register("city", { required: "Cidade obrigatória" })}
                                        >
                                            {cities.map((item) => (<MenuItem value={item.nome}>{item.nome}</MenuItem>))}
                                        </Select>
                                    </FormControl>
                                    <ErrorMessage
                                        errors={errors}
                                        name="city"
                                        render={({ message }) => <p style={{ color: "red" }}>{message}</p>}
                                    />
                                </Stack>
                            </Stack>
                            <Stack
                                direction={"column"}
                                spacing={0}
                            >
                                <TextField
                                    type="text"
                                    label="Referência"
                                    fullWidth
                                    {...register("reference", { required: "Referência obrigatória" })}
                                    inputProps={{
                                        maxLength: 100,
                                    }}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="reference"
                                    render={({ message }) => <p style={{ color: "red" }}>{message}</p>}
                                />
                            </Stack>
                            <Stack
                                direction={"column"}
                                spacing={0}
                            >
                                <TextField
                                    type="text"
                                    fullWidth
                                    label={"Descrição"}
                                    {...register("description", { required: "Descrição obrigatória" })}
                                    inputProps={{
                                        maxLength: 100,
                                    }}
                                    multiline
                                    rows={3}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="description"
                                    render={({ message }) => <p style={{ color: "red" }}>{message}</p>}
                                />
                            </Stack>
                            <Stack
                                direction={"row"}
                                spacing={3}
                                sx={{ width: "100%" }}
                            >
                                <Button
                                    color="primary"
                                    type="button"
                                    variant="contained"
                                    fullWidth
                                    onClick={() => Navigation("/")}
                                >
                                    Voltar
                                </Button>
                                <Button
                                    color="primary"
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                >
                                    Salvar
                                </Button>
                            </Stack>

                        </Stack>
                    </Box>
                </Slide>
            </Box>
            <Backdrop
                sx={{
                    bgColor: "#3333",
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                open={success || false}
                autoHideDuration={3000}
                onClose={() => Navigation("/")}>
                <Alert severity="success" sx={{ width: "100%" }}>
                    Ponto cadastrado com sucesso!
                </Alert>
            </Snackbar>
            <Snackbar open={error || false} autoHideDuration={6000}>
                <Alert severity="error" sx={{ width: "100%" }}>
                    Erro ao tentar cadastrar o ponto
                </Alert>
            </Snackbar>
        </>
    );
};

export default NewPontoPage;

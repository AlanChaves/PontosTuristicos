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
import IPonto from "../../interfaces/ponto";
import { api } from "../../services/api";
import apiCidades from "../../services/api-cidades";

const EditPontoPage: React.FC = () => {
    const { id } = useParams();
    const Navigation = useNavigate();

    const [animationState, setAnimationState] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);

    const [states, setStates] = React.useState<IState[]>([]);
    const [cities, setCities] = React.useState<ICity[]>([]);

    const [ponto, setPonto] = React.useState<IPonto>({
        Id: 0,
        Name: "",
        Description: "",
        State: "",
        City: "",
        Reference: "",
        InsertedAt: new Date(),
    });

    const { register, watch, handleSubmit, formState: { errors }, setValue } = useForm<IPonto>({
        defaultValues: {
            Id: Number(id),
        }
    });

    const watchState = watch("State");
    const watchCity = watch("City");

    const getPonto = async () => {
        setLoading(true);
        try {
            const url = `/pontos/${id}`;
            const response = await api.get(url);
            const pkg = response.data;
            setPonto(pkg);
        } finally {
            setLoading(false);
            getStates();
        }
    }

    React.useEffect(() => {
        setAnimationState(true);
        getPonto();
        return () => setAnimationState(false);
    }, []);

    React.useEffect(() => {
        setValue("Name", ponto.Name);
        setValue("Description", ponto.Description);
        setValue("Reference", ponto.Reference);
        setValue("State", ponto.State);
        setValue("City", ponto.City);
        setValue("InsertedAt", ponto.InsertedAt);
    }, [ponto]);

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
                if (watchState !== ponto.State) {
                    setValue("City", "");
                }
                getCities(cityId);
            }
        }
    }, [states, watchState]);

    const Submit = async (data: any) => {
        setLoading(true);
        setError(false);
        setSuccess(false);
        try {
            const response = await api.post(`/pontos/${id}`, data);
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
                            <Typography variant="h5">Cadastro de Ponto Tusr??stico</Typography>
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
                                    {...register("Name", { required: "Nome obrigat??rio" })}
                                    fullWidth
                                    inputProps={{
                                        maxLength: 100,
                                    }}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="Name"
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
                                            {...register("State", { required: "Estado obrigat??rio" })}
                                            value={watchState}
                                        >
                                            {states.map((item) => (
                                                <MenuItem
                                                    value={item.sigla}>
                                                    {item.nome}
                                                </MenuItem>))}
                                        </Select>
                                    </FormControl>
                                    <ErrorMessage
                                        errors={errors}
                                        name="State"
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
                                            {...register("City", { required: "Cidade obrigat??ria" })}
                                            value={watchCity}
                                        >
                                            {cities.map((item) => (
                                                <MenuItem
                                                    value={item.nome}>
                                                    {item.nome}
                                                </MenuItem>))}
                                        </Select>
                                    </FormControl>
                                    <ErrorMessage
                                        errors={errors}
                                        name="City"
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
                                    label="Refer??ncia"
                                    fullWidth
                                    {...register("Reference", { required: "Refer??ncia obrigat??ria" })}
                                    inputProps={{
                                        maxLength: 100,
                                    }}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="Reference"
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
                                    label={"Descri????o"}
                                    {...register("Description", { required: "Descri????o obrigat??ria" })}
                                    inputProps={{
                                        maxLength: 100,
                                    }}
                                    multiline
                                    rows={3}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="Description"
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

export default EditPontoPage;

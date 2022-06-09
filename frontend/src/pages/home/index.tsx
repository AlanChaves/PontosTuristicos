import { LocalActivity } from "@mui/icons-material";
import {
    Box,
    Button,
    Paper,
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
import { useQuery } from 'react-query'
import { api } from "../../services/api";
import IPonto from "../../interfaces/ponto";

const HomePage: React.FC = () => {
    const [animationState, setAnimationState] = React.useState(false);
    const Navigation = useNavigate();
    const { register, watch, handleSubmit, setValue } = useForm<{
        search: string;
        page: number;
        total: number;
        count: number;
    }>({
        defaultValues: {
            search: "",
            page: 0,
            total: 3,
            count: 0,
        }
    });

    const watchSearch = watch("search");
    const watchPage = watch("page");
    const watchTotal = watch("total");
    const watchCount = watch("count");

    const getPontos = async () => {
        let url = `/pontos?PageNumber=${watchPage}&PageSize=${watchTotal}`;

        if (watchSearch !== "") {
            url += `&Search=${watchSearch}`;
        }
        //const url = `/pontos?PageNumber=${watchPage}&PageSize=${watchTotal}`;
        const response = await api.get(url);
        const pkg = response.data;
        console.log(pkg);
        setValue("count", pkg.Count);
        return pkg.Data;
    }

    const { data, isLoading, isError, refetch } = useQuery("pontos", getPontos);

    React.useEffect(() => {
        setAnimationState(true);
        return () => setAnimationState(false);
    }, []);

    React.useEffect(() => {
        refetch();
    }, [watchPage]);

    const Submit = (data: any) => {
        setValue("search", data.search);

        if (watchPage === 0) {
            refetch();
        } else {
            setValue("page", 0);
        }
    };

    const getData = () => {
        if (watchCount === undefined || watchCount <= 0) {
            return (<Typography variant="h5">{"Nenhum registro encontrado :("}</Typography>);
        }
        return (<Box sx={{ width: "100%", margin: "0 auto" }}>
            {data.map((item: IPonto) => (<Stack
                direction={"column"}
                sx={{ width: "100%" }}
            >
                <Typography variant="h5">{item.Name}</Typography>
                <Typography>{item.Description}</Typography>
                <Typography>{`${item.City} / ${item.State}`}</Typography>
                {/*<Typography>{item.reference}</Typography>*/}
                <Stack
                    direction={"row"}
                    spacing={3}
                    sx={{ width: "100%" }}
                >
                    <Button
                        color="primary"
                        type="button"
                        variant="contained"
                        onClick={() => Navigation(`/ponto/${item.Id}`)}
                    >
                        Ver Detalhes
                    </Button>
                </Stack>
                <Box sx={{ height: "10px" }} />
            </Stack>))}
            <Stack
                direction={"row"}
                spacing={3}
                sx={{ width: "100%" }}
            >
                <Button
                    color="primary"
                    type="button"
                    variant="text"
                    onClick={() => {
                        if (watchPage > 0) {
                            setValue("page", watchPage - 1);
                        }
                    }}
                >
                    Anterior
                </Button>
                <Button
                    color="primary"
                    type="button"
                    variant="text"
                    onClick={() => {
                        const totalPage = Math.ceil(watchCount / watchTotal);
                        if (watchPage < (totalPage - 1)) {
                            setValue("page", watchPage + 1);
                        }
                    }}
                >
                    Próximo
                </Button>
                <Typography variant="h6">{`Pág. ${watchPage + 1} de ${(Math.ceil(watchCount / watchTotal)).toFixed(0)} / Total de itens ${watchCount}`}</Typography>
            </Stack>
        </Box>)
    }

    return (
        <>
            <Box
                sx={{
                    width: "95%",
                    margin: "0 auto",
                    height: "90vh",
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
                            <Typography variant="h5">Pontos Turísticos</Typography>
                        </Box>
                        <Stack
                            component={"form"}
                            noValidate
                            direction={"column"}
                            spacing={5}
                            sx={{ width: "80%" }}
                            onSubmit={handleSubmit(Submit)}
                        >
                            <Stack direction={"row"} spacing={2}>
                                <TextField
                                    type="text"
                                    label="Digite um termo para buscar um ponto turístico..."
                                    {...register("search")}
                                    fullWidth
                                    inputProps={{
                                        maxLength: 100,
                                    }}
                                />
                                <Button
                                    color="primary"
                                    type="submit"
                                    variant="contained"
                                >
                                    Buscar
                                </Button>
                            </Stack>
                            <Button
                                color="primary"
                                type="button"
                                variant="contained"
                                fullWidth
                                onClick={() => Navigation("/ponto")}
                            >
                                Cadastrar um ponto turístico
                            </Button>

                            {getData()}
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
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar open={isError || false} autoHideDuration={6000}>
                <Alert severity="error" sx={{ width: "100%" }}>
                    Erro ao tentar buscar pontos
                </Alert>
            </Snackbar>
        </>
    );
};

export default HomePage;

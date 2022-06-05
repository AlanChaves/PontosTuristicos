import { createTheme } from "@mui/material";
import { green, grey, amber, lightGreen } from "@mui/material/colors";
export default createTheme({
    palette: {
        primary: {
            //main: "#25d366",
            main: "#689F38",
        },
        secondary: {
            //main: "#335567",
            main: "#558B2F",
        },
        text: {
            primary: "#1a1a1a",
            secondary: "#252525",
        },
        background: {
            paper: "#fafafa",
        },
    },
    typography: {
        fontFamily: "Montserrat",
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    borderColor: green[500],
                    "input:valid + fieldset": {
                        borderColor: green[600],
                    },
                    "&:hover": {
                        backgroundColor: "transparent",
                    },
                    "&.Mui-focused": {
                        backgroundColor: "transparent",
                        borderColor: green[500],
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: "none",
                    color: "252525",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                containedPrimary: {
                    color: "white",
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: `#689F38`,
                    color: "#f1f1f1",
                    border: "none",
                },
            },
        },
    },
});

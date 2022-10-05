import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Modal from "@mui/material/Modal";
import * as React from "react";
import AddIcon from "@mui/icons-material/Add";

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AddExpenseModal(){

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //form
    const [name, setName] = React.useState("");
    const [amount, setAmount] = React.useState("");
    const [spendDate, setDate] = React.useState("");
    const [category, setCategory] = React.useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        let newItem = {
            name: name,
            amount: amount,
            spend_date: spendDate,
            category: category
        }

        try {
            fetch('http://localhost:8000/api/expense', {
                method: 'POST',
                body: JSON.stringify(newItem),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

        } catch (err) {
            console.log(err);
        }
    }

    return(

        <div>
            <Button onClick={handleOpen} className='btn-margin-bottom' variant="contained" startIcon={<AddIcon />}>
                Add
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title">

                <Box sx={style}>
                    <Typography id="modal-title" variant="h6" component="h2">
                        Add Expense
                    </Typography>

                    <Stack spacing={3}>

                        <Divider />

                        <TextField
                            className="width100"
                            id="name"
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                        <TextField
                            className="width100"
                            id="amount"
                            label="Amount"
                            variant="outlined"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}/>
                        <TextField
                            style={{width:"100%"}}
                            id="date"
                            label="Date"
                            type="date"
                            sx={{ width: 220 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={spendDate}
                            onChange={(e) => setDate(e.target.value)}/>
                        <FormControl fullWidth>
                            <InputLabel id="select">Category</InputLabel>
                            <Select
                                labelId="select"
                                id="category"
                                value={category}
                                label="Category"
                                onChange={(e) => setCategory(e.target.value)}>

                                <MenuItem value={'Food'}>Food</MenuItem>
                                <MenuItem value={'Entertainment'}>Entertainment</MenuItem>
                                <MenuItem value={'Travelling'}>Travelling</MenuItem>
                            </Select>
                        </FormControl>

                        <Divider />

                        <Grid container>
                            <Grid item xs={4}>

                            </Grid>
                            <Grid item xs={8}>
                                <Stack direction="row" spacing={2}>
                                    <Button onClick={handleSubmit} color="error" variant="contained" startIcon={<SaveIcon />}>
                                        Save
                                    </Button>

                                    <Button onClick={handleClose} variant="contained" endIcon={<ExitToAppIcon />}>
                                        Close
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>

                    </Stack>
                </Box>
            </Modal>
        </div>
    )
}
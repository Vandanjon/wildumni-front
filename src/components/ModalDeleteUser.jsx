import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";

const ModalDeleteUser = (open, handleClose, user) => {
    const deleteUser = (user) => {
        axios
            .delete(`${import.meta.env.VITE_BACKEND_URL}/users/${user.id}`)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        const updatedUsers = users.filter(
            (deletedUser) => deletedUser.id !== user.id
        );
        setUsers(updatedUsers);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{modalTitle}</DialogTitle>
            <DialogContent>"toto"</DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Cancel
                </Button>
                <Button onClick={() => submitForm(modalFormDatas, user.id)}>
                    Validate
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalDeleteUser;

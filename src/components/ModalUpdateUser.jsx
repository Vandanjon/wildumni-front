import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";

const ModalUpdateUser = (
    handleChangeFormDatas,
    modalFormDatas,
    handleClose,
    modalTitle
) => {
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{modalTitle}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Firstname"
                        variant="outlined"
                        id="firstName"
                        type="text"
                        name="firstName"
                        value={modalFormDatas.firstName}
                        onChange={handleChangeFormDatas}
                    />
                    <TextField
                        label="Lastname"
                        variant="outlined"
                        id="lastName"
                        type="text"
                        name="lastName"
                        value={modalFormDatas.lastName}
                        onChange={handleChangeFormDatas}
                    />
                    <TextField
                        label="Username"
                        variant="outlined"
                        id="userName"
                        type="text"
                        name="userName"
                        value={modalFormDatas.userName}
                        onChange={handleChangeFormDatas}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        id="email"
                        type="text"
                        name="email"
                        value={modalFormDatas.email}
                        onChange={handleChangeFormDatas}
                    />

                    <TextField
                        label="Password"
                        variant="outlined"
                        id="password"
                        type="text"
                        name="password"
                        value={modalFormDatas.password}
                        onChange={handleChangeFormDatas}
                    />

                    <TextField
                        label="
                            Address - Country"
                        variant="outlined"
                        id="country"
                        type="text"
                        name="country"
                        value={modalFormDatas.address?.country}
                        onChange={handleChangeFormDatas}
                    />
                    <TextField
                        label="
                            Address - Region"
                        variant="outlined"
                        id="region"
                        type="text"
                        name="region"
                        value={modalFormDatas.address?.region}
                        onChange={handleChangeFormDatas}
                    />
                    <TextField
                        label="
                            Address - City"
                        variant="outlined"
                        id="city"
                        type="text"
                        name="city"
                        value={modalFormDatas.address?.city}
                        onChange={handleChangeFormDatas}
                    />
                    <TextField
                        label="
                            Address - Postcode"
                        variant="outlined"
                        id="postcode"
                        type="text"
                        name="postcode"
                        value={modalFormDatas.address?.postcode}
                        onChange={handleChangeFormDatas}
                    />
                    <TextField
                        label="
                            Address - Street"
                        variant="outlined"
                        id="street"
                        type="text"
                        name="street"
                        value={modalFormDatas.address?.street}
                        onChange={handleChangeFormDatas}
                    />
                    <TextField
                        label="
                            Address - Latitude"
                        variant="outlined"
                        id="latitude"
                        type="text"
                        name="latitude"
                        value={modalFormDatas.address?.latitude}
                        onChange={handleChangeFormDatas}
                    />
                    <TextField
                        label="
                            Address - Longitude"
                        variant="outlined"
                        id="longitude"
                        type="text"
                        name="longitude"
                        value={modalFormDatas.address?.longitude}
                        onChange={handleChangeFormDatas}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                    <Button onClick={() => submitForm(modalFormDatas, user.id)}>
                        Validate
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ModalUpdateUser;

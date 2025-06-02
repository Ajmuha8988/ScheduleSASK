import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import "./mobileheaders.css"
import { TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import 'react-phone-input-2/lib/material.css';
import { RoomService } from '../../utils/db/post/CreateRoom';
import * as React from 'react';

const theme = createTheme({
    palette: {
        customColor: {
            main: '#ffc107', // Замените на нужный вам цвет
        },
    },
});

const AddRoomButton = () => {
    const [errorRoom, SetErrorRoom] = useState<string | null>(null);
    const [Success, SetSuccess] = useState<string | null>(null);
    const [Room, setRoom] = useState('');
    const { addRoom } = RoomService();
    const [showAddRoom, SetAddRoom] = useState(false);
    const CreateRoom = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const successfullRoom = await addRoom({
                NameRoom: Room
            });
            if (location.pathname === '/administrator') {
                SetErrorRoom(null);
                SetSuccess(successfullRoom);
            } else {
                setTimeout(() => window.location.reload(), 1000);
                SetErrorRoom(null);
                SetSuccess(successfullRoom);
            }
        } catch (error) {
            SetErrorRoom(error.message);
            SetSuccess(null);
        }
    };
    return (
        <>
            <li><button className="dropdown-item text-light" onClick={() => SetAddRoom(true)}>Кабинет</button></li>
            <Modal className="font-for-headers" show={showAddRoom} onHide={() => SetAddRoom(false)}>
                <Modal.Header className="bg-dark text-light" closeVariant="white" closeButton>
                    <Modal.Title >Создание кабинета</Modal.Title>
                </Modal.Header>
                <form onSubmit={CreateRoom} method="POST">
                    <Modal.Body className="modal-body">
                        <ThemeProvider theme={theme}>
                            <div className="mb-3">
                                <TextField
                                    InputProps={{

                                        style: {
                                            fontFamily: 'Vollda',
                                        },
                                    }}
                                    InputLabelProps={{

                                        style: {
                                            fontFamily: 'Vollda',
                                            color: '#616161',
                                        },
                                    }}
                                    color='customColor' // Используем созданный нами цвет
                                    label="Кабинет"
                                    id="Room" value={Room} onChange={(e) => setRoom(e.target.value)}
                                    variant="outlined"
                                    className='form-control'
                                    size='small'
                                    required
                                />
                                {errorRoom && <p style={{ color: 'red' }}>{errorRoom}</p>}
                                {Success && <p style={{ color: '#ffc107' }}>{Success}</p>}
                            </div>
                        </ThemeProvider>
                    </Modal.Body>
                    <Modal.Footer className="modal-footer bg-dark">
                        <button type="button" className="btn btn-light text-dark" onClick={() => SetAddRoom(false)}>Закрыть</button>
                        <button type="submit" className="btn btn-warning text-light">Создать</button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
};

export default AddRoomButton;
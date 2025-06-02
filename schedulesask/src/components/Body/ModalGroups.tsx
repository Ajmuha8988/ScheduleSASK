import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import "./mobilebody.css"
import { TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import 'react-phone-input-2/lib/material.css';
import { GroupService } from '../../utils/db/post/CreateGroup';
import * as React from 'react';

const theme = createTheme({
    palette: {
        customColor: {
            main: '#ffc107', // Замените на нужный вам цвет
        },
    },
});

const AddGroupButton = () => {
    const [errorGroup, SetErrorGroup] = useState<string | null>(null);
    const [Group, setGroup] = useState<string | null>();
    const { addGroup } = GroupService();
    const [showAddGroup, setAddGroup] = useState(false);
    const CreateGroup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await addGroup({
                NameGroup: Group
            });
        } catch (error) {
            SetErrorGroup(error.message);
        }
    };
    return (
        <header>
            <button className="btn btn-dark text-light mobile-button ms-2" onClick={() => setAddGroup(true)}>
                Создать группу
            </button>
            <Modal className="font-for-headers" show={showAddGroup} onHide={() => setAddGroup(false)}>
                <Modal.Header className="bg-dark text-light" closeVariant="white" closeButton>
                    <Modal.Title >Создание группы</Modal.Title>
                </Modal.Header>
                <form onSubmit={CreateGroup} method="POST" action="/register">
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
                                    label="Группа"
                                    id="Group" value={Group} onChange={(e) => setGroup(e.target.value)}
                                    variant="outlined"
                                    className='form-control'
                                    size='small'
                                    required
                                />
                                {errorGroup && <p style={{ color: 'red' }}>{errorGroup}</p>}
                            </div>
                        </ThemeProvider>
                    </Modal.Body>
                    <Modal.Footer className="modal-footer bg-dark">
                        <button type="button" className="btn btn-light text-dark" onClick={() => setAddGroup(false)}>Закрыть</button>
                        <button type="submit" className="btn btn-warning text-light" >Создать</button>
                    </Modal.Footer>
                </form>
            </Modal>
        </header>

    );
};

export default AddGroupButton;
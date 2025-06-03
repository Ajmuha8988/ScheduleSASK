interface GeneralSubBurden {
    ID_TeacherPlan: bigint;
    NumeratorPlan: number;
    DenominatorPlan: number;
}

export const GeneralSubBurdenService = () => {
    const addGeneralSubBurden = async (generalSubBurden: GeneralSubBurden) => {
            try {
                const response = await fetch('http://localhost:8080/administrator/addSubGeneralBurden', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(generalSubBurden)
                });

                const data = await response.json();
                if (data.firstmessage === 'Количество пар в числителе не должны быть ниже 1!' &&
                    data.secondmessage === '') {
                    throw {
                        firstmessage: 'Количество пар в числителе не должны быть ниже 1!',
                        secondmessage: ''
                    }
                } else if (data.secondmessage === 'Количество пар в знаменателе не должны быть ниже 1!' &&
                    data.firstmessage === '') {
                    throw {
                        firstmessage: '',
                        secondmessage: 'Количество пар в знаменателе не должны быть ниже 1!'
                    }
                } else if (data.firstmessage === 'Количество пар в числителе не должны быть ниже 1!'
                    && data.secondmessage === 'Количество пар в знаменателе не должны быть ниже 1!') {
                    throw {
                        firstmessage: 'Количество пар в числителе не должны быть ниже 1!',
                        secondmessage: 'Количество пар в знаменателе не должны быть ниже 1!'
                    }
                } else if (data.secondmessage === 'У преподавателя уже распределены пары') {
                    throw {
                        firstmessage: '',
                        secondmessage: 'У преподавателя уже распределены пары!'
                    }
                } else if (data.secondmessage === 'Введённые данные превышают количество пар в неделю!') {
                    throw {
                        firstmessage: '',
                        secondmessage: 'Введённые данные превышают количество пар в неделю!'
                    }
                }
                else if (data.secondmessage === 'Пожалуйста, восполните все пары!') {
                    throw {
                        firstmessage: '',
                        secondmessage: 'Пожалуйста, восполните все пары!'
                    }
                }
                else if (data.successmessage === 'Учебная нагрузка успешно установленно!') {
                    return 'Готово!';
                }
            } catch (error) {
                if (error instanceof Error) {
                    throw new Error(JSON.stringify({
                        errormessage1: error.firstmessage,
                        errormessage2: error.secondmessage,
                    }));
                }
                else {
                    console.log(String(error));
                }
            }
    };
    return { addGeneralSubBurden };
};

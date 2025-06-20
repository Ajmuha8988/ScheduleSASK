const ScheduleFooter = () => {
    return (
        <footer className='bg-dark font-for-headers mt-5'>
            <div className='container mobile-fio-disabled'>
                <div className='row'>
                    <a className="navbar-brand flex-01" href='https://sask64.ru/'>
                        <img width='176' height='99' src='/LSASK.png' alt="САСК" />
                    </a>
                    <h5 style={{ marginTop: '41px' }} className='flex-59 text-light'>© 2025 Учебное расписание образовательной организаций ГАПОУ СО "САСК"</h5>
                    <a className="navbar-brand flex-01" style={{ marginTop: '20px' }} href='https://vk.com/club_sask_official'>
                        <img width='50' height='50' src='/vk.svg' alt="САСК (ВКонтакте)" />
                    </a>
                    <a className="navbar-brand flex-01" style={{ marginTop: '27px' }} href='https://t.me/StudSovetSASK'>
                        <img width='35' height='35' src='/telegram.svg' alt="САСК (Телеграмм)" />
                    </a>
                </div>
            </div>
            <div className='container mobile-fio'>
                <div className='row'>
                    <a className="navbar-brand col-12" href='https://sask64.ru/'>
                        <img width='176' height='99' src='/LSASK.png' alt="САСК" />
                    </a>
                    <h5  className='col-12 text-light'>© 2025 Учебное расписание образовательной организаций ГАПОУ СО "САСК"</h5>
                    <a className="navbar-brand col-12"  href='https://vk.com/club_sask_official'>
                        <img width='50' height='50' src='/vk.svg' alt="САСК (ВКонтакте)" />
                    </a>
                    <a className="navbar-brand col-12" href='https://t.me/StudSovetSASK'>
                        <img width='35' height='35' src='/telegram.svg' alt="САСК (Телеграмм)" />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default ScheduleFooter;
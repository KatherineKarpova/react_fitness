const DateToday = () => {

    const today = new Date

    return (
        <div className='date-container'>
            <input 
                className='month' 
                type='text' 
                value={today.getMonth() + 1 < 10? "0" + today.getMonth() : today.getMonth()} 
                disabled 
            />
            <input 
                className='day' 
                type='text' 
                value={today.getDate() < 10 ? "0" + today.getDate() : today.getDate()} 
                disabled 
            />
            <input 
                className='year' 
                type='text' 
                value={today.getFullYear()} 
                disabled 
            />
        </div>
    )
}

export default DateToday
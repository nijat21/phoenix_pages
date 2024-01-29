

function ServerError() {
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className='h-1/2 flex flex-col items-center justify-around z-0 place-items-center relative'>
                <h2 className='text-3xl'>Server Error!</h2>
                <img src="/src/assets/not-found.png" alt="" className='w-64' />
                <p>Sorry, there was a problem with the server. Please try again later.</p>
            </div>
        </div>
    )
}

export default ServerError;

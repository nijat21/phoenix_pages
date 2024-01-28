
function ServerError() {
    return (
        <div className='flex flex-col items-center justify-center mt-20 z-0'>
            <h2 className='text-2xl my-6'>Server Error!</h2>
            <img src="/src/assets/not-found.png" alt="" className='w-44' />
            <p>Sorry, there was a problem with the server. Please try again later.</p>
        </div>
    )
}

export default ServerError;

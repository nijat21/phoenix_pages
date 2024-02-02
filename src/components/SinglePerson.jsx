
function SinglePerson({ person }) {
    return (
        <section className=' flex flex-col px-12 py-16 items-center justify-center'>
            <div className='flex flex-col items-center w-64 px-8'>
                <img src={person.photo} alt='Nijat' className=' rounded-xl w-40 h-48 mb-4 object-cover grayscale-50' />
                <h1 className='text-center text-2xl'>
                    <strong>{person.name}</strong>
                </h1>
                <h2 className='text-center text-md'>{person.role}</h2>
                <h2 className='text-center text-sm'>{person.bio}</h2>
            </div>
            <div className="my-8">
                <p className="text-center"><strong>Recent reads:</strong>
                    <br />
                    {person.recentReads.map(book => {
                        return <div>"{book}"</div>;
                    })}
                </p>
            </div>
            <div className='flex items-center w-40 justify-around'>
                <a
                    href={person.linkedIn}
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    <i className="fa-brands fa-linkedin fa-3x"></i>
                </a>
                <a
                    href={person.github}
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    <i className="fa-brands fa-square-github fa-3x"></i>
                </a>
            </div>
        </section>
    )
}

export default SinglePerson;

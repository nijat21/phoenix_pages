import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserProvider';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RatingDisplay from '../components/RatingDisplay';
import Loader from '../components/Loader';
import BookCard from '../pages/BookCard';
import { useNavigate } from 'react-router-dom';

function Search() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageLoaded, setImageLoaded] = useState(false);
    const { searchTitle, setSearchTitle } = useContext(UserContext);
    const navigate = useNavigate();

    const getBooksByCategory = async title => {
        try {
            const response = await axios.get(
                `https://openlibrary.org/search.json?title=${title}&limit=50`
            );
            setBooks(response.data.docs);
        } catch (error) {
            console.log(error);
        }
    };

    // Books for the page is opened
    useEffect(() => {
        setLoading(true);
        getBooksByCategory(searchTitle).then(() => {
            setLoading(false);
        });
    }, [searchTitle]);

    // Book rating algorithm
    const rank = input => {
        const ranked = input
            ? input
                .filter(book => book.readinglog_count > 300)
                .sort(
                    (a, b) =>
                        b.ratings_average * 0.5 +
                        (b.already_read_count /
                            (b.readinglog_count - b.currently_reading_count)) *
                        5 *
                        0.5 -
                        (a.ratings_average * 0.5 +
                            (a.already_read_count /
                                (a.readinglog_count - a.currently_reading_count)) *
                            5 *
                            0.5)
                )
            :
            [];
        return ranked.slice(0, 15);
    };
    const topFifteen = rank(books);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div>
                    <div className='flex flex-col items-center'>
                        <h1 className='text-3xl my-6'>Search Results</h1>
                        <section className='grid grid-cols-5'>
                            {books &&
                                topFifteen.map(book => {
                                    return (
                                        <div key={book.key}>
                                            <BookCard book={book} setImageLoaded={setImageLoaded} imageLoaded={imageLoaded} />
                                        </div>
                                    );
                                })}
                        </section>
                        <div className='mt-12 flex justify-center'>
                            <button className='border-solid border-2 border-amber-800 p-3 ml-4 hover:bg-amber-800 hover:text-white text-xl'
                                onClick={() => { navigate(-1) }}>
                                Go Back
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Search
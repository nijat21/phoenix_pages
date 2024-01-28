import React from 'react';

const RatingDisplay = ({ rating }) => {
    // Number of filled stars
    const filledStars = Math.floor(rating);
    // Calculate the percentage to fill the star icon
    const fillPercentage = (rating % 1) * 100;

    // Define the SVG icon with gradient fill
    const StarIcon = ({ fillPercentage }) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <defs>
                <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset={`${fillPercentage}%`} style={{ stopColor: 'rgb(219, 219, 5)', stopOpacity: 1 }} />
                    <stop offset={`${100 - fillPercentage}%`} style={{ stopColor: '#ccc', stopOpacity: 1 }} />
                </linearGradient>
            </defs>
            <path fill="url(#starGradient)" d="M12 0l2.905 8.913h9.469l-7.692 5.602 2.905 8.913-7.568-5.516-7.692 5.602 2.905-8.913-7.568-5.516h9.469z" />
        </svg>
    );

    // Generate an array of stars based on the rating
    const stars = [];
    const greyStars = [];
    for (let i = 0; i < 5; i++) {

        // Add grey stars
        greyStars.push(
            <svg className="star" viewBox="0 0 24 24">
                <defs>
                    <clipPath id={`starClip${i}`}>
                        <path d="M12 0l2.905 8.913h9.469l-7.692 5.602 2.905 8.913-7.568-5.516-7.692 5.602 2.905-8.913-7.568-5.516h9.469z" />
                    </clipPath>
                </defs>
                <rect className="star-empty" clipPath={`url(#starClip${i})`} width={"100%"} height="100%" />
            </svg>);

        if (i < filledStars) {
            // Fully filled star
            stars.push(
                <svg className="star" viewBox="0 0 24 24">
                    <defs>
                        <clipPath id={`starClip${i}`}>
                            <path d="M12 0l2.905 8.913h9.469l-7.692 5.602 2.905 8.913-7.568-5.516-7.692 5.602 2.905-8.913-7.568-5.516h9.469z" />
                        </clipPath>
                    </defs>
                    <rect className="star-filled" clipPath={`url(#starClip${i})`} width={"100%"} height="100%" />
                </svg>);
        } else if (i === filledStars) {
            stars.push(
                <svg className="star" viewBox="0 0 24 24">
                    <defs>
                        <clipPath id={`starClip${i}`}>
                            <path d="M12 0l2.905 8.913h9.469l-7.692 5.602 2.905 8.913-7.568-5.516-7.692 5.602 2.905-8.913-7.568-5.516h9.469z" />
                        </clipPath>
                    </defs>
                    <rect className="star-filled" clipPath={`url(#starClip${i})`} width={fillPercentage + "%"} height="100%" />
                </svg>);
        } else {
            // Empty star
            stars.push(
                <svg className="star" viewBox="0 0 24 24">
                    <defs>
                        <clipPath id={`starClip${i}`}>
                            <path d="M12 0l2.905 8.913h9.469l-7.692 5.602 2.905 8.913-7.568-5.516-7.692 5.602 2.905-8.913-7.568-5.516h9.469z" />
                        </clipPath>
                    </defs>
                    <rect className="star-filled" clipPath={`url(#starClip${i})`} width={"0%"} height="100%" />
                </svg>);
        }
    }


    return (
        <div className="star-container flex items-center justify-center my-2">
            <div className='flex' style={{ position: 'relative' }}>
                <div className="grey-stars flex" style={{ position: 'absolute', zIndex: '-1' }}>
                    {greyStars.map(star => {
                        return <div key={Math.random(100)} className=''>{star}</div>
                    })}
                </div>
                <div className="yellow-stars flex">
                    {stars.map(star => {
                        return <div key={Math.random(100)} className=''>{star}</div>
                    })}
                </div>
            </div>
            <p className='pl-2'> {rating.toFixed(1)}</p>
        </div>
    );
}

export default RatingDisplay;

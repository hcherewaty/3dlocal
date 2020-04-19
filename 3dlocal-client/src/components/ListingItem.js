import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import DefaultProfileImage from '../images/icons8-user-96.png';

export const ListingItem = ({modeling, description, title, status, date, username, profileImageUrl}) => (
    <div>
        <img src={profileImageUrl || DefaultProfileImage} alt={username} height='100' width='100' className='classifieds-profile-image' />
        <div className='listing-area'>
            {/* TODO: Update link to get 1 listing */}
            <Link to='/'>{title} &nbsp;</Link>
            {/* TODO: Update link to get user profile */}
            <Link to='/'>{username} &nbsp;</Link>
            <span className='text-muted'>
                <Moment className='text-muted'format='Do MMM YYYY'>{date}</Moment>
            </span>
            <p>{status}</p>
            <p>{modeling}</p>
            <p>{description}</p>
        </div>
    </div>
);
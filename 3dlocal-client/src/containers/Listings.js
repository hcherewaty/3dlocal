import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchListings } from '../store/actions/listings';
import { ListingItem } from '../components/ListingItem';

class Listings extends Component {
    componentDidMount(){
        this.props.fetchListings();
    }
    render(){
        const { listings } = this.props

        let listingsList = listings.map( listing => (
            <ListingItem 
                key={listing._id}
                modeling={listing.modeling}
                description={listing.description}
                title={listing.title}
                status={listing.status}
                date={listing.createdAt}
                username={listing.user.username}
                profileImageUrl={listing.user.profileImageUrl}
            />
        ));
        return listingsList;
    }
}

function mapStateToProps(state) {
    return {
        listings: state.listings
    };
}

export default connect(mapStateToProps, { fetchListings })(Listings);

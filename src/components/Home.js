import React from 'react';
import Introduction from "./Introduction";
import {Spring} from 'react-spring/renderprops';
import ImageGallery from 'react-image-gallery';
import {get_album_from_db} from '../pawbytesDB';


class Home extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            album: [],
        }

    }

    getPhotos = async () =>
    {
        return await get_album_from_db();
    };

    async componentDidMount()
    {
        
        const  photosData = await this.getPhotos();

        const photos = photosData.map((data) => {
            return (
                {
                    original: data.original,
                    thumbnail: data.thumbnail
                }
            )
        })
        
        this.setState((prevState) => ({album: photos }));
    };

    render()
    {
        const container =
        {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            padding: "1.2em"
        }

        return (
            <Spring
    
                from={{opacity: 0, marginTop: -500}}
                to={{opacity: 1, marginTop: 0}}
            >
                {props => (
                    <div style={props}>
    
                        <div style={container}>
                            <Introduction/>
                        </div>
    
                        <ImageGallery style={props} items={this.state.album} showFullscreenButton={false} autoPlay={true} />
    
                    </div>
                )}
            </Spring>
        )
    };
}

export default Home;
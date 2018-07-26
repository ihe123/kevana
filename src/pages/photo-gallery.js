import React, { Component } from 'react';
import { ref, storage } from '../services/firebaseConstants';
import PolaroidFrame from '../components/PolaroidFrame';
import '../css/PhotoGallery.css';
import UnauthenticatedSplash from '../components/UnauthenticatedSplash';

class PhotoGalleryPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      loading: true
    };
  }

  getDownloadUrl = filename => {
    return storage.ref().child(filename).getDownloadURL();
  }

  getPhotoUrls = () => {
    return ref.child('photoGallery').once('value')
      .then(snapshot => {
        // console.log('snapshot.val()', snapshot.val());
        const val = snapshot.val();
        const photoFilenames = Object.values(val);
        const pushIds = Object.keys(val);
        // console.log('pushIds', pushIds);
        // console.log('photoFilenames', photoFilenames);
        const downloadUrls = Promise.all(photoFilenames.map( filename => (this.getDownloadUrl(filename))));
        return downloadUrls.then( urls => (
          urls.reduce((accumulator, curr, index) => {
            accumulator[pushIds[index]] = curr;
            return accumulator;
          }, {})
        ))
      })
  }

  getPhotoCaptions = () => {
    return ref.child('photoCaptions').once('value')
      .then(snapshot => {
        const val = snapshot.val();
        const photoCaptions = Object.values(val);
        const pushIds = Object.keys(val);
        return photoCaptions.reduce((accumulator, curr, index) => {
          accumulator[pushIds[index]] = curr;
          return accumulator;
        }, {})
      })
  }

  componentDidMount() {
    const { photos } = this.state;

    const photoUrlsAndCaptions = Promise.all([this.getPhotoUrls(), this.getPhotoCaptions()]);
    photoUrlsAndCaptions
      .then(photosData => {
        // console.log('photosData', photosData);
        const photoUrls = photosData[0];
        const photoCaptions = photosData[1];
        let photoDataTemp = [];

        for (let key in photoUrls) {
          if (photoCaptions[key]) {
            photoDataTemp.push({
              url: photoUrls[key],
              caption: photoCaptions[key]
            });
          } else {
            photoDataTemp.push({
              url: photoUrls[key],
              caption: ''
            });
          }
        }

        this.setState({
          photos: [
            ...photos, 
            ...photoDataTemp
          ]
        });

        this.setState({
          loading: false
        });
      })
      .catch(err => {
        console.log('Error in getting photos from RTDB: ', err);
        this.setState({
          loading: false
        });
      })
  }

  render() {
    const { photos, loading } = this.state;
    return (
      <div>
        {
          loading === true ?
            <div className="splash-container" style={{background: '#77878B'}}>
              <h1 style={{color: 'white', textAlign: 'center'}}>Loading Photo Gallery...</h1>
            </div> :
            photos.length === 0 ?
              <UnauthenticatedSplash/> :
              <div>
                <div className="secondary-page" style={{background: '#EAADAD'}}>
                  <h1 style={{color: 'white', textAlign: 'center'}}>Photo Gallery</h1>
                </div>
                <div className='polaroids-gallery'>
                  {photos.map((photo) => (
                    <PolaroidFrame key={ photo.url.split('?')[0] } url={ photo.url } caption={ photo.caption }/>
                  ))}
                </div>
              </div>
        }
      </div>
    )
  }
}

export default PhotoGalleryPage;
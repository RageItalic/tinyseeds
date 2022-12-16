import React from 'react'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const ImageComponent = ({plantId}) => {
    
  return (
    <div>
       
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={3}
      >
        <Slider>
          <Slide index={0}></Slide>
          <Slide index={1}>I am the second Slide.</Slide>
          <Slide index={2}>I am the third Slide.</Slide>
        </Slider>
        <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>
      </CarouselProvider>
    </div>
  )
}

export default ImageComponent

/*
 <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={2}
      >
        {
        plant.imageURLS && 
        <Slider>
          <Slide index={0}><img src={plant.imageURLS[0]}/></Slide>
          <Slide index={1}><img src={plant.imageURLS[1]}/></Slide>
        </Slider>
        }
         {
        plant.imageURLS && 
        <div>
        <ButtonBack><img src={plant.imageURLS[0]}/></ButtonBack>
        <ButtonNext><img src={plant.imageURLS[1]}/></ButtonNext>
        </div>
         }
      </CarouselProvider>
*/
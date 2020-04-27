import React, { useState } from 'react';
import { Button } from 'reactstrap';
import Carousel from 'react-bootstrap/Carousel'



const Example = (props) => {
    const [activeIndex, setActiveIndex, items] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    // const slides = items.map((item) => {
    //     return (

    //         <CarouselItem
    //             onExiting={() => setAnimating(true)}
    //             onExited={() => setAnimating(false)}
    //             key={item.src}
    //         >
    //             <img src={item.src} alt={item.altText} />
    //             <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
    //         </CarouselItem>

    //     );
    // });

    return (
        <div>
        <Carousel>
        <Carousel.Item>
          {/* <img
            className="d-block w-100"
            src="holder.js/800x400?text=First slide&bg=373940"
            alt="First slide"
          /> */}
          <h2 className="carousel-text">Welcome to TCSAI4RM</h2><br></br>
            <p className="carousel-text">AI driven 4R Marketing</p><br></br><br></br>
          {/* <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
          {/* <img
            className="d-block w-100"
            src="holder.js/800x400?text=Second slide&bg=282c34"
            alt="Third slide"
          /> */}
          <h2 className="carousel-text">We predict for better conversion...</h2><br></br>
            <p className="carousel-text"><Button color="info">Right Product</Button> to the <Button color="info">Right Customer</Button> through the <Button color="info">Right Channel</Button> at the <Button color="info">Right Time</Button></p><br></br><br></br>
      
          {/* <Carousel.Caption>
            <h3>We predict for better conversion...</h3>
            <p className="lead">Our 4Rs - Delivering the <Button color="info">Right Product</Button> to the <Button color="info">Right Customer</Button> through the <Button color="info">Right Channel</Button> at the <Button color="info"></Button>Right Time</p>
          </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
          {/* <img
            className="d-block w-100"
            src="holder.js/800x400?text=Third slide&bg=20232a"
            alt="Third slide"
          /> */}
          <h2 className="carousel-text">Explore more on how we do it!</h2><br></br>
            <p className="carousel-text">Please sign in below</p><br></br><br></br>
      
          {/* <Carousel.Caption>
            
          </Carousel.Caption> */}
        </Carousel.Item>
      </Carousel>
      </div>
  );
}

export default Example;
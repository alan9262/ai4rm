import React, { Component } from 'react';
import './UserPage.scss'
import {Badge, Carousel} from 'react-bootstrap';

import chanel from '../images/chanel.jpg';
import lacome from '../images/lancome.jpg';
import guerlain from '../images/guerlain.jpg';
import organic_oil from '../images/organic_oil.jpeg';
import beautycounter from '../images/beautycounter.jpg';

import ipad from '../images/ipad.jpeg';
import iphone11 from '../images/iphone11.png';
import iphone11white from '../images/iphone11white.png';
import applewatch from '../images/applewatch.jpg';
import macpro from '../images/macpro.jpg';

import bed from '../images/bed.jpeg';
import coffee from '../images/coffee.jpg';
import cuddly from '../images/cuddly.jpg';
import slippers from '../images/slippers.jpg';
import dyson from '../images/dyson.jpg';

import lamer from '../images/lamer.jpg';
import iphoneAd from '../images/iphoneAd.jpg';
import summerSale from '../images/summerSale.jpg';


class UserPage extends Component {
    render() {
        let log = true;
        if (this.props.log) {
            log = this.props.log;
        }
        return (
            <div>
                {log ?
                    (<div>
                        <Carousel>
                            <Carousel.Item>
                                <img id="ads" className="d-block w-100" src={summerSale} alt="First slide" />
                                <Carousel.Caption>
                                    <h3>Buy your product here</h3>
                                    <p></p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img id="ads" className="d-block w-100" src={lamer} alt="Third slide" />
                                <Carousel.Caption>
                                    <h3>Buy your product here</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img id="ads" className="d-block w-100" src={iphoneAd} alt="Third slide" />
                                <Carousel.Caption>
                                    <h3>Buy your product here</h3>
                                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                        <div>
                            <label className="label">Fashion and Cosmetics<Badge variant="secondary">New</Badge></label>
                            <div className="scrollmenu">
                                <div><img className="img" src={chanel} alt=""></img></div>
                                <div><img className="img" src={lacome} alt=""></img></div>
                                <div><img className="img" src={guerlain} alt=""></img></div>
                                <div><img className="img" src={organic_oil} alt=""></img></div>
                                <div><img className="img" src={beautycounter} alt=""></img></div>
                            </div>
                            <label className="label">Mobile and Eletronics<Badge variant="secondary">New</Badge></label>
                            <div className="scrollmenu">
                                <div><img className="img" src={iphone11} alt=""></img></div>
                                <div><img className="img" src={iphone11white} alt=""></img></div>
                                <div><img className="img" src={ipad} alt=""></img></div>
                                <div><img className="img" src={applewatch} alt=""></img></div>
                                <div><img className="img" src={macpro} alt=""></img></div>
                            </div>
                            <label className="label">Cool Products<Badge variant="secondary">New</Badge></label>
                            <div className="scrollmenu">
                                <div><img className="img" src={bed} alt=""></img></div>
                                <div><img className="img" src={coffee} alt=""></img></div>
                                <div><img className="img" src={cuddly} alt=""></img></div>
                                <div><img className="img" src={slippers} alt=""></img></div>
                                <div><img className="img" src={dyson} alt=""></img></div>
                            </div></div>
                    </div>)
                    : ""}
            </div>
        )
    }


}

export default UserPage;
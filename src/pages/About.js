import React from 'react';
import '../style/about.css';

function About() {
    return (
        <div className="gioithieu_total">
            <img className="banner_gioithieu" src={`${process.env.PUBLIC_URL}/images/image 71.png`} alt="Banner giới thiệu" />
            <div className="gioithieu_total-box1">
                <div className="box1_img">
                    <img src={`${process.env.PUBLIC_URL}/images/image 77.png`} alt="Di sản" />
                </div>
                <div className="box1_text">
                    <h4>
Legacy Left Behind
</h4>
                    <h2>More than 70 years of history</h2>
                    <h4>If you were going to enjoy ice cream it had to be a more realistic and satisfying experience than the 'cold and sweet stuff' of its time. We're proud to continue that legacy, sharing true joy with the world with an ice cream experience like no other</h4>
                     <h1>Reuben Mattus</h1>
                </div>
            </div>
            <div className="gioithieu_total-box2">
                <div className='box2_text'>
                    <h2>
Don't Be Afraid, Enjoy
</h2>
                    <h5>Don't Hold Back</h5>
                    <h4>Häagen-Dazs not simply to satisfy the need for delicious food; it is about enjoying the joys in life without restlessness. That's why their slogan, "Don't Be Afraid, Enjoy," perfectly captures the essence of this brand.</h4>
                    <button className='box2_text_button'>Discover</button>
                </div>
                <div className="box2_img1">
                    <img src={`${process.env.PUBLIC_URL}/images/image 76.png`} alt="Hình 1" />
                </div>
                <div className="box2_img2">
                    <img src={`${process.env.PUBLIC_URL}/images/image 79.png`} alt="Hình 2" />
                </div>
            </div>
            <div className="gioithieu_total-box3">
                <div className="box3_img">
                    <img src={`${process.env.PUBLIC_URL}/images/image 85.png`} alt="Hình 3" />
                </div>
                <div className="box3_text">
                    <h2>November 15, 1976</h2>
                    <p>In New York</p>
                    <h1>Retail has only 3 flavors: vanilla, chocolate and coffee and currently there are more than 50 different flavors in more than 90 countries around the world, try it now.</h1>
                    <img src={`${process.env.PUBLIC_URL}/images/image 88.png`} alt="Xem thêm" />
                </div>
            </div>
            <div className="gioithieu_total-box4">
            <div className="box4_img">
                    <img src={`${process.env.PUBLIC_URL}/images/image 82.png`} alt="Hình 3" />
                </div>
                <div className="box4_text">
                    <h1>High Class - Perfect</h1>
                    <h3>Haagen-Dazs, a desirable brand in the culinary world. With every scoop of Haagen-Dazs ice cream, you experience an unforgettable premium feeling. Exquisite flavours, superb quality and exquisite attention to detail all create a truly special tasting experience.</h3>
                    <button>See more</button>
                </div>
                
            </div>
        </div>
    );
}

export default About;

// src/pages/PromotionPage.js
import React from 'react';
import '../style/promotion.css';  // Đảm bảo bạn tạo file CSS này cho các kiểu dáng

function PromotionPage() {
    return (
        <div className="promotion_total">
            {/* <img className="banner_promotion" src={`${process.env.PUBLIC_URL}/images/imae 67.png`} alt="Banner khuyến mãi" /> */}
            <div className="promotion_total-box1">
                <div className="box1_img" style={{marginLeft:'20px'}}>
                    <img src={`${process.env.PUBLIC_URL}/images/image 70.png`} alt="Khuyến mãi 1" />
                </div>
                <div className="box1_text">
                    <h4>Special offer</h4>
                    <h2>
Special 30% Discount</h2>
                    <h4>We're offering our biggest deals of the year with up to 30% off on all our products. Don't miss this great opportunity to experience high quality products at the most favorable prices.</h4>
                    <h1>Limited time</h1>
                </div>
            </div>
            <div className="promotion_total-box2">
                <div className='box2_text'>
                    <h2>Unmissable Deals</h2>
                    <h5>Special Only This Month</h5>
                    <h4>We are committed to bringing you the best deals. Discover new products and receive attractive promotions only available this month.</h4>
                    <button className='box2_text_button'>Explore Now</button>
                </div>
                <div className="box2_img1">
                    <img src={`${process.env.PUBLIC_URL}/images/image 80.png`} alt="Khuyến mãi 2" />
                </div>
                <div className="box2_img2">
                    <img src={`${process.env.PUBLIC_URL}/images/image 101.png`} alt="Khuyến mãi 3" />
                </div>
            </div>
            <div className="promotion_total-box3">
                <div className="box3_img">
                    <img src={`${process.env.PUBLIC_URL}/images/image 64.png`} alt="Khuyến mãi 4" />
                </div>
                <div className="box3_text">
                    <h2>Promotion Weekend</h2>
                    <p>This weekend only, enjoy up to 50% off on selected products. Come and experience quality products at unbeatable prices.</p>
                    <img src={`${process.env.PUBLIC_URL}/images/image 63.png`} alt="Xem thêm" />
                </div>
            </div>
            <div className="promotion_total-box4">
                <div className="box4_img">
                    <img src={`${process.env.PUBLIC_URL}/images/image 85.png`} alt="Khuyến mãi 5" />
                </div>
                <div className="box4_text">
                    <h1>Special Offers for Loyal Customers</h1>
                    <h3>Special privileges for our loyal customers. Register now to receive exclusive offers and promotions.</h3>
                    <button className='btn-dkngay'>Register Now</button>
                </div>
            </div>
        </div>
    );
}

export default PromotionPage;

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
                    <h4>Khuyến Mãi Đặc Biệt</h4>
                    <h2>Giảm Giá 30% Đặc Biệt</h2>
                    <h4>Chúng tôi đang cung cấp các ưu đãi lớn nhất trong năm với giảm giá lên đến 30% cho tất cả các sản phẩm của chúng tôi. Đừng bỏ lỡ cơ hội tuyệt vời này để trải nghiệm sản phẩm chất lượng cao với giá ưu đãi nhất.</h4>
                    <h1>Thời gian có hạn</h1>
                </div>
            </div>
            <div className="promotion_total-box2">
                <div className='box2_text'>
                    <h2>Những Ưu Đãi Không Thể Bỏ Qua</h2>
                    <h5>Đặc Biệt Chỉ Trong Tháng Này</h5>
                    <h4>Chúng tôi cam kết mang đến cho bạn những ưu đãi tốt nhất. Hãy khám phá các sản phẩm mới và nhận ngay những khuyến mãi hấp dẫn chỉ có trong tháng này.</h4>
                    <button className='box2_text_button'>Khám Phá Ngay</button>
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
                    <h2>Ngày Cuối Tuần Khuyến Mãi</h2>
                    <p>Chỉ trong cuối tuần này, tận hưởng ưu đãi giảm giá lên đến 50% cho các sản phẩm được chọn. Hãy đến và trải nghiệm ngay những sản phẩm chất lượng với giá không thể tốt hơn.</p>
                    <img src={`${process.env.PUBLIC_URL}/images/image 63.png`} alt="Xem thêm" />
                </div>
            </div>
            <div className="promotion_total-box4">
                <div className="box4_img">
                    <img src={`${process.env.PUBLIC_URL}/images/image 85.png`} alt="Khuyến mãi 5" />
                </div>
                <div className="box4_text">
                    <h1>Ưu Đãi Đặc Biệt Cho Khách Hàng Thân Thiết</h1>
                    <h3>Đặc quyền đặc biệt dành cho khách hàng thân thiết của chúng tôi. Đăng ký ngay để nhận những ưu đãi và chương trình khuyến mãi độc quyền.</h3>
                    <button className='btn-dkngay'>Đăng Ký Ngay</button>
                </div>
            </div>
        </div>
    );
}

export default PromotionPage;

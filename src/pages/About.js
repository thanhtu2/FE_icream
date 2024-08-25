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
                    <h4>Di Sản Để Lại</h4>
                    <h2>Hơn 70 năm lịch sử hình thành</h2>
                    <h4>Nếu bạn định thưởng thức kem thì đó phải là một trải nghiệm thực tế và thỏa mãn hơn là 'thứ lạnh lùng và ngọt ngào' vào thời đó. Chúng tôi tự hào tiếp nối di sản đó, chia sẻ niềm vui thực sự với thế giới bằng trải nghiệm kem không giống ai</h4>
                    <h1>Reuben Mattus</h1>
                </div>
            </div>
            <div className="gioithieu_total-box2">
                <div className='box2_text'>
                    <h2>Đừng Ngại Hãy Tận Hưởng</h2>
                    <h5>Don't Hold Back</h5>
                    <h4>Häagen-Dazs không chỉ đơn thuần là để đáp ứng nhu cầu thèm ngon; đó là việc tận hưởng những niềm vui trong cuộc sống một cách không khắc khoải. Đó là lý do tại sao khẩu hiệu của họ, "Đừng Ngại Hãy Tận Hưởng," hoàn hảo thể hiện bản chất của thương hiệu này.</h4>
                    <button className='box2_text_button'>Khám phá</button>
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
                    <h2>15 tháng 11 năm 1976</h2>
                    <p>Tại New York</p>
                    <h1>Bán lẻ chỉ có 3 hương vị: vanilla, chocolate và cà phê và thời điểm hiện tại đã có hơn 50 hương vị khác nhau tại hơn 90 quốc gia trên toàn thế giới, hay trải nghiệm ngay.</h1>
                    <img src={`${process.env.PUBLIC_URL}/images/image 88.png`} alt="Xem thêm" />
                </div>
            </div>
            <div className="gioithieu_total-box4">
            <div className="box4_img">
                    <img src={`${process.env.PUBLIC_URL}/images/image 82.png`} alt="Hình 3" />
                </div>
                <div className="box4_text">
                    <h1>Cao Cấp - Hoàn Hảo</h1>
                    <h3>Haagen-Dazs, một thương hiệu đáng mơ ước trong thế giới ẩm thực. Với mỗi muỗng kem của Haagen-Dazs, bạn được trải nghiệm một cảm giác cao cấp không thể nào quên. Những hương vị tinh tế, chất lượng tuyệt vời và sự tinh tế trong từng chi tiết, tất cả đều tạo nên một trải nghiệm thưởng thức thực sự đặc biệt.</h3>
                    <button>Xem thêm</button>
                </div>
                
            </div>
        </div>
    );
}

export default About;

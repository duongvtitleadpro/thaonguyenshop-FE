"use client";
import About1 from "@/assets/images/about/about-1.jpg";
import About2 from "@/assets/images/about/about-2.jpg";
import About3 from "@/assets/images/about/about-3.jpg";
import Image from "next/image";
const AboutPage = () => {
  return (
    <>
      <div className="w-full max-w-4xl mx-auto mt-12 text-left rtl:text-right tracking-tight flex flex-col gap-4 text-lg text-slate-900 p-3">
        <h1 className="font-bold text-3xl ">
          CHÀO MỪNG QUÝ KHÁCH ĐÃ ĐẾN VỚI: TỔNG KHO THAO NGUYEN
        </h1>
        <p>
          Chúng tôi hy vọng quý khách sẽ có sự trải nghiệm tuyệt vời khi đến
          đây, cùng nhau hợp tác, cùng nhau phát triển.
        </p>
        <p>
          Chúng tôi với nhiều năm kinh nghiệm trong lĩnh vực bán sỉ, bán lẻ các
          mặt hàng thời trang, đồ gia dụng, hot trend bao gồm cả hàng Việt Nam,
          Trung Quốc, Thái Lan. Với đội ngũ làm việc tận tâm, chuyên nghiệp,
          nhanh nhẹn cùng chất lượng dịch vụ tốt nhất đã được kiểm chứng nhiều
          năm nay, chúng tôi cam kết sẽ mang đến quý khách sự hài lòng nhất và
          hợp tác lâu dài.{" "}
        </p>
        <strong>
          Phương châm hoạt động của chúng tôi đó là sản phẩm cung cấp tới tay
          khách hàng luôn là sản phẩm tốt nhất về chất lượng và giá cả. Kim chỉ
          nam cho mọi hoạt động của chúng tôi đó là “CÓ TÂM ẮT CÓ TẦM”
        </strong>
        <p>Hiện tại chúng tôi đang cung cấp các dịch vụ sau:</p>
        <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
          <li>
            Bán sỉ, bán lẻ, bán cộng tác viên các mặt hàng quần áo, giày dép,
            phụ kiện, đồ chơi, đồ ăn, đồ gia dụng, đồ hottrend của trẻ em và bố
            mẹ
          </li>
          <li>
            Nhận tìm hàng, mua hàng theo link, thanh toán hộ, và vận chuyển hàng
            hóa từ Trung Quốc về Việt Nam.
          </li>
        </ul>
        <p>Bạn đã bao giờ sợ hãi mình bị lừa trong kinh doanh?</p>
        <p>
          Bạn đã bao giờ rất muốn kiếm thêm thu nhập nhưng không biết bắt đầu từ
          đâu?
        </p>
        <p>
          Bạn đã bao giờ muốn mua sắm hàng chất lượng, phong phú mà không cần
          phải ra đường?
        </p>
        <p>
          <strong>Chúng tôi giải quyết mọi vấn đề bạn đang gặp phải:</strong>
        </p>
        <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
          <li>
            Sản phẩm vô cùng đa dạng, chất lượng và giá cả siêu cạnh tranh. Bắt
            trend nhanh nhất và liên tục
          </li>
          <li>
            Bạn có thể lập nhóm CTV cho chính mình vì giá của kho quá tốt, bỏ sỉ
            lại vô tư
          </li>
          <li>Không cầm ôm hàng, không cần lấy số lượng, có giá sỉ từ 1sp.</li>
          <li>
            Có web chốt đơn, quản lý và theo dõi đơn hàng chuyên nghiệp. Chủ
            động-bảo mật-chính xác
          </li>
          <li>
            Đội ngũ làm việc: <strong>UY TÍN - TẬN TÂM - CHUYÊN NGHIỆP</strong>.
          </li>
          <li>
            Chính sách giá cả minh bạch, các chương trình sale và tri ân khách
            hàng thường niên
          </li>
          <li className="whitespace-pre-wrap">{`Phí ship giá siêu tốt. Đồng giá toàn quốc
                  1-5kg: 25k
                  5-10kg: 40k
                  Trên 10kg: 4k/kg`}</li>
        </ul>
        <p>Một số hình ảnh tại kho để khách hàng tham khảo:</p>
        <div className="flex flex-col gap-2 w-full">
          <Image src={About1} alt="about-1" />
          <Image src={About2} alt="about-2" />
          <Image src={About3} alt="about-3" />
        </div>
        <p>
          Khách hàng của chúng tôi hiện nay là tất cả những người, những ngành
          nghề bạn biết, từ công an, bác sĩ, kỹ sư, luật sư, giáo viên, kế toán
          tới mẹ bỉm sữa và các shop thời trang,….Người thì là nghề tay trái,
          người thì là nghề tay phải. Còn bạn, nếu bạn muốn kiếm tiền bằng cả
          hai tay thì hãy nhấc máy lên và liên hệ ngay cho chúng tôi để được
          hướng dẫn cũng như giải đáp các thắc mắc.
        </p>
        <div>
          <h3 className="text-xl font-bold">Vui lòng liên hệ:</h3>
          <div className="ml-8 mt-3">
            <p>
              <strong>Hotline:</strong> 
              <a
                href="tel:0921367363"
                className="text-blue-600 hover:underline"
              >
                0921.367.363
              </a>
            </p>
            <p>
              <strong>Zalo:</strong>{" "}
              <a
                href="tel:0921367363"
                className="text-blue-600 hover:underline"
              >
                0921.367.363
              </a>
            </p>
            <p>
              <strong>Fanpage: </strong>
              <a
                href="https://www.facebook.com/profile.php?id=100082873663849"
                className="text-blue-600 hover:underline"
              >
                https://www.facebook.com/profile.php?id=100082873663849
              </a>
            </p>
            <p>
              <strong>Facebook: </strong>
              <a
                href="https://www.facebook.com/unyeu2409"
                className="text-blue-600 hover:underline"
              >
                https://www.facebook.com/unyeu2409
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;

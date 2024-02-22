"use client";
import Tutorial1Image from "@/assets/images/tutorial/tutorial-1.png";
import Tutorial2Image from "@/assets/images/tutorial/tutorial-2.png";
import Tutorial3Image from "@/assets/images/tutorial/tutorial-3.png";
import Tutorial4Image from "@/assets/images/tutorial/tutorial-4.png";
import Image from "next/image";
const AboutPage = () => {
  return (
    <>
      <div className="w-full max-w-4xl mx-auto mt-12 text-left rtl:text-right tracking-tight flex flex-col gap-4 text-lg text-slate-900">
        <div className="relative mx-auto pt-20 text-center pb-10">
          <h1 className="text-4xl font-extrabold tracking-tight  sm:text-5xl text-center">
            Hướng dẫn sử dụng web
          </h1>
        </div>
        <div className="p-3">
          <li className="text-[#ff0039] font-bold  my-6">
            Đăng nhập tài khoản
          </li>
          <p className="indent-6">
            Bấm vào biển tượng góc trên phải màn hình như ảnh và làm theo các
            bước để tiến hành đăng nhập
          </p>
          <Image src={Tutorial1Image} alt="tutorial-1" />
          <li className="text-[#ff0039] font-bold my-6">
            Tìm kiếm sản phẩm và đặt hàng
          </li>
          <p className="font-bold italic">Tìm kiếm sản phẩm</p>
          <ul className="ml-4 md:ml-8 ps-5 space-y-2 list-disc ">
            <li>
              Tại màn hình: mọi người có thể nhập mã sp, tên sp, hoặc các từ
              khóa liên quan đến sản phẩm sau đó bấm Tìm kiếm (
              <em>để tìm kiếm sản phẩm</em>)
            </li>
            <li>
              Mọi người cũng có thể bấm vào từng danh mục sản phẩm để tìm kiếm
              <em>
                (SP được chia làm 2 phần: <strong>Hàng Oder</strong> và{" "}
                <strong>Hàng có sẵn</strong>; mỗi phần gồm 8 danh mục sản phẩm)
              </em>
            </li>
            <li>
              Mọi người có thể bấm vào Biểu tượng cái Phễu (
              <em>góc phải dưới màn hình</em>) để tìm kiếm sản phẩm theo các
              danh mục của sản phẩm, hoặc tất cả sản phẩm.
            </li>
          </ul>

          <p className="font-bold italic">Đặt hàng:</p>
          <ul className="ml-4 md:ml-8 ps-5 space-y-2 list-disc ">
            <li>
              Sau khi tìm kiếm sản phẩm tiến hành đặt hàng: Chọn Mẫu/màu và size
              tương ứng (có thể nhập vào phần ghi chú để lưu lạị sản phẩm này
              của khách hàng nào đặt hàng mình để sau này dễ quản lý, dễ nhớ)
            </li>
            <li>
              Sau đó bấm Mua ngay (màn hình sẽ xuất hiện tạo đơn thành công)
            </li>
            <li>Kiểm tra đơn đã mua tại phần quản lý đơn hàng</li>
          </ul>
          <Image src={Tutorial2Image} alt="tutorial-2" />
          <li className="text-[#ff0039] font-bold my-6">Quản lý đơn hàng</li>
          <p className="indent-6">
            Bấm vào biểu tượng hình bánh răng (góc trên phải màn hình) để vào
            phần quản lý đơn hàng
          </p>
          <p className="indent-6">
            Tại đây có thể quản lý các đơn hàng đã đặt bằng các cách:{" "}
            <em>
              Tìm kiếm mã sp, tên sp hoặc lọc các trạng thái và tình trạng của
              đơn hàng
            </em>
          </p>
          <p className="indent-6">
            Ví dụ: Lọc các tình trạng đơn hàng:{" "}
            <em>Chưa mua hàng; Đã mua; khách hủy; Hủy (admin hủy)</em>
          </p>
          <p className="indent-6">
            <strong>Note:</strong> Với các đơn hàng tình trạng:{" "}
            <strong>Chưa mua hàng</strong>{" "}
            <em>
              (KH có thể bấm vào biểu tượng cái bút để sửa lại đơn hàng, hoặc
              bấm vào biểu tượng thùng rác để xóa (hủy) đơn hàng.)
            </em>
          </p>
          <Image src={Tutorial3Image} alt="tutorial-3" className="mx-auto" />
          <p className="indent-6">
            Sau khi hàng về chia hàng <strong>Admin</strong> sẽ nhập trạng thái
            đơn hàng:<strong>Đã chia</strong>; Khách hàng có thể bấm lọc Trạng
            thái đơn hàng: <strong>Đã chia; Đã xuất</strong> để ktra các đơn
            hàng của mình
          </p>
          <Image src={Tutorial4Image} alt="tutorial-4" />
        </div>
      </div>
    </>
  );
};

export default AboutPage;

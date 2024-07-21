import BlurFade from "@/components/magicui/blur-fade";
import Image from "next/image";
const images = [
  "https://img.freepik.com/free-photo/3d-rendering-loft-scandinavian-living-room-with-working-table-bookshelf_105762-2162.jpg?t=st=1721499367~exp=1721502967~hmac=b2a0a824d687b6e08d477eb64c0207316b907ffead705af3dbf7934447e355ca&w=740",
  "https://img.freepik.com/free-photo/young-teenage-girl-sitting-her-bed-studying-light-bedroom-home_1157-51864.jpg?t=st=1721499162~exp=1721502762~hmac=5a17a809c5dece958d9518a61b479383f2ca55911b917419fc4782941bc47bea&w=740",
  "https://img.freepik.com/free-photo/3d-rendering-modern-steel-elevator-lift-lobby-business-hotel-with-luxury-design_105762-2042.jpg?t=st=1721499315~exp=1721502915~hmac=9173162deab5af2c5db1c714e63c806fd7d5018d8b9c112c273bb6e669c646c1&w=740",
  "https://img.freepik.com/free-photo/square-front-modern-office-buildings_1359-867.jpg?t=st=1721500688~exp=1721504288~hmac=cb19ac55b94d5218b95c1bb2a95743bf619c6e868245d523de14fba8dfdc4475&w=740",
  "https://img.freepik.com/free-photo/3d-rendering-white-wood-living-room-near-bedroom-upstair_105762-2197.jpg?t=st=1721493306~exp=1721496906~hmac=cee17b72169a7067539e44d49c500eb07b72290f82d185635ae5dd85946f7ccc&w=740",
  "https://img.freepik.com/free-photo/luxury-water-swimming-resort-hotel_1203-4648.jpg?t=st=1721500441~exp=1721504041~hmac=28e6ec784be795a6a555e110232ae915ae0955fe64af50d71121a85e295d6b31&w=740",
  "https://img.freepik.com/free-photo/3d-view-house-model_23-2150761172.jpg?t=st=1721500519~exp=1721504119~hmac=9efb8b5212316f8a4e4cb2333a196098dbad708b0286718cf3a94d64c7f737a6&w=740",
  "https://img.freepik.com/free-photo/city-water_1417-1903.jpg?w=740&t=st=1721500580~exp=1721501180~hmac=2f8551aefa1426fe477e663a8445311f1f3eb499aefb609749ae107bf781bb7f",
];

export function BlurFadeDemo() {
  return (
    <section id="photos">
      <div className="columns-2 gap-4 sm:columns-3">
        {images.map((imageUrl, idx) => (
          <BlurFade key={imageUrl} delay={0.25 + idx * 0.05} inView>
            <Image
              className="mb-4 size-full rounded-lg object-contain"
              src={imageUrl}
              width={400}
              height={300}
              priority
              alt={`Random stock image ${idx + 1}`}
            />
          </BlurFade>
        ))}
      </div>
    </section>
  );
}

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex h-screen flex-col bg-black text-white">
      <div className="px-20 py-20 max-lg:px-8 max-lg:py-12">
        <header className="flex justify-between max-md:hidden">
          {/* 로고 */}
          <Image src="/images/logo.png" alt="logo" width={240} height={80} />

          {/* 기간 안내 */}
          <div className="flex gap-[38px]">
            <p className="flex h-fit items-center justify-center rounded-full bg-[#FF2EBA] px-[11px] pt-1 pb-0.5 text-sm leading-none font-black text-nowrap">
              NOW ON
            </p>
            <div
              className="text-4xl leading-none font-black"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              20 <br /> 25
            </div>
            <div className="text-2xl font-extrabold">
              <p>5월8일부터 11월15일까지</p> <p className="mt-2.5">10:00 - 17:00, 연중무휴</p>
            </div>
          </div>
        </header>

        {/* 장소, 티켓 구매하기 */}
        <div className="mt-[199px] flex justify-between max-md:hidden">
          <p className="text-2xl font-extrabold">
            서울 종로구 <br />
            율곡로 18 <br />
            도화서길디원
          </p>

          <Link
            href={'#'}
            target="_blank"
            className="h-fit cursor-pointer rounded-full border border-white px-8 py-4 font-black"
          >
            티켓 구매하기
          </Link>
        </div>

        {/* 모바일 */}
        <div className="md:hidden">
          <p className="fixed top-12 right-8 text-lg font-extrabold">
            서울 종로구 <br />
            율곡로 18 <br />
            도화서길디원
          </p>

          {/* 로고, 티켓 구매하기 */}
          <div className="mt-40">
            <div className="sticky flex flex-col items-center justify-center gap-6">
              <Image src="/images/logo.png" alt="logo" width={176} height={58} />
              <Link
                href={'#'}
                target="_blank"
                className="h-fit cursor-pointer rounded-full border border-white bg-black px-8 py-4 text-lg font-black"
              >
                티켓 구매하기
              </Link>
            </div>
          </div>

          {/* 기간 안내 */}
          <>
            <p className="mt-28 flex h-fit w-fit items-center justify-center rounded-full bg-[#FF2EBA] px-[11px] pt-1 pb-0.5 text-[12px] leading-none font-black text-nowrap">
              NOW ON
            </p>
            <div className="mt-3 flex gap-6">
              <div
                className="text-2xl leading-none font-black"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                20 <br /> 25
              </div>
              <div className="font-extrabold">
                <p>5월8일부터 11월15일까지</p> <p>10:00 - 17:00, 연중무휴</p>
              </div>
            </div>
          </>
        </div>
      </div>

      <div className="flex flex-1 items-end bg-[url('/images/main-bg.png')] bg-cover bg-fixed bg-center bg-no-repeat pb-20 max-md:hidden">
        <div className="flex w-full items-end justify-between px-20">
          <p className="text-2xl font-extrabold">
            곧, 웹사이트에서도 <br /> 딜라이트 서울 정보를 <br /> 만나보실 수 있습니다.
          </p>
          <p className="text-2xl font-extrabold">Coming soon</p>
        </div>
      </div>

      {/* 모바일 */}
      <div className="flex flex-1 items-end bg-[url('/images/mobile-main-bg.png')] bg-cover bg-fixed bg-center bg-no-repeat md:hidden">
        <div className="flex h-full w-full flex-col justify-between px-8 pt-10 pb-5">
          <p className="font-extrabold">
            곧, 웹사이트에서도 <br /> 딜라이트 서울 정보를 <br /> 만나보실 수 있습니다.
          </p>
          <p className="mt-44 self-end font-extrabold">Coming soon</p>
        </div>
      </div>
    </div>
  );
}

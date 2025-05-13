import Image from 'next/image';
import Link from 'next/link';
import styles from './styles/ComingSoon.module.css';
// import commonStyles from './styles/Common.module.css';


export default function ComingSoonPage() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* 화면 */}
        <>
          <div className={styles.nowOnInfo}>
            <span className={styles.badge}>NOW ON</span>
            <div className={styles.year}>
              20 <br /> 25
            </div>
            <div className={styles.schedule}>
              <p>5월8일부터 11월15일까지</p>
              <p>10:00 - 17:00, 연중무휴</p>
            </div>
          </div>

          <header className={styles.header}>
            <div className={styles.logo}>
              <Image src="/images/logo.png" alt="logo" width={240} height={80} />
            </div>

            <Link href="#" target="_blank" className={styles.buyButton}>
              티켓 구매하기
            </Link>
          </header>


          <div className={styles.locationWrap} >
            <p className={styles.location}>
              서울 종로구 <br />
              율곡로 18 <br />
              도화서길디원
            </p>

          </div>
        </>

      </div>

      {/* 하단 배경 */}
      <div className={styles.bgBox}>
        <div className={styles.wrapper}>
          <p className={styles.schedule}>
            곧, 웹사이트에서도 <br />딜라이트 서울 정보를 만나보실 수 있습니다.
          </p>
          <p className={styles.location}>
            Coming soon...
          </p>
        </div>
      </div>


    </div>
  );
}

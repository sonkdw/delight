import Image from 'next/image';
import Link from 'next/link';
import styles from './styles/ComingSoon.module.css';
import commonStyles from './styles/Common.module.css';

export default function ComingSoonPage() {
  return (
    <div className={styles.container}>
      <div className={commonStyles.boundaryPadding}>
        {/* 데스크탑 화면 */}
        <>
          <header className={`${commonStyles.flexBetween} ${commonStyles.desktopOnly}`}>
            <Image src="/images/logo.png" alt="logo" width={240} height={80} />
            <div className={styles.nowOnFlexbox}>
              <p className={styles.badge}>NOW ON</p>
              <div className={styles.year}>
                20 <br /> 25
              </div>
              <div className={styles.schedule}>
                <p>5월8일부터 11월15일까지</p>
                <p>10:00 - 17:00, 연중무휴</p>
              </div>
            </div>
          </header>

          <div
            className={`${commonStyles.desktopOnly} ${commonStyles.flexBetween}`}
            style={{ marginTop: '199px' }}
          >
            <p className={styles.location}>
              서울 종로구 <br />
              율곡로 18 <br />
              도화서길디원
            </p>
            <Link href="#" target="_blank" className={styles.buyButton}>
              티켓 구매하기
            </Link>
          </div>
        </>

        {/* 모바일 화면 */}
        <div className={commonStyles.mobileOnly}>
          <p className={styles.location}>
            서울 종로구 <br />
            율곡로 18 <br />
            도화서길디원
          </p>

          <div className="mt-40">
            <div className={styles.stickyBlock}>
              <Image src="/images/logo.png" alt="logo" width={176} height={58} />
              <Link href="#" target="_blank" className={styles.buyButton}>
                티켓 구매하기
              </Link>
            </div>
          </div>

          <>
            <p className={styles.badge} style={{ marginTop: '7rem' }}>
              NOW ON
            </p>
            <div className={styles.nowOnFlexbox}>
              <div className={styles.year}>
                20 <br /> 25
              </div>
              <div className={styles.schedule}>
                <p>5월8일부터 11월15일까지</p>
                <p>10:00 - 17:00, 연중무휴</p>
              </div>
            </div>
          </>
        </div>
      </div>

      {/* 데스크탑 하단 배경 */}
      <div className={`${commonStyles.desktopOnly} ${styles.desktopBg}`}>
        <div
          className={commonStyles.flexBetween}
          style={{
            padding: '0 5rem',
          }}
        >
          <p className={styles.schedule} style={{ marginTop: '24px' }}>
            곧, 웹사이트에서도 <br /> 딜라이트 서울 정보를 <br /> 만나보실 수 있습니다.
          </p>
          <p className={styles.location} style={{ alignSelf: 'end' }}>
            Coming soon
          </p>
        </div>
      </div>

      {/* 모바일 하단 배경 */}
      <div className={`${commonStyles.mobileOnly} ${styles.mobileBg}`}>
        <p className={styles.schedule}>
          곧, 웹사이트에서도 <br /> 딜라이트 서울 정보를 <br /> 만나보실 수 있습니다.
        </p>
        <p
          className={styles.schedule}
          style={{ marginTop: '11rem', alignSelf: 'flex-end', justifySelf: 'right' }}
        >
          Coming soon
        </p>
      </div>
    </div>
  );
}

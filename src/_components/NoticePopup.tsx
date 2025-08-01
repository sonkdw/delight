'use client';

import { useEffect, useState, useRef } from 'react';
import styles from '../app/styles/NoticePopup.module.css';

interface NoticePopupProps {
    onClose?: () => void;
}

export default function NoticePopup({ onClose }: NoticePopupProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 컴포넌트 마운트 시 fade in 효과
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        let lastScrollTop = 0;

        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                startCloseAnimation();
            }
        };

        const handleScroll = () => {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // 스크롤이 실제로 발생했을 때만 처리
            if (Math.abs(currentScrollTop - lastScrollTop) > 5) {
                startCloseAnimation();
            }

            lastScrollTop = currentScrollTop;
        };

        const startCloseAnimation = () => {
            if (isClosing) return;

            setIsClosing(true);

            // 2초 후에 실제로 사라지도록 설정
            timeoutRef.current = setTimeout(() => {
                setIsVisible(false);
                onClose?.();
            }, 2000);
        };

        // 이벤트 리스너 등록 (약간의 지연을 두어 초기 로딩 시 스크롤 이벤트 무시)
        const timer = setTimeout(() => {
            document.addEventListener('click', handleClickOutside);
            document.addEventListener('scroll', handleScroll, { passive: true });
        }, 500);

        return () => {
            clearTimeout(timer);
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('scroll', handleScroll);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [isClosing, onClose]);

    if (!isVisible && !isClosing) return null;

    return (
        <div
            ref={popupRef}
            className={`${styles.noticePopup} ${isVisible ? styles.fadeIn : ''} ${isClosing ? styles.fadeOut : ''}`}
        >
            <div className={styles.noticeContent}>
                <h3 className={styles.noticeTitle}>-공지사항-</h3>
                <div className={styles.noticeBody}>
                    <p>
                        2025 딜라이트 서울에 많은 관심을 가져주셔서 감사합니다.
                        <br />
                        일부 시설물 정비 등의 사유로 약 2주가량 휴장 후 시즌 2로 다시 찾아뵙겠습니다.
                    </p>
                    <div className={styles.noticeDetails}>
                        <p>
                            <strong>휴장기간 :</strong> 2025년 8월 4일 ~ 약 2주간
                        </p>
                        <p>
                            <strong>재오픈일 :</strong> 추후 홈페이지 공지
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
} 
'use client';

import React, { useEffect, useRef, useState } from 'react';
import YouTube, { YouTubeEvent, YouTubeProps } from 'react-youtube';

const VIDEO_ID = 'pxwLv3x6F0c';

const Player = () => {
  const [duration, setDuration] = useState<number>(0);

  const playerRef = useRef<YouTube>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  // 영상 클릭했을때 실행되는 핸들러(mute toggle)
  const handleViewClick = async () => {
    const playInfos = playerRef?.current?.getInternalPlayer();
    const isMuted = await playInfos.isMuted();
    if (isMuted) {
      await playInfos?.unMute();
      return;
    }
    await playInfos?.mute();
  };

  // 영상 준비되면 바로 시작, 영상 총 재생시간 저장
  const handlePlayerReady: YouTubeProps['onReady'] = async (event) => {
    await event.target.playVideo();
    const videoDuration = await event.target.getDuration();
    setDuration(Math.floor(videoDuration));
  };

  // 영상의 총 재생시간 -2초 가 되면 처음부터 다시 재생
  const handleUpdateCurrentTime = async (player: YouTubeEvent['target']) => {
    if (!playerRef?.current) return;
    const targetYoutubeVideo = playerRef?.current;
    const playTime = Math.floor(await targetYoutubeVideo.getInternalPlayer().getCurrentTime());

    const canGoStartPoint = playTime > duration - 2;
    if (canGoStartPoint) {
      player.seekTo(1, true);
      return;
    }
  };

  // 영상 재생 상태 변경 핸들러
  const handlePlayerStateChange: YouTubeProps['onStateChange'] = (event) => {
    const player = event.target;

    if (event.data === -1 || event.data === 5) return;
    if (event.data === YouTube.PlayerState.ENDED) {
      player.seekTo(1, true);
      return;
    }
    if (event.data === YouTube.PlayerState.PLAYING) {
      intervalRef.current = setInterval(() => handleUpdateCurrentTime(player), 1000);
      return;
    }
  };

  // 유저 화면에서 영상이 안보이면 자동 뮤트 처리
  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        const visible = entry.isIntersecting;
        if (!playerRef.current) return;

        if (!visible) {
          await playerRef?.current?.getInternalPlayer()?.mute(); //안보이면 뮤트 처리
        } else {
          await playerRef?.current?.getInternalPlayer().playInfos?.unMute();
        }
      },
      {
        threshold: 0.1, // 10% 이상 보여야 '보이는 것'으로 간주
      }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [playerRef, containerRef]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative aspect-[16/9] w-full">
      <button
        className="absolute top-0 right-0 bottom-0 left-0 bg-transparent"
        onClick={handleViewClick}
      />
      <YouTube
        ref={playerRef}
        iframeClassName="embed embed-youtube w-full h-full"
        videoId={VIDEO_ID}
        id={VIDEO_ID}
        className="h-full w-full"
        opts={{
          playerVars: {
            autoplay: 1,
            loop: 1,
            mute: 1,
            start: 0,
            controls: 0,
            showinfo: 0,
            modestbranding: 0,
            playsinline: 1,
            enablejsapi: 1,
            disablekb: 1,
            'x-webkit-airplay': 'allow',
            'webkit-playsinline': true,
          },
        }}
        onReady={handlePlayerReady}
        onStateChange={handlePlayerStateChange}
        onPlay={handlePlayerStateChange}
        onPause={handlePlayerStateChange}
        loading="lazy"
      />
    </div>
  );
};

export default React.memo(Player);

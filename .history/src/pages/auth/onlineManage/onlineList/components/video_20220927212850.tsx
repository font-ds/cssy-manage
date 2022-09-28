import React, { useState, useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import './video.scss'


export default function VideoPlay(props:any) {
    console.log(props)
  const videoRef = useRef(null);
  const playerRef = useRef<any>(null);
//   const [option, setOptopm] = useState({});

  const onReadyPlay = (palyer:any) => {
    videoRef.current = palyer
    palyer.play();
  }

  const init = () => {
    let _option = {
      controls: true,
      autoplay: false,//加载完成是否自动播放
      loop: false,//视频播放结束后，是否循环播放
      notSupportedMessage: '此视频暂无法播放，请稍后再试',
      controlBar: {
        timeDivider: false,//是否显示时间控制条，默认为true
        children: [//自定义
          { name: 'playToggle' }, // 播放按钮
          {
            name: 'volumePanel', // 音量控制
            inline: false, // 不使用水平方式
          },
          { name: 'currentTimeDisplay' }, // 当前已播放时间
          { name: 'durationDisplay' }, // 总时间
          { name: 'progressControl' }, // 播放进度条
          {
            name: 'FullscreenToggle'//支持全屏
          }
        ]
      }

    }
    // setOptopm(_option);

    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = playerRef.current = videojs(videoElement, _option, () => {
      });
      onReadyPlay(player)
    }
  }

  useEffect(() => {
    init();
  }, [])

  return (
    <div className="video_play">
      <video style={{
        width: '100%',
        // height: 270
      }} ref={videoRef}
        className="video-js vjs-big-play-centered">
        <source src={props?.url} type="video/mp4" />
      </video>
    </div>
  )
}